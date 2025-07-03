import os
import joblib
from pymongo import MongoClient
import pandas as pd
import numpy as np
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier, plot_importance
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import shap
import json

# התחברות ל-MongoDB
mongo_uri = "mongodb+srv://169921:TT4fIYdjqcsQ6xVl@cluster0.ls0mc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongo_uri)
db = client["shiduchim_data"]

boys_data = list(db["shiduchim_banim"].find())
girls_data = list(db["shiduchim_banot"].find())

def analyze_match(boy, girl):
    results = {}
    results["Age Difference"] = abs(boy.get("studentInfo", {}).get("age", 0) - girl.get("studentInfo", {}).get("age", 0))
    results["Style Match"] = boy.get("studentInfo", {}).get("style") == girl.get("studentInfo", {}).get("style")
    results["Community Match"] = boy.get("studentInfo", {}).get("community") == girl.get("studentInfo", {}).get("community")
    results["Current Yeshiva Match"] = boy.get("studentInfo", {}).get("currentYeshiva") == girl.get("studentInfo", {}).get("currentYeshiva")
    results["Previous Yeshiva Match"] = boy.get("studentInfo", {}).get("previousYeshiva") == girl.get("studentInfo", {}).get("previousYeshiva")
    results["Small Yeshiva Match"] = boy.get("studentInfo", {}).get("smallYeshiva") == girl.get("studentInfo", {}).get("smallYeshiva")
    results["Family Position Match"] = boy.get("studentInfo", {}).get("familyPosition") == girl.get("studentInfo", {}).get("familyPosition")
    results["Choice Match"] = boy.get("studentInfo", {}).get("choice") == girl.get("studentInfo", {}).get("choice")
    for parent in ["fatherInfo", "motherInfo"]:
        for field in ["community", "style", "origin", "workplace", "choice", "dress"]:
            b_val = boy.get(parent, {}).get(field, "").strip()
            g_val = girl.get(parent, {}).get(field, "").strip()
            key = f"{parent}_{field}_match"
            results[key] = int(b_val == g_val)
    results["Father Address Match"] = boy.get("fatherInfo", {}).get("address") == girl.get("fatherInfo", {}).get("address")
    results["Mother Address Match"] = boy.get("motherInfo", {}).get("address") == girl.get("motherInfo", {}).get("address")
    results["Boy Proposal Count"] = len(boy.get("proposals", []))
    results["Status"] = "not proposed"
    for proposal in boy.get("proposals", []):
        if proposal.get("targetRecordId") == girl.get("recordId"):
            results["Status"] = proposal.get("status")
            break
    return results

def generate_training_data_from_mongo(boys_data, girls_data):
    girl_dict = {girl.get("recordId"): girl for girl in girls_data}
    data_rows = []
    for boy in boys_data:
        for proposal in boy.get("proposals", []):
            girl = girl_dict.get(proposal.get("targetRecordId"))
            if not girl:
                continue
            features = analyze_match(boy, girl)
            features["Status"] = 1 if proposal.get("status") == "success" else 0
            data_rows.append(features)
    return pd.DataFrame(data_rows)

def save_model(model):
    joblib.dump(model, "best_xgb_model.pkl")

def load_model():
    return joblib.load("best_xgb_model.pkl") if os.path.exists("best_xgb_model.pkl") else None

def train_or_load_model(force_train=False):
    global best_model
    best_model = load_model()
    if best_model is None or force_train:
        training_df = generate_training_data_from_mongo(boys_data, girls_data)
        X = training_df.drop(columns=["Status"])
        y = training_df["Status"]
        if len(y.value_counts()) > 1 and all(y.value_counts() >= 6):
            smote = SMOTE(random_state=42)
            X_resampled, y_resampled = smote.fit_resample(X, y)
        else:
            X_resampled, y_resampled = X, y
        X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

        param_grid = {
            'max_depth': [3, 5, 7],
            'learning_rate': [0.01, 0.1],
            'n_estimators': [100, 200],
            'subsample': [0.8, 1.0]
        }
        xgb_model = XGBClassifier(eval_metric="logloss", random_state=42)
        grid_search = GridSearchCV(xgb_model, param_grid, cv=3, scoring='accuracy', verbose=2, n_jobs=-1)
        grid_search.fit(X_train, y_train)
        best_model = grid_search.best_estimator_
        save_model(best_model)

        # 🔍 גרפים
        booster = best_model.get_booster()
        scores = booster.get_score(importance_type='weight')
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        data = [{"feature": k, "importance": float(v)} for k, v in sorted_scores]

        # ⬇️ שמירה לקובץ JSON
        with open("feature_importance_data.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        plt.figure(figsize=(10, 6))
        plot_importance(best_model, max_num_features=10)
        plt.title("🔝 Feature Importance (XGBoost)")
        plt.tight_layout()
        plt.savefig("feature_importance.png")
        plt.show()

        shap_sample = X_train[:min(100, len(X_train))]
        explainer = shap.Explainer(best_model)
        shap_values = explainer(shap_sample)

        shap.summary_plot(shap_values, shap_sample, show=True)
        shap.summary_plot(shap_values, shap_sample, plot_type="bar", show=True)
        first_feature = shap_sample.columns[0]
        shap.dependence_plot(first_feature, shap_values.values, shap_sample, show=True)

        print("🎉 האימון הסתיים בהצלחה!")
    return best_model

def predict_matches_for_boy(boy, girls, model, top_n=5):
    predictions = []
    if any(p.get("status") == "success" for p in boy.get("proposals", [])):
        return []
    for girl in girls:
        if girl.get("status") == "engaged":
            continue
        match_features = analyze_match(boy, girl)
        feature_vector = pd.DataFrame([match_features]).apply(pd.to_numeric, errors='coerce').fillna(0)
        feature_vector = feature_vector.drop(columns=["Status"], errors="ignore")
        feature_vector = feature_vector[model.get_booster().feature_names]
        score = model.predict_proba(feature_vector)[0][1]
        cleaned_details = {k: (int(v) if isinstance(v, (np.integer, bool)) else float(v) if isinstance(v, np.floating) else v) for k, v in match_features.items()}
        predictions.append({"Girl Name": girl.get("studentInfo", {}).get("firstName", "") + " " + girl.get("studentInfo", {}).get("lastName", ""), "Score": float(score), "Details": cleaned_details, "RecordId": girl.get("recordId")})
    return sorted(predictions, key=lambda x: x["Score"], reverse=True)[:top_n]

def predict_matches_for_girl(girl, boys, model, top_n=5):
    predictions = []
    for idx, boy in enumerate(boys):
        if boy.get("status") == "engaged" or any(p.get("status") == "success" for p in boy.get("proposals", [])):
            continue
        match_features = analyze_match(boy, girl)
        feature_vector = pd.DataFrame([match_features]).apply(pd.to_numeric, errors='coerce').fillna(0)
        feature_vector = feature_vector.drop(columns=["Status"], errors="ignore")
        feature_vector = feature_vector[model.get_booster().feature_names]
        score = model.predict_proba(feature_vector)[0][1]
        cleaned_details = {k: (int(v) if isinstance(v, (np.integer, bool)) else float(v) if isinstance(v, np.floating) else v) for k, v in match_features.items()}
        predictions.append({"Boy Name": boy.get("studentInfo", {}).get("firstName", "") + " " + boy.get("studentInfo", {}).get("lastName", ""), "Score": float(score), "Details": cleaned_details, "recordId": boy.get("recordId"), "index": idx})
    return sorted(predictions, key=lambda x: x["Score"], reverse=True)[:top_n]
