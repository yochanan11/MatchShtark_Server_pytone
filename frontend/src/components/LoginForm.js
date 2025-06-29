import React, { useState } from "react";

function setCookie(name, value, hours) {
    const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function LoginForm({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const [showReset, setShowReset] = useState(false);
    const [resetPassword, setResetPassword] = useState("");
    const [resetConfirm, setResetConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        try {
            // בקשת המשתמש לפי אימייל
            const res = await fetch("http://localhost:5000/api/users");
            const users = await res.json();
            const user = users.find(u => u.userInfo?.email === email);

            if (!user) {
                setMessage("❌ האימייל לא נמצא במערכת");
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
        }
    };

    return (
        <div className="card mx-auto mt-5" style={{ maxWidth: "400px" }} dir="rtl">
            <div className="card-body">
                <h4 className="text-center mb-4">התחברות למערכת</h4>

                {!showReset ? (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">אימייל</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">סיסמה</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <input type="submit" className="btn btn-primary w-100" value="כניסה" />
                        </form>
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-link text-decoration-none"
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
                        <p className="text-muted">נא הזן את האימייל וסיסמה חדשה</p>
                        <div className="mb-3">
                            <label className="form-label">אימייל</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">סיסמה חדשה</label>
                            <input
                                type="password"
                                className="form-control"
                                value={resetPassword}
                                onChange={(e) => setResetPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">אימות סיסמה</label>
                            <input
                                type="password"
                                className="form-control"
                                value={resetConfirm}
                                onChange={(e) => setResetConfirm(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success w-100" onClick={handleResetPassword}>
                            אפס סיסמה
                        </button>
                        <div className="text-center mt-3">
                            <button className="btn btn-link" onClick={() => setShowReset(false)}>
                                חזור למסך התחברות
                            </button>
                        </div>
                    </>
                )}

                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default LoginForm;
