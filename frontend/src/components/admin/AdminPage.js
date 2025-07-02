import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

function AdminPage() {
  const [code, setCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const secretCode = "456789";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === secretCode) {
      setIsAuthorized(true);
    } else {
      alert("❌ קוד שגוי");
    }
  };

  const handleModelTraining = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/retrain-model", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ " + data.message);
      } else {
        alert("❌ שגיאה: " + (data.error || "לא ידועה"));
      }
    } catch (err) {
      console.error("שגיאה בשליחת הבקשה:", err);
      alert("❌ שגיאה בחיבור לשרת");
    }
  };

  const goToUsersPage = () => {
    navigate("/admin/users");
  };

  return (
    <div className="container-fluid" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div
            className="card shadow border-0 p-4"
            style={{
              borderRadius: "1rem",
              boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
              backgroundColor: "white",
            }}
          >
            <div className="card-body text-center">
              {!isAuthorized ? (
                <>
                  <h4 className="mb-4 text-primary">כניסה לתפריט ניהול</h4>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="password"
                      className="form-control mb-3 text-center"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="הכנס קוד סודי"
                    />
                    <button type="submit" className="btn btn-primary w-100">
                      כניסה
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="text-success mb-4">ברוך הבא לתפריט הניהול</h3>
                  <p className="text-muted">
                    כאן תוכל לנהל נתונים, משתמשים או התאמות.
                  </p>
                  <div className="d-grid gap-3 mt-4">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={goToUsersPage}
                    >
                      הצג רשימת משתמשים
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleModelTraining}
                    >
                      אימון מודל מחדש
                    </button>
                        <Link className="btn btn-outline-secondary" to="/model/importance">גרף השפעות המודל</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
