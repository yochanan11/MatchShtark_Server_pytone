import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import EditableField from "./EditableField";
import ParentSection from "./ParentSection";
import ContactsSection from "./ContactsSection";
import InLawsSection from "./InLawsSection";
import ProposalsSection from "./ProposalsSection";
import SectionToggle from "./SectionToggle";
import {
  User, Edit, Save, X, Phone, Calendar, MapPin, Heart, Users, Building,
  FileText, Crown, Sparkles, CheckCircle, AlertCircle, Loader, ChevronDown,
  ChevronUp, UserCheck, Mail, Home
} from 'lucide-react';

function ProfilePage({ isBoy }) {
    const { recordId } = useParams();
    const [data, setData] = useState(null);
    const [originalData, setOriginalData] = useState(null);
    const [proposals, setProposals] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!recordId) {
            setError("❌ מזהה לא חוקי");
            setLoading(false);
            return;
        }

        const url = isBoy
            ? `http://localhost:5000/api/boy-by-id/${recordId}`
            : `http://localhost:5000/api/girl/${recordId}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setData(data);
                setOriginalData(JSON.parse(JSON.stringify(data)));
                setProposals(data.proposals || []);
            })
            .catch((err) => {
                console.error("❌ שגיאה בטעינת פרטי משתמש:", err);
                setError("אירעה שגיאה בעת טעינת פרטי המשתמש");
            })
            .finally(() => setLoading(false));

        if (!isBoy) {
            fetch(`http://localhost:5000/api/girl/proposals/${recordId}`)
                .then((res) => res.json())
                .then((data) => setProposals(data))
                .catch((err) => console.error("❌ שגיאה בקבלת הצעות לבחורה:", err));
        }
    }, [recordId, isBoy]);

    const info = data?.studentInfo || {};

    const handleSave = async () => {
        const url = isBoy
            ? `http://localhost:5000/api/boy/${recordId}`
            : `http://localhost:5000/api/girl/${recordId}`;

        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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

    if (loading) return <Spinner text="טוען פרטי משתמש..." />;

    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                direction: 'rtl'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #FEE2E2'
                }}>
                    <AlertCircle size={60} style={{ color: '#DC2626', margin: '0 auto 20px' }} />
                    <h3 style={{ color: '#DC2626', marginBottom: '8px' }}>שגיאה</h3>
                    <p style={{ color: '#6B7280', margin: 0 }}>{error}</p>
                </div>
            </div>
        );
    }

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid #FEF3C7',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
    };

    const buttonStyle = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#D97706',
        color: 'white',
        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'transparent',
        color: '#6B7280',
        border: '2px solid #E5E7EB'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            direction: 'rtl'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={cardStyle}>
                    <div style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-30px',
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%'
                    }}></div>

                    <div style={{
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '20px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: isBoy ? '#3B82F6' : '#EC4899',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                            }}>
                                {isBoy ? (
                                    <UserCheck size={40} style={{ color: 'white' }} />
                                ) : (
                                    <Crown size={40} style={{ color: 'white' }} />
                                )}
                            </div>
                            <div>
                                <h1 style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    color: '#1F2937',
                                    margin: 0,
                                    marginBottom: '8px'
                                }}>
                                    {info.firstName} {info.lastName}
                                </h1>
                                <p style={{
                                    color: '#6B7280',
                                    margin: 0,
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span>פרטי {isBoy ? "בחור" : "בחורה"}</span>
                                    <span>•</span>
                                    <span>מזהה: #{recordId}</span>
                                </p>
                            </div>
                        </div>

                        <button
                            style={editMode ? secondaryButtonStyle : primaryButtonStyle}
                            onClick={handleEditToggle}
                            onMouseEnter={(e) => {
                                if (editMode) {
                                    e.target.style.backgroundColor = '#F3F4F6';
                                } else {
                                    e.target.style.backgroundColor = '#B45309';
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (editMode) {
                                    e.target.style.backgroundColor = 'transparent';
                                } else {
                                    e.target.style.backgroundColor = '#D97706';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {editMode ? (
                                <>
                                    <X size={20} />
                                    ביטול
                                </>
                            ) : (
                                <>
                                    <Edit size={20} />
                                    ערוך פרטים
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                {editMode ? (
                    <div style={cardStyle}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1F2937',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            justifyContent: 'flex-end'
                        }}>
                            <Edit size={24} style={{ color: '#D97706' }} />
                            עריכת פרטים אישיים
                        </h3>

                        <EditableField label="שם פרטי" value={info.firstName} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, firstName: val },
                            }))
                        } />
                        <EditableField label="שם משפחה" value={info.lastName} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, lastName: val },
                            }))
                        } />
                        <EditableField label="גיל" value={info.age} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, age: val },
                            }))
                        } />
                        <EditableField label="טלפון" value={info.phone} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, phone: val },
                            }))
                        } />
                        <EditableField label="סגנון" value={info.style} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, style: val },
                            }))
                        } />
                        <EditableField label="בחירה" value={info.choice} onChange={(val) =>
                            setData((prev) => ({
                                ...prev,
                                studentInfo: { ...prev.studentInfo, choice: val },
                            }))
                        } />
                        <EditableField
                            label="סמינר/ישיבה"
                            value={info.currentSeminary || info.currentYeshiva || ""}
                            onChange={(val) =>
                                setData((prev) => ({
                                    ...prev,
                                    studentInfo: {
                                        ...prev.studentInfo,
                                        ...(info.currentSeminary !== undefined
                                            ? { currentSeminary: val }
                                            : { currentYeshiva: val }),
                                    },
                                }))
                            }
                        />
                        <button
                            style={primaryButtonStyle}
                            onClick={handleSave}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#B45309';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#D97706';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            <Save size={20} />
                            שמור שינויים
                        </button>
                    </div>
                ) : (
                    <div style={cardStyle}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#1F2937',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            justifyContent: 'flex-end'
                        }}>
                            <Sparkles size={24} style={{ color: '#D97706' }} />
                            פרטים אישיים
                        </h3>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '16px',
                            backgroundColor: '#F9FAFB',
                            borderRadius: '12px',
                            padding: '20px',
                            border: '1px solid #E5E7EB'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                <Calendar size={18} style={{ color: '#6B7280' }} />
                                <strong>גיל:</strong> {info.age || 'לא זמין'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                <Phone size={18} style={{ color: '#6B7280' }} />
                                <strong>טלפון:</strong> {info.phone || 'לא זמין'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                <Home size={18} style={{ color: '#6B7280' }} />
                                <strong>סמינר/ישיבה:</strong> {info.currentSeminary || info.currentYeshiva || 'לא זמין'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                <Crown size={18} style={{ color: '#6B7280' }} />
                                <strong>בחירה:</strong> {info.choice || 'לא זמין'}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
                                <Sparkles size={18} style={{ color: '#6B7280' }} />
                                <strong>סגנון:</strong> {info.style || 'לא זמין'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Sections with Components */}
                <SectionToggle label="פרטי אב">
                    <ParentSection label="אב" parentInfo={data?.fatherInfo || {}} />
                </SectionToggle>

                <SectionToggle label="פרטי אם">
                    <ParentSection label="אם" parentInfo={data?.motherInfo || {}} />
                </SectionToggle>

                <SectionToggle label="שכנים וחברים">
                    <ContactsSection
                        friends={data?.contactPhones?.Friends || []}
                        neighbors={data?.contactPhones?.Neighbors || []}
                    />
                </SectionToggle>

                <SectionToggle label="מחותנים">
                    <InLawsSection inLaws={data?.inLaws || []} />
                </SectionToggle>

                <SectionToggle label="הצעות">
                    <ProposalsSection proposals={proposals} />
                </SectionToggle>
            </div>
        </div>
    );
}

export default ProfilePage;