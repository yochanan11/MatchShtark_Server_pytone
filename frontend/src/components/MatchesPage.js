import React from "react";
import { useLocation } from "react-router-dom";

function MatchesPage() {
    const { state } = useLocation();
    const { firstName, lastName, matches } = state || {};

    if (!matches || !Array.isArray(matches)) {
        return <p className="text-center mt-5">לא התקבלו נתוני התאמות.</p>;
    }

    // שלב 1: נבנה עותק חדש עם ציונים מעודכנים
    const adjustedMatches = matches.map((match) => {
        const originalScore = match.Score;
        const finalScore = originalScore < 0.8
            ? Math.random() * (0.87 - 0.8) + 0.8
            : originalScore;

        return {
            ...match,
            AdjustedScore: finalScore
        };
    });

    // שלב 2: מיון מהגבוה לנמוך
    const sortedMatches = adjustedMatches.sort((a, b) => b.AdjustedScore - a.AdjustedScore);

    return (
        <div className="container mt-4" dir="rtl">
            <div className="page-header">
                <h1>
                    <i className="fas fa-heart"></i> התאמות עבור {firstName} {lastName}
                </h1>
            </div>

            <ul className="match-list">
                {sortedMatches.map((match, idx) => (
                    <li className="match-item" key={idx}>
                        <div className="match-details">
                            <span className="match-name">
                                {idx === 0 ? "💍 המתאימה ביותר: " : ""}
                                {match["Girl Name"]}
                            </span>
                            <div>
                                <span className="match-score">
                                    <i className="fas fa-star"></i> {(match.AdjustedScore * 100).toFixed(0)}%
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
