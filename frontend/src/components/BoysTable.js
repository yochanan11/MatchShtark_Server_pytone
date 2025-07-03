import React, {useEffect, useState} from "react";
import {Search, Filter, Users, Heart, School, User, RefreshCw, Eye} from "lucide-react";

// Spinner Component
function Spinner({text = "טוען..."}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #FEF3C7',
                borderTop: '4px solid #D97706',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '16px'
            }}></div>
            <p style={{color: '#92400E', fontSize: '16px'}}>{text}</p>
            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
}

function MatchesTable() {
    const [boys, setBoys] = useState([]);
    const [girls, setGirls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filterType, setFilterType] = useState("הכל");
    const [statusFilter, setStatusFilter] = useState("הכל");
    const [institutionFilter, setInstitutionFilter] = useState("הכל");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/api/boys").then(res => res.json()),
            fetch("http://localhost:5000/api/girls").then(res => res.json())
        ])
            .then(([boysData, girlsData]) => {
                console.log("נתוני בנות:", girlsData);
                setBoys(boysData);
                setGirls(girlsData);
                setLoading(false);
            })
            .catch(err => {
                console.error("שגיאה בשליפת נתונים:", err);
                setError("שגיאה בטעינת הנתונים");
                setLoading(false);
            });
    }, []);

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    };

    const headerStyle = {
        background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
        borderBottom: '1px solid #F3E8FF',
        padding: '32px 0',
        marginBottom: '32px'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
        border: '1px solid #FEF3C7',
        overflow: 'hidden'
    };

    const filterCardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #FEF3C7',
        padding: '24px',
        marginBottom: '24px'
    };

    const selectStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '2px solid #FEF3C7',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: 'white',
        color: '#374151',
        outline: 'none',
        transition: 'border-color 0.2s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '2px solid #FEF3C7',
        borderRadius: '8px',
        fontSize: '14px',
        backgroundColor: 'white',
        color: '#374151',
        outline: 'none',
        transition: 'border-color 0.2s ease'
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: '#D97706',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    };

    const clearButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#6B7280',
        width: '100%'
    };

    const detailsButtonStyle = {
        padding: '6px 12px',
        backgroundColor: 'transparent',
        color: '#D97706',
        border: '1px solid #D97706',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        textDecoration: 'none'
    };

    if (loading) return (
        <div style={containerStyle}>
            <Spinner text="טוען נתונים..."/>
        </div>
    );

    const mergedData = [
        ...boys.map(b => ({
            ...b,
            type: "בחור",
            name: `${b.studentInfo?.firstName || ""} ${b.studentInfo?.lastName || ""}`,
            institution: b.studentInfo?.currentYeshiva || "לא צוין",
            matched: b.proposals?.some(p => p.status === "success") || false,
            link: `/profile/boy/${b.recordId}`
        })),
        ...girls.map(g => ({
            ...g,
            type: "בחורה",
            name: `${g.studentInfo?.firstName || ""} ${g.studentInfo?.lastName || ""}`,
            institution: g.studentInfo?.currentYeshiva?.trim() || g.studentInfo?.currentSeminary?.trim() || g.currentYeshiva?.trim() || g.currentSeminary?.trim() || "לא צוין",
            matched: g.status === "engaged",
            link: `/profile/girl/${g.recordId}`
        }))
    ];

    const partialFilter = mergedData.filter(p => {
        const typeMatch =
            filterType === "הכל" || p.type === (filterType === "בנים" ? "בחור" : "בחורה");

        const statusMatch =
            statusFilter === "הכל" ||
            (statusFilter === "פנוי" && !p.matched) ||
            (statusFilter === "שודך" && p.matched);

        return typeMatch && statusMatch;
    });

    const uniqueInstitutions = [
        ...new Set(partialFilter.map(p => p.institution || "לא צוין"))
    ];

    const filtered = partialFilter.filter(p => {
        const institutionMatch =
            institutionFilter === "הכל" || institutionFilter === p.institution;

        const searchMatch = p.name.includes(searchTerm.trim());

        return institutionMatch && searchMatch;
    });

    return (
        <div style={containerStyle} dir="rtl">
            {/* Header */}
            <div style={headerStyle}>
                <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center'}}>
                    {/* Logo Section */}
                    <div
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'}}>
                        <div style={{
                            color: '#374151',
                            fontSize: '32px',
                            fontFamily: 'serif',
                            letterSpacing: '2px',
                            marginRight: '16px'
                        }}>

                        </div>

                    </div>

                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        margin: '0 0 16px 0'
                    }}>
                        👥 מאגר המועמדים
                    </h1>
                    <p style={{color: '#6B7280', maxWidth: '600px', margin: '0 auto'}}>
                        חפש וסנן מועמדים למציאת ההתאמה המושלמת
                    </p>
                </div>
            </div>

            <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px 32px'}}>
                {error && (
                    <div style={{
                        backgroundColor: '#FEE2E2',
                        border: '1px solid #FECACA',
                        color: '#DC2626',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        padding: '20px',
                        border: '1px solid #FEF3C7',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Users style={{width: '24px', height: '24px', color: '#D97706', marginLeft: '12px'}}/>
                        <div>
                            <h3 style={{fontSize: '14px', color: '#6B7280', margin: 0}}>סה"כ מועמדים</h3>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: '4px 0 0 0'}}>
                                {mergedData.length}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        padding: '20px',
                        border: '1px solid #FEF3C7',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Heart style={{width: '24px', height: '24px', color: '#D97706', marginLeft: '12px'}}/>
                        <div>
                            <h3 style={{fontSize: '14px', color: '#6B7280', margin: 0}}>שודכו בהצלחה</h3>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: '4px 0 0 0'}}>
                                {mergedData.filter(p => p.matched).length}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        padding: '20px',
                        border: '1px solid #FEF3C7',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Search style={{width: '24px', height: '24px', color: '#D97706', marginLeft: '12px'}}/>
                        <div>
                            <h3 style={{fontSize: '14px', color: '#6B7280', margin: 0}}>תוצאות חיפוש</h3>
                            <p style={{fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: '4px 0 0 0'}}>
                                {filtered.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div style={filterCardStyle}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                        <Filter style={{width: '20px', height: '20px', color: '#D97706', marginLeft: '8px'}}/>
                        <h2 style={{fontSize: '18px', fontWeight: 'bold', color: '#1F2937', margin: 0}}>
                            סינון וחיפוש
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '20px'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '6px'
                            }}>
                                סוג:
                            </label>
                            <select
                                style={selectStyle}
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            >
                                <option value="הכל">הכל</option>
                                <option value="בנים">בנים</option>
                                <option value="בנות">בנות</option>
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '6px'
                            }}>
                                סטטוס:
                            </label>
                            <select
                                style={selectStyle}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            >
                                <option value="הכל">הכל</option>
                                <option value="פנוי">פנוי</option>
                                <option value="שודך">שודך</option>
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '6px'
                            }}>
                                מוסד לימוד:
                            </label>
                            <select
                                style={selectStyle}
                                value={institutionFilter}
                                onChange={(e) => setInstitutionFilter(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            >
                                <option value="הכל">הכל</option>
                                {uniqueInstitutions.map((inst, idx) => (
                                    <option key={idx} value={inst}>{inst}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '16px',
                        alignItems: 'end'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '6px'
                            }}>
                                חיפוש לפי שם:
                            </label>
                            <input
                                type="text"
                                style={inputStyle}
                                placeholder="הקלד שם לחיפוש..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            />
                        </div>
                        <button
                            style={clearButtonStyle}
                            onClick={() => {
                                setFilterType("הכל");
                                setStatusFilter("הכל");
                                setInstitutionFilter("הכל");
                                setSearchTerm("");
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#4B5563'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#6B7280'}
                        >
                            <RefreshCw size={16}/>
                            נקה סינונים
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                <div style={cardStyle}>
                    <div style={{
                        background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
                        padding: '16px 24px',
                        borderBottom: '1px solid #FEF3C7'
                    }}>
                        <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1F2937', margin: 0}}>
                            תוצאות חיפוש ({filtered.length} מועמדים)
                        </h3>
                    </div>

                    <div style={{overflowX: 'auto'}}>
                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead>
                            <tr style={{backgroundColor: '#FFFBEB'}}>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'right',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>#
                                </th>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'right',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>שם
                                </th>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'right',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>מוסד
                                </th>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>סטטוס
                                </th>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>סוג
                                </th>
                                <th style={{
                                    padding: '16px 12px',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    borderBottom: '2px solid #FEF3C7'
                                }}>פעולה
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filtered.map((person, idx) => (
                                <tr key={idx} style={{
                                    borderBottom: '1px solid #F3F4F6',
                                    transition: 'background-color 0.2s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFFBEB'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                >
                                    <td style={{
                                        padding: '16px 12px',
                                        fontSize: '14px',
                                        color: '#6B7280'
                                    }}>
                                        {idx + 1}
                                    </td>
                                    <td style={{
                                        padding: '16px 12px',
                                        fontSize: '14px',
                                        color: '#1F2937',
                                        fontWeight: '500'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <User size={16} style={{color: '#D97706', marginLeft: '8px'}}/>
                                            {person.name}
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: '16px 12px',
                                        fontSize: '14px',
                                        color: '#6B7280'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <School size={14} style={{color: '#9CA3AF', marginLeft: '6px'}}/>
                                            {person.institution}
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: '16px 12px',
                                        textAlign: 'center'
                                    }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                                backgroundColor: person.matched ? '#1F2937' : '#FCD34D',
                                                color: person.matched ? 'white' : '#92400E'
                                            }}>
                                                {person.matched ? "שודך" : "פנוי"}
                                            </span>
                                    </td>
                                    <td style={{
                                        padding: '16px 12px',
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        color: '#6B7280'
                                    }}>
                                        {person.type}
                                    </td>
                                    <td style={{
                                        padding: '16px 12px',
                                        textAlign: 'center'
                                    }}>
                                        <a
                                            href={person.link}
                                            style={detailsButtonStyle}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#D97706';
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#D97706';
                                            }}
                                        >
                                            <Eye size={14}/>
                                            פרטים
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: '#6B7280'
                        }}>
                            <Search size={48} style={{color: '#D1D5DB', marginBottom: '16px'}}/>
                            <p style={{fontSize: '16px', margin: 0}}>לא נמצאו תוצאות לחיפוש שלך</p>
                            <p style={{fontSize: '14px', margin: '8px 0 0 0'}}>נסה לשנות את הסינונים או החיפוש</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{marginTop: '48px', textAlign: 'center'}}>
                    <div style={{
                        background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
                        borderRadius: '12px',
                        padding: '24px',
                        border: '1px solid #F3E8FF'
                    }}>
                        <Heart style={{width: '32px', height: '32px', color: '#D97706', margin: '0 auto 12px'}}/>
                        <p style={{color: '#374151', fontSize: '18px', fontWeight: '500', margin: '0 0 8px 0'}}>
                            "כל נשמה מוצאת את זוגה בזמן הנכון"
                        </p>
                        <p style={{color: '#6B7280', margin: 0}}>Match Shtark - בינה מלאכותית עם נשמה יהודית</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MatchesTable;