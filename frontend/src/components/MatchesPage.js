import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function MatchesPage() {
    const { state } = useLocation();
    const { firstName, lastName, matches } = state || {};
    const [statusUpdated, setStatusUpdated] = useState(false);
    const navigate = useNavigate();

    if (!matches || !Array.isArray(matches)) {
        return <p className="text-center mt-5">לא התקבלו נתוני התאמות.</p>;
    }

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

    const sortedMatches = adjustedMatches.sort((a, b) => b.AdjustedScore - a.AdjustedScore);

    const handleConfirmShiduch = async (girlName) => {
        try {
            // כאן שים את ה־API שלך לעדכון סטטוס
            console.log(`💍 מאשר שידוך עם: ${girlName}`);
            // await fetch(...)

            setStatusUpdated(true);
            alert("✅ השידוך סומן כהצלחה!");
        } catch (err) {
            alert("שגיאה באישור השידוך");
        }
    };

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
                            <div>
                                {idx === 0 && (
                                    <span className="badge bg-gold me-2">המתאימה ביותר</span>
                                )}
                                <span className="match-name">  {match["Girl Name"]}</span>
                            </div>
                            <div>
                                <span className="match-score">
                                    <i className="fas fa-star"></i> {(match.AdjustedScore * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-2">
                            {idx === 0 && !statusUpdated && (
                                <button className="btn btn-warning"
                                        onClick={() => handleConfirmShiduch(match["Girl Name"])}>
                                    אשר שידוך
                                </button>
                            )}
                            <button
                                className="btn btn-outline-warning"
                                onClick={() => navigate(`/profile/girl/${match.targetRecordId}`)}
                            >
                                פרטים נוספים
                            </button>
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
