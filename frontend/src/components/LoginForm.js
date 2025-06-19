import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // ⬅️ מאפשר ניווט לאחר התחברות

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                // ⬅️ התחברות הצליחה, שמירת משתמש והעברה לדף הבית
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/dashboard"); // ⬅️ מעבר לדף הבית
            } else {
                setMessage(data.message || "שגיאה בהתחברות");
            }
        } catch (err) {
            setMessage("שגיאה בשרת");
        }
    };

    return (
        <div className="card mx-auto" style={{ maxWidth: "400px" }}>
            <div className="card-body">
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
                    <input type="submit" className="btn btn-primary" value="כניסה" />
                </form>

                {message && <div className="alert alert-warning mt-3">{message}</div>}
            </div>
        </div>
    );
}

export default LoginForm;
