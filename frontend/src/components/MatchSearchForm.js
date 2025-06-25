import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MatchSearchForm() {
    const [boys, setBoys] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
    fetch("http://localhost:5000/api/boys")
        .then(res => res.json())
        .then(data => {
            const freeBoys = data
                .map((boy, i) => {
                    const isMatched = boy.proposals?.some(p => p.status === "success");
                    return {
                        ...boy,
                        name: `${boy.studentInfo?.firstName || ""} ${boy.studentInfo?.lastName || ""}`,
                        status: isMatched ? "שודך" : "פנוי"
                    };
                })
                .filter(boy => boy.status === "פנוי");

            setBoys(freeBoys);
        })
        .catch(() => setMessage("שגיאה בשליפת הבחורים"));
}, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedId) return;

        try {
            const res = await fetch(`http://localhost:5000/api/matches/boy/${selectedId}`, {
                method: "GET"
            });

            const data = await res.json();
            if (data.error) {
                setMessage("שגיאה בשרת: " + data.error);
            } else {
                // ✅ מעבר לדף ההתאמות עם פרטי הבחור + רשימת התאמות
                navigate("/matches", {
                    state: {
                        firstName: data.boy.firstName,
                        lastName: data.boy.lastName,
                        matches: data.matches
                    }
                });
            }
        } catch (err) {
            setMessage("שגיאה בעת שליחת הבקשה");
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-3">🔍 חיפוש התאמות</h3>

            <form onSubmit={handleSubmit}>
                <select
                    className="form-select"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    required
                >
                    <option value="">בחר מועמד פנוי</option>
                    {boys.map(boy => (
                        <option key={boy.index} value={boy.index}>
                            #{boy.index} - {boy.name}
                        </option>
                    ))}
                </select>

                <input type="submit" className="btn btn-primary mt-3" value="חפש התאמות" />
            </form>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}

export default MatchSearchForm;
