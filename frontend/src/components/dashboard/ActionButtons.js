import React from "react";
import { useNavigate } from "react-router-dom";

function ActionButtons({ setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null); // ⬅️ עדכון ה־state הגלובלי
        navigate("/users/login"); // ⬅️ ניווט חלק ללא ריענון
    };

    return (
        <div className="row text-center mb-4">
            <div className="col">
                <a href="/users/add" className="btn btn-outline-primary">➕ הוספת מועמד</a>
            </div>
            <div className="col">
                <a href="/users/match" className="btn btn-outline-success">🔍 חיפוש התאמות</a>
            </div>
            <div className="col">
                <a href="/users/history" className="btn btn-outline-secondary">📋 היסטוריית שידוכים</a>
            </div>
            <div className="col">
                <button onClick={handleLogout} className="btn btn-outline-danger">🚪 התנתק</button>
            </div>
        </div>
    );
}

export default ActionButtons;
