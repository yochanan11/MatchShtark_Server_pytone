import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GirlProfile() {
    const { recordId } = useParams();
    const [girl, setGirl] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [showFather, setShowFather] = useState(false);
    const [showMother, setShowMother] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showInLaws, setShowInLaws] = useState(false);
    const [showProposals, setShowProposals] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/girl/${recordId}`)
            .then(res => res.json())
            .then(data => setGirl(data));

        fetch(`http://localhost:5000/api/girl/proposals/${recordId}`)
            .then(res => res.json())
            .then(data => setProposals(data));
    }, [recordId]);

    if (!girl) return <p>טוען...</p>;

    const info = girl.studentInfo || {};

    const handleSave = async () => {
        const res = await fetch(`http://localhost:5000/api/girl/${recordId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(girl)
        });
        const data = await res.json();
        alert(data.message || "שמירה נכשלה");
        setEditMode(false);
    };

    return (
        <div className="container mt-4" dir="rtl">
            <h3 className="text-center">פרטי בחורה: {info.firstName} {info.lastName}
                <button className="btn btn-sm btn-outline-warning mx-3" onClick={() => setEditMode(!editMode)}>
                    {editMode ? "ביטול" : "✏️ ערוך"}
                </button>
            </h3>

            {editMode ? (
                <div className="card p-3 text-end">
                    <label>שם פרטי:
                        <input type="text" className="form-control" value={info.firstName || ""}
                               onChange={e => setGirl(prev => ({
                                   ...prev,
                                   studentInfo: { ...prev.studentInfo, firstName: e.target.value }
                               }))}/>
                    </label>
                    <label>שם משפחה:
                        <input type="text" className="form-control" value={info.lastName || ""}
                               onChange={e => setGirl(prev => ({
                                   ...prev,
                                   studentInfo: { ...prev.studentInfo, lastName: e.target.value }
                               }))}/>
                    </label>
                    <label>סמינר נוכחי:
                        <input type="text" className="form-control" value={info.currentSeminary || ""}
                               onChange={e => setGirl(prev => ({
                                   ...prev,
                                   studentInfo: { ...prev.studentInfo, currentSeminary: e.target.value }
                               }))}/>
                    </label>
                    <button className="btn btn-success mt-3" onClick={handleSave}>💾 שמור</button>
                </div>
            ) : (
                <ul>
                    <li>גיל: {info.age}</li>
                    <li>סמינר נוכחי: {info.currentSeminary}</li>
                    <li>בחירה: {info["בחירה"]}</li>
                    <li>סגנון: {info.style}</li>
                    <li>טלפון: {info.phone}</li>
                </ul>
            )}

            <button className="btn btn-outline-primary m-1" onClick={() => setShowFather(!showFather)}>פרטי אב</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowMother(!showMother)}>פרטי אם</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowContacts(!showContacts)}>שכנים וחברים</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowInLaws(!showInLaws)}>מחותנים</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowProposals(!showProposals)}>הצעות</button>

            {showFather && girl.fatherInfo && (
                <div className="mt-3">
                    <h5>פרטי אב</h5>
                    <ul>
                        <li>שם: {girl.fatherInfo.fullName}</li>
                        <li>עיסוק: {girl.fatherInfo.workplace}</li>
                        <li>כתובת: {girl.fatherInfo.address}</li>
                        <li>טלפון: {girl.fatherInfo.phone}</li>
                    </ul>
                </div>
            )}

            {showMother && girl.motherInfo && (
                <div className="mt-3">
                    <h5>פרטי אם</h5>
                    <ul>
                        <li>שם: {girl.motherInfo.fullName}</li>
                        <li>עיסוק: {girl.motherInfo.workplace}</li>
                        <li>סגנון: {girl.motherInfo.style}</li>
                    </ul>
                </div>
            )}

            {showContacts && (
                <div className="mt-3">
                    <h5>שכנים וחברים</h5>
                    {girl.contactPhones?.Friends?.map((f, i) => (
                        <p key={i}>חברה: {f.Name} - {f.Phone}</p>
                    ))}
                    {girl.contactPhones?.Neighbors?.map((n, i) => (
                        <p key={i}>שכנה: {n.Name} - {n.Phone}</p>
                    ))}
                </div>
            )}

            {showInLaws && (
                <div className="mt-3">
                    <h5>מחותנים</h5>
                    {girl.inLaws?.map((il, i) => (
                        <p key={i}>{il.Name} - {il.City} - {il.Address}</p>
                    ))}
                </div>
            )}

            {showProposals && (
                <div className="mt-3">
                    <h5>הצעות</h5>
                    {proposals.length > 0 ? proposals.map((p, i) => (
                        <p key={i}>
                            <b>{p.boyName}</b> - {p.status === "success" ? "✅ שידוך הצליח" : "❌ נכשל"} - סיבה: {p.reason}
                        </p>
                    )) : <p>אין הצעות כרגע.</p>}
                </div>
            )}
        </div>
    );
}

export default GirlProfile;
