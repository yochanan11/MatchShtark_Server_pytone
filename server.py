from flask import Flask, jsonify
from bson import ObjectId
from Finel import db, load_model, predict_matches_for_boy, boys_data
import traceback
from flask_cors import CORS
import bcrypt
from flask import request

app = Flask(__name__)
CORS(app)
model = load_model()

users_collection = db["user"]
# ✅ קבלת התאמות לפי אינדקס
@app.route("/api/matches/boy/<int:boy_index>", methods=["GET"])
def get_matches_for_boy(boy_index):
    try:
        print(f"📥 בקשה עבור אינדקס בחור: {boy_index}")

        if boy_index < 0 or boy_index >= len(boys_data):
            return jsonify({"error": "Index out of range"}), 400

        boy = boys_data[boy_index]
        print("👦 הבחור שנבחר:", boy.get("studentInfo", {}).get("firstName", ""), boy.get("studentInfo", {}).get("lastName", ""))

        girls = list(db["shiduchim_banot"].find({"status": {"$ne": "engaged"}}))
        matches = predict_matches_for_boy(boy, girls, model, top_n=5)

        return jsonify({
            "boy": {
                "firstName": boy.get("studentInfo", {}).get("firstName", ""),
                "lastName": boy.get("studentInfo", {}).get("lastName", "")
            },
            "matches": matches
        })

    except Exception as e:
        print("❌ שגיאה בזמן עיבוד הבקשה:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/girls", methods=["GET"])
def get_all_girls():
    try:
        girls_raw = list(db["shiduchim_banot"].find({"status": {"$ne": "engaged"}}))
        seen_ids = set()
        girls_list = []

        for girl in girls_raw:
            record_id = girl.get("recordId")
            if not record_id or record_id in seen_ids:
                continue
            seen_ids.add(record_id)

            girls_list.append({
                "recordId": record_id,
                "firstName": girl.get("studentInfo", {}).get("firstName", ""),
                "lastName": girl.get("studentInfo", {}).get("lastName", "")
            })

        return jsonify(girls_list)

    except Exception as e:
        print("❌ שגיאה בשליפת רשימת הבנות:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ✅ קבלת רשימת כל הבחורים עם אינדקסים
@app.route("/api/boys", methods=["GET"])
@app.route("/api/boys", methods=["GET"])
def get_all_boys():
    try:
        boys_list = []
        for i, boy in enumerate(boys_data):
            name = boy.get("studentInfo", {}).get("firstName", "") + " " + boy.get("studentInfo", {}).get("lastName",
                                                                                                          "")

            proposals = boy.get("proposals", [])
            is_matched = any(p.get("status") == "success" for p in proposals)
            status = "שודך" if is_matched else "פנוי"

            boys_list.append({
                "index": i,
                "name": name,
                "status": status
            })
        return jsonify(boys_list)

    except Exception as e:
        print("❌ שגיאה בשליפת רשימת הבחורים:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# 🔐 התחברות לפי אימייל וסיסמה
@app.route("/api/users/login", methods=["POST", "OPTIONS"])
def login_user():
    if request.method == "OPTIONS":
        # CORS preflight
        return jsonify({"message": "OK"}), 200

    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        user = db["user"].find_one({"userInfo.email": email})
        if not user:
            return jsonify({"success": False, "message": "האימייל לא נמצא"}), 404

        hashed_pw = user["userInfo"]["password"].encode("utf-8")
        if bcrypt.checkpw(password.encode("utf-8"), hashed_pw):
            return jsonify({
                "success": True,
                "message": "התחברות הצליחה",
                "user": {
                    "recordId": user["recordId"],
                    "firstName": user["userInfo"]["firstName"],
                    "lastName": user["userInfo"]["lastName"],
                    "email": user["userInfo"]["email"]
                }
            })
        else:
            return jsonify({"success": False, "message": "סיסמה שגויה"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": "שגיאה בשרת", "error": str(e)}), 500
@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        users = list(users_collection.find())
        cleaned_users = []

        for user in users:
            cleaned_users.append({
                "recordId": user.get("recordId"),
                "userInfo": user.get("userInfo", {})
            })

        return jsonify(cleaned_users)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Flask server running at http://127.0.0.1:5000")
    app.run(debug=True)
