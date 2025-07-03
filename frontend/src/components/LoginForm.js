import React, { useState } from "react";

function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function LoginForm({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showReset, setShowReset] = useState(false);
    const [resetPassword, setResetPassword] = useState("");
    const [resetConfirm, setResetConfirm] = useState("");

    const inputStyle = {
        width: '100%',
        padding: '16px 20px',
        border: '2px solid #FEF3C7',
        borderRadius: '12px',
        fontSize: '16px',
        backgroundColor: 'white',
        color: '#374151',
        outline: 'none',
        transition: 'all 0.3s ease',
        paddingLeft: '50px'
    };

    const buttonStyle = {
        width: '100%',
        padding: '16px 24px',
        backgroundColor: '#D97706',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.success) {
                setCookie("user", JSON.stringify(data.user), 12);
                setUser(data.user);
                window.location.href = "/dashboard";
            } else {
                setMessage(data.message || "שגיאה בהתחברות");
            }
        } catch (err) {
            setMessage("שגיאה בשרת");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!resetPassword || !resetConfirm) {
            setMessage("יש למלא את שני שדות הסיסמה");
            return;
        }
        if (resetPassword !== resetConfirm) {
            setMessage("הסיסמאות אינן תואמות");
            return;
        }

        setIsLoading(true);
        try {
            // בקשת המשתמש לפי אימייל
            const res = await fetch("http://localhost:5000/api/users");
            const users = await res.json();
            const user = users.find(u => u.userInfo?.email === email);

            if (!user) {
                setMessage("❌ האימייל לא נמצא במערכת");
                setIsLoading(false);
                return;
            }

            // שליחת הסיסמה החדשה
            const res2 = await fetch(`http://localhost:5000/api/users/set-password/${user.recordId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newPassword: resetPassword })
            });

            const data = await res2.json();

            if (res2.ok) {
                setMessage("✅ הסיסמה עודכנה. כעת ניתן להתחבר");
                setShowReset(false);
            } else {
                setMessage(data.error || "שגיאה בעדכון הסיסמה");
            }
        } catch (err) {
            setMessage("❌ שגיאה בשרת");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '2px solid #FEF3C7',
            padding: '40px',
            maxWidth: '450px',
            margin: '40px auto',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }} dir="rtl">
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '100px',
                height: '100px',
                background: 'linear-gradient(45deg, #D9770620, transparent)',
                borderRadius: '50%'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-15px',
                left: '-15px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(45deg, #F59E0B20, transparent)',
                borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#D97706',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 8px 25px rgba(217, 119, 6, 0.3)',
                        fontSize: '32px'
                    }}>
                        {showReset ? '🔒' : '🔑'}
                    </div>
                    <h4 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#1F2937',
                        margin: '0 0 8px 0'
                    }}>
                        {showReset ? 'איפוס סיסמה' : 'התחברות למערכת'}
                    </h4>
                    <p style={{
                        color: '#6B7280',
                        margin: 0,
                        fontSize: '16px'
                    }}>
                        {showReset ? 'הזן פרטים לאיפוס הסיסמה' : 'ברוכים הבאים חזרה!'}
                    </p>
                </div>

                {!showReset ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '24px', position: 'relative' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    📧 אימייל
                                </label>
                                <input
                                    type="email"
                                    style={inputStyle}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                    onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                                />
                            </div>

                            <div style={{ marginBottom: '24px', position: 'relative' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}>
                                    🔒 סיסמה
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        style={inputStyle}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="הזן סיסמה"
                                        required
                                        onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                        onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                                    />
                                    <button
                                        type="button"
                                        style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#9CA3AF',
                                            cursor: 'pointer',
                                            fontSize: '16px'
                                        }}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={buttonStyle}
                                disabled={isLoading}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        e.target.style.backgroundColor = '#B45309';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isLoading) {
                                        e.target.style.backgroundColor = '#D97706';
                                        e.target.style.transform = 'translateY(0)';
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid white',
                                            borderTop: '2px solid transparent',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }}></div>
                                        מתחבר...
                                    </>
                                ) : (
                                    <>
                                        🚀 כניסה למערכת
                                    </>
                                )}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#D97706',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                                onClick={() => {
                                    setShowReset(true);
                                    setMessage("");
                                }}
                            >
                                שכחתי סיסמה
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{
                            backgroundColor: '#F0F9FF',
                            border: '1px solid #E0F2FE',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '24px'
                        }}>
                            <p style={{ color: '#0369A1', margin: 0, fontSize: '14px' }}>
                                💡 נא הזן את האימייל וסיסמה חדשה
                            </p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                📧 אימייל
                            </label>
                            <input
                                type="email"
                                style={inputStyle}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                🔑 סיסמה חדשה
                            </label>
                            <input
                                type="password"
                                style={inputStyle}
                                value={resetPassword}
                                onChange={(e) => setResetPassword(e.target.value)}
                                placeholder="הזן סיסמה חדשה"
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '8px'
                            }}>
                                🔐 אימות סיסמה
                            </label>
                            <input
                                type="password"
                                style={inputStyle}
                                value={resetConfirm}
                                onChange={(e) => setResetConfirm(e.target.value)}
                                placeholder="הזן סיסמה שוב"
                                onFocus={(e) => e.target.style.borderColor = '#D97706'}
                                onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                            />
                        </div>

                        <button
                            style={{
                                ...buttonStyle,
                                backgroundColor: '#059669'
                            }}
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#047857';
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.target.style.backgroundColor = '#059669';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid white',
                                        borderTop: '2px solid transparent',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}></div>
                                    מעדכן...
                                </>
                            ) : (
                                <>
                                    🔄 אפס סיסמה
                                </>
                            )}
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                type="button"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6B7280',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}
                                onClick={() => setShowReset(false)}
                            >
                                ← חזור למסך התחברות
                            </button>
                        </div>
                    </>
                )}

                {message && (
                    <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        borderRadius: '12px',
                        backgroundColor: message.includes('✅') ? '#F0FDF4' :
                                       message.includes('❌') ? '#FEF2F2' : '#F0F9FF',
                        border: `2px solid ${message.includes('✅') ? '#DCFCE7' : 
                                              message.includes('❌') ? '#FECACA' : '#E0F2FE'}`,
                        color: message.includes('✅') ? '#059669' :
                               message.includes('❌') ? '#DC2626' : '#0369A1',
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {message}
                    </div>
                )}
            </div>

            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
}

export default LoginForm;