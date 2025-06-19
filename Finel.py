import os
import joblib  # שמירת וטעינת המודל
from pymongo import MongoClient
import pandas as pd
import numpy as np
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier, plot_importance
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import shap

# התחברות ל-MongoDB
mongo_uri = "mongodb+srv://169921:TT4fIYdjqcsQ6xVl@cluster0.ls0mc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongo_uri)
db = client["shiduchim_data"]

# שליפת נתונים מהקולקציות
boys_data = list(db["shiduchim_banim"].find())
girls_data = list(db["shiduchim_banot"].find())


# פונקציה לניתוח התאמות בין בן לבת
def analyze_match(boy, girl):
    results = {}
    results["Style Match"] = boy.get("studentInfo", {}).get("style") == girl.get("studentInfo", {}).get("style")
    results["Family Position Match"] = boy.get("studentInfo", {}).get("familyPosition") == girl.get("studentInfo",
                                                                                                    {}).get(
        "familyPosition")
    results["Choice Match"] = boy.get("studentInfo", {}).get("choice") == girl.get("studentInfo", {}).get("choice")
    results["Age Difference"] = abs(
        boy.get("studentInfo", {}).get("age", 0) - girl.get("studentInfo", {}).get("age", 0))
    results["Education Years Ratio"] = boy.get("studentInfo", {}).get("yearsInYeshiva", 1) / max(1,
                                                                                                 girl.get("studentInfo",
                                                                                                          {}).get(
                                                                                                     "yearsInSeminary",
                                                                                                     1))
    results["Community Match"] = boy.get("studentInfo", {}).get("community") == girl.get("studentInfo", {}).get(
        "community")
    results["Father Community Match"] = boy.get("fatherInfo", {}).get("community") == girl.get("fatherInfo", {}).get(
        "community")
    results["Mother Community Match"] = boy.get("motherInfo", {}).get("community") == girl.get("motherInfo", {}).get(
        "community")

    results["Status"] = "not proposed"
    for proposal in boy.get("proposals", []):
        if proposal.get("targetRecordId") == girl.get("recordId"):
            results["Status"] = proposal.get("status")
            break
    return results


# פונקציה לניבוי התאמות עבור בחור מסוים
def predict_matches_for_boy(boy, girls, model, top_n=5):
    predictions = []
    for girl in girls:
        if girl.get("status") == "engaged":
            continue

        match_features = analyze_match(boy, girl)
        feature_vector = pd.DataFrame([match_features])
        feature_vector = feature_vector.apply(pd.to_numeric, errors='coerce').fillna(0)
        feature_vector = feature_vector.drop(columns=["Status"], errors="ignore")
        feature_vector = feature_vector[model.get_booster().feature_names]

        score = model.predict_proba(feature_vector)[0][1]

        # ✅ המרת score ל-float רגיל
        # ✅ המרת ערכים בתוך Details ל-int או float רגילים
        cleaned_details = {
            k: (int(v) if isinstance(v, (np.integer, bool)) else float(v) if isinstance(v, np.floating) else v)
            for k, v in match_features.items()
        }

        predictions.append({
            "Girl Name": girl.get("studentInfo", {}).get("firstName", "") + " " + girl.get("studentInfo", {}).get("lastName", ""),
            "Score": float(score),
            "Details": cleaned_details
        })

    return sorted(predictions, key=lambda x: x["Score"], reverse=True)[:top_n]


# שמירת המודל לקובץ
MODEL_PATH = "best_xgb_model.pkl"


def save_model(model):
    joblib.dump(model, MODEL_PATH)
    print(f"✅ Model saved to {MODEL_PATH}")


# טעינת מודל מהקובץ
def load_model():
    if os.path.exists(MODEL_PATH):
        print(f"📂 Loading existing model from {MODEL_PATH}")
        return joblib.load(MODEL_PATH)
    return None


# אימון או טעינת מודל
def train_or_load_model(X_train, y_train):
    global best_model  # כדי שנוכל להשתמש במודל ברמה גלובלית
    best_model = load_model()

    while True:
        if best_model is None:
            print("\n⚠ No existing trained model found. Training a new model...")
            choice = "yes"
        else:
            choice = input("\nDo you want to train the model again? (yes/no): ").strip().lower()

        if choice == "yes":
            print("\nTraining the model again...")
            param_grid = {
                'max_depth': [3, 5, 7, 9],
                'learning_rate': [0.01, 0.05, 0.1, 0.2],
                'n_estimators': [100, 200, 300, 400],
                'subsample': [0.6, 0.8, 1.0]
            }

            xgb_model = XGBClassifier(eval_metric="logloss", random_state=42)
            grid_search = GridSearchCV(xgb_model, param_grid, cv=3, scoring='accuracy', verbose=2, n_jobs=-1)
            grid_search.fit(X_train, y_train)

            print("Best parameters:", grid_search.best_params_)
            best_model = grid_search.best_estimator_
            save_model(best_model)
            return best_model

        elif choice == "no":
            if best_model is not None:
                print("\nUsing the last trained model...")
                return best_model
            else:
                print("\n⚠ No trained model available. Training a new model...")
                choice = "yes"  # מכריח לאמן את המודל אם אין מודל קיים

        else:
            print("Invalid input! Please type 'yes' or 'no'.")


# עיבוד נתונים
categorical_columns = ["Style Match", "Family Position Match", "Choice Match", "Community Match",
                       "Father Community Match", "Mother Community Match"]
new_features = ["Age Difference", "Education Years Ratio"]

data = pd.read_excel("match_analysis.xlsx")
for col in categorical_columns:
    data[col] = data[col].astype(int)
data[new_features] = data[new_features].fillna(0)
data["Status"] = data["Status"].apply(lambda x: 1 if x == "success" else 0).astype(int)

# הכנת הנתונים למודל
X = data[categorical_columns + new_features]
y = data["Status"]

# בדיקה אם ניתן להשתמש ב-SMOTE
if len(y.value_counts()) > 1 and all(y.value_counts() >= 6):
    smote = SMOTE(random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X, y)
else:
    X_resampled, y_resampled = X, y

X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)

# אימון המודל או טעינתו מהקובץ
best_model = train_or_load_model(X_train, y_train)


# פונקציה לבחירת התאמות חדשות
def request_new_match(boys_data, girls_data, model):
    while True:
        try:
            boy_index = int(input(f"\nEnter the index of the boy (0 to {len(boys_data) - 1}), or -1 to exit: "))

            if boy_index == -1:
                print("Exiting the matching system.")
                break

            if 0 <= boy_index < len(boys_data):
                selected_boy = boys_data[boy_index]
                top_matches = predict_matches_for_boy(selected_boy, girls_data, model, top_n=5)

                print("\nTop Matches for:",
                      selected_boy["studentInfo"].get("firstName", "") + " " + selected_boy["studentInfo"].get(
                          "lastName", ""))

                for match in top_matches:
                    print("Girl Name:", match["Girl Name"])
                    print("Score:", match["Score"])
                    print("Details:", match["Details"])

        except ValueError:
            print("Invalid input! Please enter a valid integer.")


if __name__ == "__main__":
    # חיפוש התאמות למשתמשים - רק כשמריצים את Finel.py ישירות
    request_new_match(boys_data, girls_data, best_model)
