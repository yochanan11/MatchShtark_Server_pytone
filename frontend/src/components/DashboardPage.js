import React from "react";

function DashboardPage() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="container p-5" dir="rtl">
            <div className="row">
                <div className="col">
                    <h2 className="text-center mb-4">שלום {user?.firstName || "משתמש"} 👋</h2>

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
                            <a href="/" className="btn btn-outline-secondary">להתנתק</a>
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
