import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"; // ודא שזה הנתיב הנכון לרכיב הספינר

function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false); // טעינה הסתיימה
      })
      .catch((err) => {
        console.error("שגיאה בשליפת היסטוריית שידוכים:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }} dir="rtl">

      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #FEF7CD 0%, #FED7AA 100%)',
        borderBottom: '2px solid #F3E8FF',
        padding: '32px 0',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            🏆 💛 שידוכים מוצלחים
          </h2>
          <p style={{ color: '#6B7280', fontSize: '18px', margin: 0 }}>
            בזכות כל שידוך מוצלח נולד בית נאמן בישראל
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 32px' }}>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '2px solid #DBEAFE',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: '0 0 4px 0' }}>
              {matches.length}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>סה"כ שידוכים</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '2px solid #DCFCE7',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>👑</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: '0 0 4px 0' }}>
              {matches.length}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>התאמות מעולות</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '2px solid #FEF3C7',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: '0 0 4px 0' }}>
              100%
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>שיעור הצלחה</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Spinner text="טוען שידוכים מוצלחים..." />
        ) : matches.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '2px solid #FEF3C7',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>💕</div>
            <h3 style={{ fontSize: '24px', color: '#6B7280', margin: '0 0 8px 0' }}>
              לא נמצאו שידוכים מוצלחים
            </h3>
            <p style={{ color: '#9CA3AF', margin: 0 }}>
              אבל אנחנו בטוחים שהם בדרך!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '24px'
          }}>
            {matches.map((match, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  border: '2px solid #FEF3C7',
                  padding: '32px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
                }}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '24px',
                  backgroundColor: '#D97706',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                }}>
                  👑 #{idx + 1}
                </div>

                {/* Decorative element */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(45deg, #D9770620, transparent)',
                  borderRadius: '50%',
                  opacity: '0.5'
                }}></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Names Section */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '16px',
                    alignItems: 'center',
                    marginBottom: '24px'
                  }}>
                    {/* Groom */}
                    <div style={{
                      backgroundColor: '#EFF6FF',
                      borderRadius: '12px',
                      border: '2px solid #DBEAFE',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>🤵</div>
                      <h5 style={{ color: '#1F2937', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        חתן
                      </h5>
                      <p style={{ color: '#374151', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                        {match.boyName}
                      </p>
                    </div>

                    {/* Heart */}
                    <div style={{
                      backgroundColor: '#D97706',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
                    }}>
                      💕
                    </div>

                    {/* Bride */}
                    <div style={{
                      backgroundColor: '#FEF2F2',
                      borderRadius: '12px',
                      border: '2px solid #FECACA',
                      padding: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>👰</div>
                      <h5 style={{ color: '#1F2937', margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
                        כלה
                      </h5>
                      <p style={{ color: '#374151', margin: 0, fontSize: '14px', fontWeight: '600' }}>
                        {match.girlName}
                      </p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div style={{
                    backgroundColor: '#F0F9FF',
                    borderRadius: '12px',
                    border: '2px solid #E0F2FE',
                    padding: '16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ fontSize: '20px', flexShrink: 0 }}>✨</div>
                      <div>
                        <p style={{ color: '#374151', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
                          {match.reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date if available */}
                  {match.date && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '12px' }}>
                      <span>📅</span>
                      <span>תאריך השידוך: {new Date(match.date).toLocaleDateString('he-IL')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
        borderTop: '2px solid #F3E8FF',
        marginTop: '40px'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '16px' }}>💕</div>
        <p style={{
          color: '#374151',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0 0 8px 0'
        }}>
          "בזכות כל שידוך מוצלח נולד בית נאמן בישראל"
        </p>
        <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
          Match Shtark - בינה מלאכותית עם נשמה יהודית
        </p>
      </div>
    </div>
  );
}

export default MatchHistory;