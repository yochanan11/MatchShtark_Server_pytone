import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

function DashboardPage({ setUser }) {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const parsed = JSON.parse(userCookie);
        setLocalUser(parsed);
        setUser(parsed);
      } catch {
        setLocalUser(null);
        navigate("/users/login");
      }
    } else {
      navigate("/users/login");
    }
  }, [navigate, setUser]);

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setUser(null);
    navigate("/users/login");
  };

  if (!user) return null; // אפשר להחזיר spinner אם רוצים

  return (
    <div className="container p-5" dir="rtl">
      <div className="row">
        <div className="col">
          <h2 className="text-center mb-4">שלום {user.firstName || "משתמש"} </h2>

          <div className="row text-center mb-4">
            <div className="col">
              <a href="/add-person" className="btn btn-outline-primary"> הוספת מועמד</a>
            </div>
            <div className="col">
              <a href="/users/match" className="btn btn-outline-success"> חיפוש התאמות</a>
            </div>
            <div className="col">
              <a href="/users/history" className="btn btn-outline-secondary"> היסטוריית שידוכים</a>
            </div>
            <div className="col">
              <button onClick={handleLogout} className="btn btn-outline-danger">🚪 התנתק</button>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <h5>📊 סיכום פעילות</h5>
            <ul>
              <li>5 התאמות חדשות השבוע</li>
              <li>12 שידוכים מוצלחים</li>
              <li>7 מועמדים ממתינים</li>
            </ul>
          </div>

          <div className="card p-3">
            <h5>💡 התאמות חכמות:</h5>
            <ul>
              <li>יעקב כהן ↔ חיה לוי (94%)</li>
              <li>ברוך פישר ↔ רבקה לנדאו (91%)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
