from flask import Flask, jsonify
from bson import ObjectId
from Finel import db, load_model, predict_matches_for_boy, predict_matches_for_girl, boys_data
import traceback
from flask_cors import CORS
import bcrypt
from flask import request

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)
model = load_model()

users_collection = db["user"]

@app.route("/api/history", methods=["GET"])
def get_successful_matches():
    try:
        boys = list(db["shiduchim_banim"].find())
        girls = list(db["shiduchim_banot"].find())

        girl_dict = {girl.get("recordId"): girl for girl in girls}

        history = []

        for boy in boys:
            boy_name = boy.get("studentInfo", {}).get("firstName", "") + " " + boy.get("studentInfo", {}).get("lastName", "")
            for proposal in boy.get("proposals", []):
                if proposal.get("status") == "success":
                    girl = girl_dict.get(proposal.get("targetRecordId"))
                    if girl:
                        girl_name = girl.get("studentInfo", {}).get("firstName", "") + " " + girl.get("studentInfo", {}).get("lastName", "")
                        history.append({
                            "boyName": boy_name,
                            "girlName": girl_name,
                            "reason": proposal.get("reason", "")
                        })

        return jsonify(history)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/model/importance-data", methods=["GET"])
def get_importance_data():
    try:
        import os
        import json

        if os.path.exists("feature_importance_data.json"):
            with open("feature_importance_data.json", encoding="utf-8") as f:
                data = json.load(f)
            return jsonify(data)
        else:
            return jsonify({"error": "לא נמצאו נתונים. נא לאמן את המודל לפחות פעם אחת."}), 404

    except Exception as e:
        print("❌ שגיאה בקריאת נתוני החשיבות מהקובץ:")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



@app.route("/api/matches/boy/<int:boy_index>", methods=["GET"])
def get_matches_for_boy(boy_index):
    try:
        print(f"📥 בקשה עבור אינדקס בחור: {boy_index}")

        if boy_index < 0 or boy_index >= len(boys_data):
            return jsonify({"error": "Index out of range"}), 400

        boy = boys_data[boy_index]

        # ✅ סינון: אל תביא הצעות לבחורים שכבר שודכו
        proposals = boy.get("proposals", [])
        is_matched = any(p.get("status") == "success" for p in proposals)
        if is_matched:
            print("🚫 הבחור כבר שודך")
            return jsonify({
                "boy": {
                    "firstName": boy.get("studentInfo", {}).get("firstName", ""),
                    "lastName": boy.get("studentInfo", {}).get("lastName", "")
                },
                "matches": []  # מחזיר ריק במקום שגיאה
            })

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
        girls_raw = list(db["shiduchim_banot"].find())
        seen_ids = set()
        girls_list = []

        for girl in girls_raw:
            record_id = girl.get("recordId")
            if not record_id or record_id in seen_ids:
                continue
            seen_ids.add(record_id)
            girls_list.append(convert_objectid(girl))  # 🟢 מחזיר את כל הגרסה

        return jsonify(girls_list)

    except Exception as e:
        print("❌ שגיאה בשליפת רשימת הבנות:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/boy/<int:boy_index>", methods=["PUT"])
def update_boy(boy_index):
    try:
        updated_data = request.json
        if boy_index < 0 or boy_index >= len(boys_data):
            return jsonify({"error": "Index out of range"}), 400

        db["shiduchim_banim"].update_one(
            {"recordId": boys_data[boy_index].get("recordId")},
            {"$set": updated_data}
        )
        return jsonify({"message": "עודכן בהצלחה"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/girl/<int:record_id>", methods=["PUT"])
def update_girl(record_id):
    try:
        updated_data = request.json

        # מחיקת _id אם קיים
        if "_id" in updated_data:
            del updated_data["_id"]

        print("📥 נתונים לאחר הסרת _id:", updated_data)

        res = db["shiduchim_banot"].update_one(
            {"recordId": record_id},
            {"$set": updated_data}
        )

        if res.matched_count == 0:
            return jsonify({"error": "לא נמצאה בחורה לעדכון"}), 404

        return jsonify({"message": "עודכן בהצלחה"})
    except Exception as e:
        print("❌ שגיאה בעדכון בחורה:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/retrain-model", methods=["POST"])
def retrain_model():
    try:
        from Finel import train_or_load_model  # ✅ רק את הפונקציה

        print("🔁 בקשת אימון מחדש התקבלה")
        global model
        model = train_or_load_model(force_train=True)  # ✅ מפעיל עם אימון כפוי

        return jsonify({"message": "המודל אומן ונשמר מחדש בהצלחה"})

    except Exception as e:
        print("❌ שגיאה באימון מחדש:")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/api/import/<collection>", methods=["POST"])
def import_from_excel(collection):
    try:
        data = request.json.get("records", [])
        if not isinstance(data, list):
            return jsonify({"error": "Invalid data"}), 400

        if collection == "banim":
            db["shiduchim_banim"].insert_many(data)
        elif collection == "banot":
            db["shiduchim_banot"].insert_many(data)
        else:
            return jsonify({"error": "Invalid collection"}), 400

        return jsonify({"message": "Imported successfully", "count": len(data)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/api/boy", methods=["POST"])
def add_boy():
    try:
        data = request.json
        db["shiduchim_banim"].insert_one(data)
        return jsonify({"message": "הבחור נוסף בהצלחה"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/girl", methods=["POST"])
def add_girl():
    try:
        data = request.json
        db["shiduchim_banot"].insert_one(data)
        return jsonify({"message": "הבחורה נוספה בהצלחה"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/sync-girls-status", methods=["POST"])
def sync_girls_status():
    try:
        boys = db["shiduchim_banim"].find()
        girls = db["shiduchim_banot"]

        engaged_ids = set()

        for boy in boys:
            for p in boy.get("proposals", []):
                if p.get("status") == "success":
                    engaged_ids.add(p.get("targetRecordId"))

        updated = 0
        for record_id in engaged_ids:
            res = girls.update_one(
                {"recordId": record_id},
                {"$set": {"status": "engaged"}}
            )
            updated += res.modified_count

        return jsonify({"message": f"{updated} בנות עודכנו כמשודכות."})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/api/users/set-password/<int:record_id>", methods=["POST"])
def set_password(record_id):
    try:
        data = request.json
        new_password = data.get("newPassword")
        if not new_password:
            return jsonify({"error": "יש לספק סיסמה חדשה"}), 400

        user = users_collection.find_one({"recordId": record_id})
        if not user:
            return jsonify({"error": "המשתמש לא נמצא"}), 404

        hashed_pw = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        users_collection.update_one(
            {"recordId": record_id},
            {"$set": {"userInfo.password": hashed_pw}}
        )

        return jsonify({"message": "הסיסמה עודכנה בהצלחה"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/matches/girl/<int:record_id>", methods=["GET"])
def get_matches_for_girl(record_id):
    try:
        from Finel import predict_matches_for_girl, load_model, boys_data

        model = load_model()

        # שליפת הבחורה מתוך MongoDB
        girl = db["shiduchim_banot"].find_one({"recordId": record_id})
        if not girl:
            return jsonify({"error": "לא נמצאה בחורה עם מזהה זה"}), 404

        # ✅ סינון אם היא כבר שודכה
        if girl.get("status") == "engaged":
            return jsonify({
                "girl": {
                    "firstName": girl.get("studentInfo", {}).get("firstName", ""),
                    "lastName": girl.get("studentInfo", {}).get("lastName", "")
                },
                "matches": []  # החזר הצעות ריקות
            })

        # ✅ שליפת רק בחורים שעדיין לא שודכו (מתוך boys_data בקובץ Finel)
        available_boys = []
        for boy in boys_data:
            is_matched = any(p.get("status") == "success" for p in boy.get("proposals", []))
            if not is_matched:
                available_boys.append(boy)

        # חישוב התאמות
        matches = predict_matches_for_girl(girl, available_boys, model, top_n=5)

        return jsonify({
            "girl": {
                "firstName": girl.get("studentInfo", {}).get("firstName", ""),
                "lastName": girl.get("studentInfo", {}).get("lastName", "")
            },
            "matches": matches
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



@app.route("/api/girl/proposals/<record_id>", methods=["GET"])
def check_if_girl_has_proposals(record_id):
    try:
        matched_boys = []

        for boy in boys_data:
            for proposal in boy.get("proposals", []):
                if proposal.get("targetRecordId") == record_id:
                    matched_boys.append({
                        "boyName": boy.get("studentInfo", {}).get("firstName", "") + " " + boy.get("studentInfo", {}).get("lastName", ""),
                        "status": proposal.get("status"),
                        "reason": proposal.get("reason", "")
                    })

        return jsonify(matched_boys)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/girl/<record_id>", methods=["GET"])
def get_girl_by_record_id(record_id):
    try:
        record_id = int(record_id)  # המרה למספר שלם
        girl = db["shiduchim_banot"].find_one({"recordId": record_id})
        if not girl:
            return jsonify({"error": "לא נמצאה בחורה עם מזהה זה"}), 404

        return jsonify(convert_objectid(girl))  # ✅ כאן השינוי

    except Exception as e:
        print("❌ שגיאה בשליפת פרטי הבחורה:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500



# ✅ קבלת כל ה-JSON של בחור לפי אינדקס
# @app.route("/api/boy/<int:boy_index>", methods=["GET"])
# def get_boy_full_data(boy_index):
#     try:
#         if boy_index < 0 or boy_index >= len(boys_data):
#             return jsonify({"error": "Index out of range"}), 400
#
#         boy = boys_data[boy_index].copy()
#
#         # שליפת כל הבנות מהמונגו
#         girls = list(db["shiduchim_banot"].find())
#         girl_dict = {girl.get("recordId"): girl for girl in girls}
#
#         # הוספת שם הבחורה לכל הצעה
#         for proposal in boy.get("proposals", []):
#             girl = girl_dict.get(proposal.get("targetRecordId"))
#             if girl:
#                 first_name = girl.get("studentInfo", {}).get("firstName", "")
#                 last_name = girl.get("studentInfo", {}).get("lastName", "")
#                 proposal["girlName"] = f"{first_name} {last_name}"
#
#         return jsonify(convert_objectid(boy))
#
#     except Exception as e:
#         print(" שגיאה בשליפת פרטי הבחור:")
#         traceback.print_exc()
#         return jsonify({"error": str(e)}), 500


# ✅ שליפת בחור לפי recordId
@app.route("/api/boy-by-id/<int:record_id>", methods=["GET"])
def get_boy_by_record_id(record_id):
    try:
        boy = db["shiduchim_banim"].find_one({"recordId": record_id})
        if not boy:
            return jsonify({"error": "לא נמצא בחור עם מזהה זה"}), 404

        # שליפת כל הבנות להוספת שמות להצעות
        girls = list(db["shiduchim_banot"].find())
        girl_dict = {girl.get("recordId"): girl for girl in girls}

        for proposal in boy.get("proposals", []):
            girl = girl_dict.get(proposal.get("targetRecordId"))
            if girl:
                proposal["girlName"] = girl.get("studentInfo", {}).get("firstName", "") + " " + girl.get("studentInfo", {}).get("lastName", "")

        return jsonify(convert_objectid(boy))
    except Exception as e:
        print("❌ שגיאה בשליפת פרטי הבחור לפי recordId:")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ממיר ObjectId לכל מחרוזת בתוך JSON מורכב
def convert_objectid(obj):
    if isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: convert_objectid(v) for k, v in obj.items()}
    elif isinstance(obj, ObjectId):
        return str(obj)
    else:
        return obj

@app.route("/api/boys", methods=["GET"])
def get_all_boys():
    try:
        boys_list = []

        for i, boy in enumerate(boys_data):
            boy_copy = boy.copy()
            boy_copy["index"] = i
            boys_list.append(convert_objectid(boy_copy))

        return jsonify(boys_list)

    except Exception as e:
        print(" שגיאה בשליפת רשימת הבחורים:")
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
        phone = data.get("phone")

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
                    "email": user["userInfo"]["email"],
                    "phone": user["userInfo"]["phone"]
                }
            })
        else:
            return jsonify({"success": False, "message": "סיסמה שגויה"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": "שגיאה בשרת", "error": str(e)}), 500
@app.route("/api/users/register", methods=["POST", "OPTIONS"])
def register_user():
    if request.method == "OPTIONS":
        # טיפול בבקשת preflight
        return jsonify({"message": "OK"}), 200

    try:
        data = request.json
        if not data:
            return jsonify({"error": "נתונים חסרים"}), 400

        existing = users_collection.find_one({"userInfo.email": data.get("email")})
        if existing:
            return jsonify({"error": "האימייל כבר רשום במערכת"}), 409

        password = data.get("password", "")
        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        new_user = {
            "recordId": int(users_collection.count_documents({})) + 1,
            "userInfo": {
                "firstName": data.get("firstName", ""),
                "lastName": data.get("lastName", ""),
                "email": data.get("email", ""),
                "phone": data.get("phone", ""),
                "password": hashed_pw
            }
        }

        res = users_collection.insert_one(new_user)
        return jsonify({"message": "המשתמש נרשם בהצלחה", "id": str(res.inserted_id)})

    except Exception as e:
        print("❌ שגיאה ברישום משתמש:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


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
