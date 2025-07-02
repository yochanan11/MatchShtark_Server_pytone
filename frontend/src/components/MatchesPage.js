import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Heart, Star, CheckCircle, XCircle, Eye, Crown, Sparkles, TrendingUp, Users, Award } from "lucide-react";

function MatchesPage() {
    const {state} = useLocation();
    const {firstName, lastName, matches, isBoy} = state || {};
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [expandedMatches, setExpandedMatches] = useState({});
    const navigate = useNavigate();

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#1F2937'
    };

    const headerStyle = {
        background: 'linear-gradient(135deg, #FEF7CD 0%, #FED7AA 100%)',
        borderBottom: '2px solid #F3E8FF',
        padding: '24px 0',
        position: 'relative',
        overflow: 'hidden'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid #FEF3C7',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
    };

    if (!matches || !Array.isArray(matches)) {
        return (
            <div style={{
                ...containerStyle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "rtl"
            }}>
                <div style={{ textAlign: 'center' }}>
                    <Heart style={{ width: '64px', height: '64px', color: '#D97706', margin: '0 auto 24px' }} />
                    <p style={{ fontSize: "24px", color: "#6B7280", textAlign: "center", maxWidth: '400px' }}>
                        לא התקבלו נתוני התאמות. אנא נסה שוב.
                    </p>
                </div>
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

    const translateKey = (key) => {
        const map = {
            "Age Difference": "הפרש גיל",
            "Boy Proposal Count": "מספר הצעות בחור",
            "Choice Match": "אותה כיסוי ראש",
            "Community Match": "אותה קהילה",
            "Family Position Match": "מיקום במשפחה",
            "Father Address Match": "כתובת האב",
            "Mother Address Match": "כתובת האם",
            "Style Match": "סגנון דומה",
            "fatherInfo_choice_match": "עיסוק האב דומה",
            "fatherInfo_community_match": "קהילת האב",
            "fatherInfo_dress_match": "לבוש האב",
            "fatherInfo_origin_match": "מוצא האב",
            "fatherInfo_style_match": "סגנון האב",
            "fatherInfo_workplace_match": "מקום עבודה של האב",
            "motherInfo_choice_match": "כיסוי ראש האם דומה",
            "motherInfo_community_match": "קהילת האם",
            "motherInfo_dress_match": "לבוש האם",
            "motherInfo_origin_match": "מוצא האם",
            "motherInfo_style_match": "סגנון האם",
            "motherInfo_workplace_match": "מקום עבודה של האם",
            "Status": "סטטוס (לא מוצג)"
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

        const config = {
            success: {
                bgColor: "#F0FDF4",
                borderColor: "#22C55E",
                textColor: "#15803D",
                icon: <CheckCircle size={16} />
            },
            fail: {
                bgColor: "#FEF2F2",
                borderColor: "#EF4444",
                textColor: "#DC2626",
                icon: <XCircle size={16} />
            },
            neutral: {
                bgColor: "#F8FAFC",
                borderColor: "#CBD5E1",
                textColor: "#64748B",
                icon: <Users size={16} />
            }
        }[status];

        return (
            <div key={key} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "12px",
                backgroundColor: config.bgColor,
                border: `2px solid ${config.borderColor}`,
                fontSize: "14px",
                fontWeight: '500',
                transition: 'all 0.2s ease'
            }}>
                <span style={{ color: '#374151' }}>{label}</span>
                <span style={{ color: config.textColor, display: 'flex', alignItems: 'center' }}>
                    {config.icon}
                </span>
            </div>
        );
    };

    const toggleShowAll = (idx) => {
        setExpandedMatches(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const getScoreColor = (score) => {
        if (score >= 0.9) return '#059669';
        if (score >= 0.8) return '#D97706';
        return '#6B7280';
    };

    const getScoreGradient = (score) => {
        const color = getScoreColor(score);
        return `conic-gradient(${color} ${score * 360}deg, #F3F4F6 0deg)`;
    };

    return (
        <div style={containerStyle} dir="rtl">
            {/* Compact Header */}
            <div style={headerStyle}>
                <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
                    {/* Title + Name in one line */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        marginBottom: '16px'
                    }}>
                        <h1 style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#1F2937",
                            margin: "0"
                        }}>
                            {labelTitle}
                        </h1>

                        <div style={{
                            width: '2px',
                            height: '30px',
                            backgroundColor: '#D97706',
                            opacity: 0.3
                        }}></div>

                        <p style={{
                            fontSize: "18px",
                            color: "#6B7280",
                            margin: "0",
                            fontWeight: "600"
                        }}>
                            {firstName} {lastName}
                        </p>
                    </div>

                    {/* Stats in one line */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '24px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.5)'
                        }}>
                            <TrendingUp size={16} style={{ color: '#D97706' }} />
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>
                                {sortedMatches.length} התאמות
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.5)'
                        }}>
                            <Award size={16} style={{ color: '#059669' }} />
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2937' }}>
                                {(sortedMatches[0]?.AdjustedScore * 100).toFixed(0)}% מקסימום
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {sortedMatches.map((match, idx) => {
                        const detailsArray = Object.entries(match.Details || {})
                            .filter(([key]) => key !== "Status" && !key.toLowerCase().includes("yeshiva"))
                            .sort((a, b) => {
                                const getStatusPriority = ([key, value]) => {
                                    const isBool = typeof value === "boolean";
                                    const isNum = typeof value === "number";
                                    if ((isBool && value) || (isNum && value >= 0.8)) return 0;
                                    if ((isBool && !value) || (isNum && value <= 0.4)) return 2;
                                    return 1;
                                };
                                return getStatusPriority(a) - getStatusPriority(b);
                            });

                        const showAll = expandedMatches[idx];
                        const visibleDetails = showAll ? detailsArray : detailsArray.slice(0, 6);

                        return (
                            <div key={idx} style={{
                                ...cardStyle,
                                background: idx === 0 ? 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' : 'white',
                                border: idx === 0 ? '2px solid #D97706' : '2px solid #FEF3C7'
                            }}>
                                {/* Top badge for best match */}
                                {idx === 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '24px',
                                        background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                                    }}>
                                        <Crown size={14} />
                                        המתאים ביותר
                                    </div>
                                )}

                                {/* Decorative elements */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '-15px',
                                    width: '100px',
                                    height: '100px',
                                    background: `linear-gradient(45deg, ${getScoreColor(match.AdjustedScore)}20, transparent)`,
                                    borderRadius: '50%',
                                    opacity: '0.5'
                                }}></div>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "24px",
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            marginBottom: "8px"
                                        }}>
                                            <h3 style={{
                                                fontSize: "24px",
                                                fontWeight: "bold",
                                                color: "#1F2937",
                                                margin: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                <Heart size={20} style={{ color: '#D97706' }} />
                                                {match.targetName}
                                            </h3>
                                        </div>
                                        <p style={{
                                            color: '#6B7280',
                                            margin: 0,
                                            fontSize: '14px'
                                        }}>
                                            מועמדת מס' {idx + 1} • מחושב על בסיס {detailsArray.length} פרמטרים
                                        </p>
                                    </div>

                                    {/* Score Circle */}
                                    <div style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        background: getScoreGradient(match.AdjustedScore),
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div style={{
                                            width: "70px",
                                            height: "70px",
                                            borderRadius: "50%",
                                            backgroundColor: "white",
                                            display: "flex",
                                            flexDirection: 'column',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: getScoreColor(match.AdjustedScore)
                                        }}>
                                            <div>{(match.AdjustedScore * 100).toFixed(0)}%</div>
                                            <Sparkles size={12} style={{ marginTop: '2px', opacity: 0.7 }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                                    gap: "12px",
                                    marginBottom: "20px"
                                }}>
                                    {visibleDetails.map(([key, value]) => renderDetailBox(key, value))}
                                </div>

                                {/* Show/Hide button */}
                                {detailsArray.length > 6 && (
                                    <button
                                        onClick={() => toggleShowAll(idx)}
                                        style={{
                                            background: "none",
                                            border: "2px solid #D97706",
                                            color: "#D97706",
                                            cursor: "pointer",
                                            borderRadius: '8px',
                                            padding: '8px 16px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            marginBottom: "20px",
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#D97706';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#D97706';
                                        }}
                                    >
                                        {showAll ? "הסתר פרטים" : `הצג עוד ${detailsArray.length - 6} פרטים`}
                                    </button>
                                )}

                                {/* Action Buttons */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "12px",
                                    flexWrap: 'wrap'
                                }}>
                                    {idx === 0 && !statusUpdated && (
                                        <button
                                            onClick={() => {
                                                setStatusUpdated(true);
                                                alert("🎉 מזל טוב! השידוך סומן כהצלחה!");
                                            }}
                                            style={{
                                                background: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "12px",
                                                padding: "12px 24px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                transition: 'all 0.2s ease',
                                                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                                            }}
                                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                        >
                                            <CheckCircle size={16} />
                                            אשר שידוך
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(`/profile/${isGirlMatches ? "girl" : "boy"}/${match.targetId}`)}
                                        style={{
                                            background: "transparent",
                                            color: "#D97706",
                                            border: "2px solid #D97706",
                                            borderRadius: "12px",
                                            padding: "12px 24px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#D97706';
                                            e.target.style.color = 'white';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#D97706';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <Eye size={16} />
                                        פרטים נוספים
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div style={{
                textAlign: "center",
                padding: "24px",
                borderTop: "2px solid #F3E8FF",
                marginTop: "32px",
                background: 'linear-gradient(to right, #FEF7CD, #FED7AA)'
            }}>
                <p style={{
                    color: "#374151",
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "0 0 4px 0"
                }}>
                    "בזכות התאמה מושלמת נולדים בתים נאמנים בישראל"
                </p>
                <p style={{
                    color: "#6B7280",
                    margin: 0,
                    fontSize: "12px"
                }}>
                    Match Shtark © 2025 - מערכת שידוכים חכמה עם נשמה יהודית
                </p>
            </div>
        </div>
    );
}

export default MatchesPage;