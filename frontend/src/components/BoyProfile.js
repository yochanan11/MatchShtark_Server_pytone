import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BoyProfile() {
    const { index } = useParams();
    const [boy, setBoy] = useState(null);
    const [showFather, setShowFather] = useState(false);
    const [showMother, setShowMother] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [showInLaws, setShowInLaws] = useState(false);
    const [showProposals, setShowProposals] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/api/boy/${index}`)
            .then(res => res.json())
            .then(data => {
                setBoy(data);
            });
    }, [index]);

    if (!boy) return <p>טוען...</p>;

    const info = boy.studentInfo || {};

    return (
        <div className="container mt-4" dir="rtl">
            <h3 className="text-center">פרטי בחור: {info.firstName} {info.lastName}</h3>
            <ul>
                <li>גיל: {info.age}</li>
                <li>ישיבה נוכחית: {info.currentYeshiva}</li>
                <li>בחירה: {info.choice}</li>
                <li>סגנון: {info.style}</li>
                <li>טלפון: {info.phone}</li>
            </ul>

            <button className="btn btn-outline-primary m-1" onClick={() => setShowFather(!showFather)}>פרטי אב</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowMother(!showMother)}>פרטי אם</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowContacts(!showContacts)}>שכנים וחברים</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowInLaws(!showInLaws)}>מחותנים</button>
            <button className="btn btn-outline-primary m-1" onClick={() => setShowProposals(!showProposals)}>הצעות</button>

            {showFather && boy.fatherInfo && (
                <div className="mt-3">
                    <h5>פרטי אב</h5>
                    <ul>
                        <li>שם: {boy.fatherInfo.fullName}</li>
                        <li>עיסוק: {boy.fatherInfo.workplace}</li>
                        <li>כתובת: {boy.fatherInfo.address}</li>
                        <li>טלפון: {boy.fatherInfo.phone}</li>
                    </ul>
                </div>
            )}

            {showMother && boy.motherInfo && (
                <div className="mt-3">
                    <h5>פרטי אם</h5>
                    <ul>
                        <li>שם: {boy.motherInfo.fullName}</li>
                        <li>עיסוק: {boy.motherInfo.workplace}</li>
                        <li>סגנון: {boy.motherInfo.style}</li>
                    </ul>
                </div>
            )}

            {showContacts && (
                <div className="mt-3">
                    <h5>שכנים וחברים</h5>
                    {boy[" Contact Phones"]?.Friends?.map((f, i) => (
                        <p key={i}>חבר: {f.name} - {f.phone}</p>
                    ))}
                    {boy[" Contact Phones"]?.Neighbors?.map((n, i) => (
                        <p key={i}>שכן: {n.name} - {n.phone}</p>
                    ))}
                </div>
            )}

            {showInLaws && (
                <div className="mt-3">
                    <h5>‍מחותנים</h5>
                    {boy.inLaws?.map((il, i) => (
                        <p key={i}>{il.name} - {il.city} - {il.Address}</p>
                    ))}
                </div>
            )}

            {showProposals && (
                <div className="mt-3">
                    <h5>הצעות</h5>
                    {boy.proposals?.length > 0 ? boy.proposals.map((p, i) => (
                        <p key={i}>
                            {p.girlName && <><b>{p.girlName}</b> - </>}
                            {p.status === "success" ? "✅ שידוך הצליח" : "❌ נכשל"} - סיבה: {p.reason}
                        </p>
                    )) : <p>אין הצעות.</p>}
                </div>
            )}
        </div>
    );
}

export default BoyProfile;
