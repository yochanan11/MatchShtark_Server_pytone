import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Spinner from "../Spinner";
import EditableField from "./EditableField";
import ParentSection from "./ParentSection";
import ContactsSection from "./ContactsSection";
import InLawsSection from "./InLawsSection";
import ProposalsSection from "./ProposalsSection";
import SectionToggle from "./SectionToggle";

function ProfilePage({isBoy}) {
    const {index, recordId} = useParams();
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const id = isBoy ? index : recordId;

    useEffect(() => {
        if (!id) {
            console.warn("⚠️ מזהה (id) לא קיים - לא נשלחה בקשה לשרת");
            return;
        }

        const url = isBoy
            ? `http://localhost:5000/api/boy/${id}`
            : `http://localhost:5000/api/girl/${id}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log("📦", data.contactPhones);
                setData(data);
                setOriginalData(JSON.parse(JSON.stringify(data)));
                setProposals(data.proposals || []); // ✅ קבלת הצעות ישירות מהתגובה
            })
            .catch((err) => {
                console.error("❌ שגיאה בעת שליחת בקשת fetch:", err);
            });

        if (!isBoy) {
            fetch(`http://localhost:5000/api/girl/proposals/${recordId}`)
                .then((res) => res.json())
                .then((data) => setProposals(data))
                .catch((err) => {
                    console.error("❌ שגיאה בקבלת הצעות לבחורה:", err);
                });
        }
    }, [id, isBoy, recordId]);


    const info = data?.studentInfo || {};

    const handleSave = async () => {
        const url = isBoy
            ? `http://localhost:5000/api/boy/${id}`
            : `http://localhost:5000/api/girl/${id}`;

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            });

            const result = await res.json();
            alert(result.message || "שמירה נכשלה");
            setEditMode(false);
        } catch (err) {
            console.error("❌ שגיאה בשמירה:", err);
            alert("אירעה שגיאה בשמירה");
        }
    };

    const handleEditToggle = () => {
        if (editMode) {
            setData(originalData);
        } else {
            setOriginalData(JSON.parse(JSON.stringify(data)));
        }
        setEditMode(!editMode);
    };

    if (!data) return <Spinner text="טוען פרטי משתמש..."/>;

    return (
        <div className="container mt-4" dir="rtl">
            <h3 className="text-center">
                פרטי {isBoy ? "בחור" : "בחורה"}: {info.firstName} {info.lastName}
                <button
                    className="btn btn-sm btn-outline-primary mx-3"
                    onClick={handleEditToggle}
                >
                    {editMode ? "ביטול" : "✏️ ערוך"}
                </button>
            </h3>

            {editMode ? (
                <div className="card p-3 text-end">
                    <EditableField label="שם פרטי" value={info.firstName} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, firstName: val},
                        }))
                    }/>
                    <EditableField label="שם משפחה" value={info.lastName} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, lastName: val},
                        }))
                    }/>
                    <EditableField label="גיל" value={info.age} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, age: val},
                        }))
                    }/>
                    <EditableField label="טלפון" value={info.phone} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, phone: val},
                        }))
                    }/>
                    <EditableField label="סגנון" value={info.style} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, style: val},
                        }))
                    }/>
                    <EditableField label="בחירה" value={info.choice} onChange={(val) =>
                        setData((prev) => ({
                            ...prev,
                            studentInfo: {...prev.studentInfo, choice: val},
                        }))
                    }/>

                    <EditableField
                        label="סמינר/ישיבה"
                        value={info.currentSeminary || info.currentYeshiva || ""}
                        onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: {
                                    ...prev.studentInfo,
                                    ...(info.currentSeminary !== undefined
                                        ? {currentSeminary: val}
                                        : {currentYeshiva: val}),
                                },
                            }))
                        }
                    />
                    <button className="btn btn-success mt-3" onClick={handleSave}>
                        💾 שמור
                    </button>
                </div>
            ) : (
                <ul className="text-end">
                    <li>גיל: {info.age}</li>
                    <li>טלפון: {info.phone}</li>
                    <li>סמינר/ישיבה: {info.currentSeminary || info.currentYeshiva}</li>
                    <li>בחירה: {info.choice}</li>
                    <li>סגנון: {info.style}</li>
                </ul>
            )}

            <SectionToggle label="פרטי אב">
                <ParentSection
                    label="אב"
                    parentInfo={data.fatherInfo || {}}
                />
            </SectionToggle>

            <SectionToggle label="פרטי אם">
                <ParentSection
                    label="אם"
                    parentInfo={data.motherInfo || {}}
                />
            </SectionToggle>

            <SectionToggle label="שכנים וחברים">
                <ContactsSection
                    friends={data.contactPhones?.Friends || []}
                    neighbors={data.contactPhones?.Neighbors || []}
                />
            </SectionToggle>

            <SectionToggle label="מחותנים">
                <InLawsSection
                    inLaws={data.inLaws || []}
                />
            </SectionToggle>


            <SectionToggle label="הצעות">
                <ProposalsSection proposals={proposals}/>
            </SectionToggle>

        </div>
    );
}

export default ProfilePage;
