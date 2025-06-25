import React from "react";
import LogoHeader from "./LogoHeader";
import FormFields from "./FormFields";
import AlreadyRegistered from "./AlreadyRegistered";

function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    // 🔐 אימות סיסמאות
    if (user.password !== user.confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    // 📞 בדיקת טלפון ישראלי תקין
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(user.phone)) {
      alert("יש להזין מספר טלפון ישראלי תקין");
      return;
    }

    // ✅ הסרה של confirmPassword לפני שליחה לשרת
    delete user.confirmPassword;

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await res.json();

      // ⚠️ טיפול במקרה שהמייל כבר קיים
      if (!res.ok) {
        alert(result.error || "אירעה שגיאה בהרשמה");
        return;
      }

      alert(result.message || "נרשמת בהצלחה");
      form.reset(); // איפוס הטופס
    } catch (err) {
      console.error("❌ שגיאה ברישום:", err);
      alert("שגיאה ברישום");
    }
  };

  return (
    <div className="container text-center mt-5" dir="rtl">
      <LogoHeader />
      <form onSubmit={handleSubmit} className="mx-auto p-4 border rounded" style={{ maxWidth: "400px" }}>
        <FormFields />
        <input type="submit" className="btn btn-primary" value="הרשמה" />
      </form>
      <AlreadyRegistered />
    </div>
  );
}

export default RegisterForm;
