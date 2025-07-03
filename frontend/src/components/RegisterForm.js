import React, { useState } from "react";
import FormFields from "./FormFields";
import AlreadyRegistered from "./AlreadyRegistered";

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const form = e.target;
    const formData = new FormData(form);
    const user = Object.fromEntries(formData.entries());

    // 🔐 אימות סיסמאות
    if (user.password !== user.confirmPassword) {
      setMessage("❌ הסיסמאות אינן תואמות");
      setIsLoading(false);
      return;
    }

    // 📞 בדיקת טלפון ישראלי תקין
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(user.phone)) {
      setMessage("❌ יש להזין מספר טלפון ישראלי תקין");
      setIsLoading(false);
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
        setMessage(`❌ ${result.error || "אירעה שגיאה בהרשמה"}`);
        setIsLoading(false);
        return;
      }

      setMessage(`✅ ${result.message || "נרשמת בהצלחה! ברוך הבא למשפחת Match Shtark"}`);
      form.reset(); // איפוס הטופס

      // Redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      console.error("❌ שגיאה ברישום:", err);
      setMessage("❌ שגיאה ברישום - נסה שוב");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    backgroundColor: '#059669',
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '40px 20px'
    }} dir="rtl">
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>


        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          border: '2px solid #FEF3C7',
          padding: '40px',
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            right: '-15px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #05966920, transparent)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-15px',
            left: '-15px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #D9770620, transparent)',
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
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)',
                fontSize: '32px'
              }}>
                📝
              </div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1F2937',
                margin: '0 0 8px 0'
              }}>
                הרשמה למערכת
              </h2>
              <p style={{
                color: '#6B7280',
                margin: 0,
                fontSize: '16px'
              }}>
                הצטרף למשפחת Match Shtark והתחל את המסע שלך
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <FormFields />

              <button
                type="submit"
                style={buttonStyle}
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
                    נרשם...
                  </>
                ) : (
                  <>
                    🚀 הרשמה למערכת
                  </>
                )}
              </button>
            </form>

            {message && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: message.includes('✅') ? '#F0FDF4' : '#FEF2F2',
                border: `2px solid ${message.includes('✅') ? '#DCFCE7' : '#FECACA'}`,
                color: message.includes('✅') ? '#059669' : '#DC2626',
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

        <AlreadyRegistered />
      </div>
    </div>
  );
}

export default RegisterForm;