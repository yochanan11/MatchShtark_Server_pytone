import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

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

    if (loading) return <Spinner text="טוען נתונים..." />;

    const mergedData = [
        ...boys.map(b => ({
            ...b,
            type: "בחור",
            name: `${b.studentInfo?.firstName || ""} ${b.studentInfo?.lastName || ""}`,
            institution: b.studentInfo?.currentYeshiva || "לא צוין",
            matched: b.proposals?.some(p => p.status === "success") || false,
            link: `/profile/boy/${b.index}`
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
        <div className="card p-3 mt-4 text-center" dir="rtl">
            {error && <p className="text-danger">{error}</p>}

            <div className="row justify-content-center mb-4">
                <div className="col-md-3 mb-2">
                    <label className="form-label fw-bold">סוג:</label>
                    <select
                        className="form-select"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="הכל">הכל</option>
                        <option value="בנים">בנים</option>
                        <option value="בנות">בנות</option>
                    </select>
                </div>

                <div className="col-md-3 mb-2">
                    <label className="form-label fw-bold">סטטוס:</label>
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="הכל">הכל</option>
                        <option value="פנוי">פנוי</option>
                        <option value="שודך">שודך</option>
                    </select>
                </div>

                <div className="col-md-4 mb-2">
                    <label className="form-label fw-bold">מוסד לימוד:</label>
                    <select
                        className="form-select"
                        value={institutionFilter}
                        onChange={(e) => setInstitutionFilter(e.target.value)}
                    >
                        <option value="הכל">הכל</option>
                        {uniqueInstitutions.map((inst, idx) => (
                            <option key={idx} value={inst}>{inst}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mb-3">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="חיפוש לפי שם..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-2 mb-2">
                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setFilterType("הכל");
                            setStatusFilter("הכל");
                            setInstitutionFilter("הכל");
                            setSearchTerm("");
                        }}
                    >
                        נקה סינונים
                    </button>
                </div>
            </div>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>שם</th>
                        <th>מוסד</th>
                        <th>סטטוס</th>
                        <th>סוג</th>
                        <th>פעולה</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((person, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{person.name}</td>
                            <td>{person.institution}</td>
                            <td>
                                <span className={`badge ${person.matched ? "bg-dark" : "bg-warning"}`}>
                                    {person.matched ? "שודך" : "פנוי"}
                                </span>
                            </td>
                            <td>{person.type}</td>
                            <td>
                                <a href={person.link} className="btn btn-sm btn-outline-warning">
                                    פרטים
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchesTable;