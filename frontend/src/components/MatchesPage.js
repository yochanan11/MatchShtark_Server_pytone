import React from "react";
import { useLocation } from "react-router-dom";

function MatchesPage() {
    const { state } = useLocation();
    const { firstName, lastName, matches } = state || {};

    if (!matches || !Array.isArray(matches)) {
        return <p className="text-center mt-5">לא התקבלו נתוני התאמות.</p>;
    }

    return (
        <div className="container mt-4" dir="rtl">
            <div className="page-header">
                <h1>
                    <i className="fas fa-heart"></i> התאמות עבור {firstName} {lastName}
                </h1>
            </div>

            <ul className="match-list">
                {matches.map((match, idx) => (
                    <li className="match-item" key={idx}>
                        <div className="match-details">
                            <span className="match-name">{match["Girl Name"]}</span>
                            <div>
                                <span className="match-score">
                                    <i className="fas fa-star"></i> {match.Score.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="text-end mt-2">
                            <span className="match-action">
                                <i className="fas fa-info-circle"></i> פרטים נוספים
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="footer">
                <p>MatchShtark &copy; 2025 - מערכת שידוכים חכמה</p>
            </div>
        </div>
    );
}

export default MatchesPage;
