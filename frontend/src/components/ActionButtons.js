import React from "react";

function ActionButtons() {
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
                <a href="/users/logout" className="btn btn-outline-secondary">להתנתק</a>
            </div>
        </div>
    );
}

export default ActionButtons;
