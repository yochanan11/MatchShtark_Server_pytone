import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"; // 👈 ייבוא הקומפוננטה החדשה

function BoysTable() {
    const [boys, setBoys] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/boys")
            .then(res => {
                if (!res.ok) throw new Error("שגיאה בשליפת הנתונים מהשרת");
                return res.json();
            })
            .then(data => {
                setBoys(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner text="טוען את רשימת הבחורים..." />;

    return (
        <div className="card p-3 mt-4">
            <h5 className="mb-3">📋 רשימת הבחורים מהשרת</h5>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-bordered text-end">
                <thead className="table-light">
                    <tr>
                        <th>#</th>
                        <th>שם</th>
                        <th>סטטוס</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {boys.map(boy => {
                        const isMatched = boy.proposals?.some(p => p.status === "success");
                        const status = isMatched ? "שודך" : "פנוי";

                        return (
                            <tr key={boy.index}>
                                <td>{boy.index}</td>
                                <td>{boy.studentInfo?.firstName} {boy.studentInfo?.lastName}</td>
                                <td>
                                    <span className={`badge ${status === "פנוי" ? "bg-success" : "bg-secondary"}`}>
                                        {status}
                                    </span>
                                </td>
                                <td>
                                    <a href={`/boys/${boy.index}`} className="btn btn-sm btn-outline-info">פרטי הבחור</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BoysTable;
