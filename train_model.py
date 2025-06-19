import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# טעינת הנתונים
data = pd.read_excel("match_analysis.xlsx")

# המרת עמודות לקטגוריות
categorical_columns = [
    "Community Match", "Style Match", "Family Position Match",
    "Choice Match", "Current Institution Match", "Previous Institution Match",
    "Father Community Match", "Father Origin Match", "Mother Style Match"
]

for col in categorical_columns:
    data[col] = data[col].astype(int)

# המרת Status לקטגוריות
data["Status"] = data["Status"].apply(lambda x: 1 if x == "success" else 0)

# חלוקת הנתונים לתכונות ולמטרות
X = data[categorical_columns + ["Age Difference"]]
y = data["Status"]

# חלוקת הנתונים לאימון ובדיקה
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# אימון המודל
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# הערכת ביצועי המודל
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
