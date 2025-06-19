// components/BoysTable.js
import React, { useEffect, useState } from "react";

function BoysTable() {
    const [boys, setBoys] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/boys") // ← זה השרת שלך
            .then(res => {
                if (!res.ok) throw new Error("שגיאה בשליפת הנתונים מהשרת");
                return res.json();
            })
            .then(setBoys)
            .catch(err => setError(err.message));
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {boys.map(boy => (
                        <tr key={boy.index}>
                            <td>{boy.index}</td>
                            <td>{boy.name}</td>
                            <td>
                                <span className={`badge ${boy.status === "פנוי" ? "bg-success" : "bg-secondary"}`}>
                                    {boy.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BoysTable;
