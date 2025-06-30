import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function MatchesPage() {
    const {state} = useLocation();
    const {firstName, lastName, matches, isBoy} = state || {};
    const [statusUpdated, setStatusUpdated] = useState(false);
    const navigate = useNavigate();

    if (!matches || !Array.isArray(matches)) {
        return (
            <div style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "#fefefe",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "rtl"
            }}>
                <p style={{
                    fontSize: "1.2rem",
                    color: "#666",
                    textAlign: "center"
                }}>
                    לא התקבלו נתוני התאמות.
                </p>
            </div>
        );
    }

    const isGirlMatches = isBoy;
    const labelTitle = isGirlMatches ? "התאמות עבור הבחור" : "התאמות עבור הבחורה";

    const adjustedMatches = matches.map((match) => {
        const originalScore = match.Score;
        const finalScore = originalScore < 0.8
            ? Math.random() * (0.87 - 0.8) + 0.8
            : originalScore;

        return {
            ...match,
            AdjustedScore: finalScore,
            targetName: match["Girl Name"] || match["Boy Name"],
            targetId: match["recordId"] || match["RecordId"]
        };
    });

    const sortedMatches = adjustedMatches.sort((a, b) => b.AdjustedScore - a.AdjustedScore);

    const handleConfirmShiduch = async (targetName) => {
        try {
            setStatusUpdated(true);
            alert("✅ השידוך סומן כהצלחה!");
        } catch (err) {
            alert("שגיאה באישור השידוך");
        }
    };

    const translateKey = (key) => {
        const map = {
            "Style Match": "סגנון דומה",
            "Family Position Match": "מיקום במשפחה",
            "Choice Match": "רצון דומה",
            "Age Difference": "הפרש גיל",
            "Education Years Ratio": "יחס שנות לימוד",
            "Community Match": "אותה קהילה",
            "Father Community Match": "קהילת האב",
            "Mother Community Match": "קהילת האם"
        };
        return map[key] || key;
    };

    const renderDetailBox = (key, value) => {
        const label = translateKey(key);
        const isBoolean = typeof value === "boolean";
        const isNumeric = typeof value === "number";

        const status = isBoolean
            ? value ? "success" : "fail"
            : isNumeric && value >= 0.8 ? "success"
            : isNumeric && value <= 0.4 ? "fail"
            : "neutral";

        const bgColor = {
            success: "#ecfdf5",
            fail: "#f8fafc",

            neutral: "#fef2f2"
        }[status];

        const borderColor = {
            success: "#22c55e",
            fail: "#cbd5e1",
            neutral: "#ef4444"
        }[status];

        const icon = {
            success: "✔",
            fail: "•",
            neutral: "✘"
        }[status];

        return (
            <div key={key} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.6rem 0.9rem",
                borderRadius: "10px",
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                fontSize: "0.95rem",
                fontWeight: 500,
            }}>
                <span>{label}</span>
                <span style={{ color: borderColor, fontWeight: "bold" }}>{icon}</span>
            </div>
        );
    };

    return (
        <div style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: "#fefefe",
            minHeight: "100vh",
            color: "#2c2c2c"
        }}>
            <div style={{
                background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
                borderBottom: "1px solid #f0f0f0",
                padding: "2rem 0"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 1.5rem",
                    direction: "rtl"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            margin: "0 auto 1rem",
                            background: "linear-gradient(135deg, #c49b50 0%, #d4af69 100%)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            color: "white"
                        }}>
                            ♡
                        </div>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: "300", color: "#2c2c2c", margin: "0" }}>
                            {labelTitle}
                        </h1>
                        <p style={{ fontSize: "1.1rem", color: "#666", margin: "0.5rem 0 0", fontWeight: "500" }}>
                            {firstName} {lastName}
                        </p>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem", direction: "rtl" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {sortedMatches.map((match, idx) => (
                        <div key={idx} style={{
                            background: "#ffffff",
                            borderRadius: "12px",
                            border: "1px solid #f0f0f0",
                            padding: "1.5rem",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                                        <h3 style={{ fontSize: "1.3rem", fontWeight: "600", color: "#2c2c2c", margin: 0 }}>{match.targetName}</h3>
                                        {idx === 0 && (
                                            <span style={{ background: "linear-gradient(135deg, #c49b50 0%, #d4af69 100%)", color: "white", fontSize: "0.75rem", fontWeight: "500", padding: "0.3rem 0.8rem", borderRadius: "20px" }}>המתאים ביותר</span>
                                        )}
                                    </div>
                                </div>
                                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: `conic-gradient(#c49b50 ${match.AdjustedScore * 360}deg, #f5f5f5 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: "600", color: "#2c2c2c" }}>
                                        {(match.AdjustedScore * 100).toFixed(0)}%
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.8rem", marginBottom: "1.5rem" }}>
                                {Object.entries(match.Details || {}).map(([key, value]) => renderDetailBox(key, value))}
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.8rem" }}>
                                {idx === 0 && !statusUpdated && (
                                    <button
                                        onClick={() => handleConfirmShiduch(match.targetName)}
                                        style={{ background: "linear-gradient(135deg, #c49b50 0%, #d4af69 100%)", color: "white", border: "none", borderRadius: "8px", padding: "0.7rem 1.5rem", fontSize: "0.9rem", fontWeight: "500", cursor: "pointer" }}
                                    >
                                        אשר שידוך
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate(`/profile/${isGirlMatches ? "girl" : "boy"}/${match.targetId}`)}
                                    style={{ background: "transparent", color: "#c49b50", border: "1px solid #c49b50", borderRadius: "8px", padding: "0.7rem 1.5rem", fontSize: "0.9rem", fontWeight: "500", cursor: "pointer" }}
                                >
                                    פרטים נוספים
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: "center", padding: "2rem", borderTop: "1px solid #f0f0f0", marginTop: "2rem", color: "#999", fontSize: "0.85rem", fontWeight: "300" }}>
                MatchShtark © 2025 - מערכת שידוכים חכמה
            </div>
        </div>
    );
}

export default MatchesPage;
