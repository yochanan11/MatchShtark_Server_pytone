import React, { useState, useEffect } from "react";
import { Heart, Users, TrendingUp, Sparkles, Brain, Shield, Target, Award, ChevronRight, Star, Crown, Zap } from "lucide-react";

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyle = {
    background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
    zIndex: 1
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '2px solid #FEF3C7',
    padding: '32px',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonStyle = {
    padding: '16px 32px',
    backgroundColor: '#D97706',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none'
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl'
    }}>
      {/* Hero Section */}
      <section style={heroStyle}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div style={containerStyle}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            minHeight: '80vh'
          }}>
            {/* Content */}
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 1s ease'
            }}>
              {/* Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px'
              }}>
                <img
                  src="/MatchShtark1.png"
                  alt="Match Shtark Logo"
                  style={{
                    height: '120px',
                    width: 'auto'
                  }}
                />
              </div>

              <h1 style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '24px',
                lineHeight: 1.2
              }}>
                פלטפורמה חכמה<br />
                לשדכנים חרדיים
              </h1>

              <p style={{
                fontSize: '24px',
                color: '#6B7280',
                marginBottom: '32px',
                lineHeight: 1.6
              }}>
                מערכת בינה מלאכותית מתקדמת המסייעת לשדכנים בציבור החרדי
                למצוא התאמות מדויקות ומשמעותיות בקלות ויעילות
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '40px'
              }}>
                <a
                  href="/users/register"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#B45309';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#D97706';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <Heart size={20} />
                  הצטרף לקהילה
                  <ChevronRight size={20} />
                </a>
                <a
                  href="/users/login"
                  style={{
                    ...buttonStyle,
                    backgroundColor: 'transparent',
                    color: '#D97706',
                    border: '2px solid #D97706'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#D97706';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#D97706';
                  }}
                >
                  כניסה לשדכנים
                </a>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#D97706',
                    marginBottom: '8px'
                  }}>
                    50+
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    שדכנים פעילים
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#D97706',
                    marginBottom: '8px'
                  }}>
                    800+
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    שידוכים מוצלחים
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#D97706',
                    marginBottom: '8px'
                  }}>
                    2,500+
                  </div>
                  <div style={{ color: '#6B7280', fontSize: '14px' }}>
                    מועמדים במערכת
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 1s ease 0.3s'
            }}>
              <div style={{
                ...cardStyle,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FEF3C7 100%)',
                textAlign: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(45deg, #D9770620, transparent)',
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#D97706',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 20px 25px rgba(217, 119, 6, 0.3)'
                  }}>
                    <Brain size={60} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1F2937',
                    marginBottom: '16px'
                  }}>
                    בינה מלאכותית לשדכנים
                  </h3>
                  <p style={{
                    color: '#6B7280',
                    lineHeight: 1.6
                  }}>
                    כלי מתקדם המסייע לשדכנים חרדיים לנתח ולהתאים מועמדים
                    בהתבסס על ערכים, רקע משפחתי ותאימות הלכתית
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        background: 'white',
        padding: '100px 0',
        position: 'relative'
      }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <img
              src="/MatchShtark1.png"
              alt="Match Shtark Logo"
              style={{
                height: '120px',
                width: 'auto',
                marginBottom: '32px'
              }}
            />
            <h2 style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: '24px'
            }}>
              למה שדכנים בוחרים ב-Match Shtark?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6B7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              כלים מתקדמים המיועדים במיוחד לקהילת השדכנים החרדיים
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {/* Feature 1 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
              }}>
                <Target size={40} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                התאמות לפי ערכים חרדיים
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                ניתוח מעמיק של רקע הלכתי, זרם חינוכי, מסורת משפחתית
                ורמת הקפדה ליצירת התאמות הולמות לציבור החרדי
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#3B82F6',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Star size={16} fill="currentColor" />
                מותאם לציבור החרדי
              </div>
            </div>

            {/* Feature 2 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
              }}>
                <Shield size={40} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                פרטיות ובטיחות
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                הגנה מלאה על המידע האישי שלך עם הצפנה מתקדמת
                ובקרת גישה קפדנית לפרטים שלך
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#059669',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Shield size={16} />
                הצפנה מתקדמת
              </div>
            </div>

            {/* Feature 3 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#D97706',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.3)'
              }}>
                <Heart size={40} style={{ color: 'white' }} fill="currentColor" />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                בינה מלאכותית מתקדמת
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                אלגוריתמי למידה עמוקה המנתחים דפוסי התנהגות, העדפות אישיות
                וקשרים מורכבים ליצירת התאמות מדויקות עם שיעור הצלחה גבוה
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#D97706',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Crown size={16} />
                אלגוריתמים מתקדמים
              </div>
            </div>

            {/* Feature 4 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#7C3AED',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(124, 58, 237, 0.3)'
              }}>
                <Zap size={40} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                כלים מקצועיים לשדכנים
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                ממשק מותאם לעבודת השדכן: ניהול מועמדים, מעקב אחר התאמות,
                דוחות מפורטים וכלי ניתוח מתקדמים
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#7C3AED',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Zap size={16} />
                חוסך זמן ומאמץ
              </div>
            </div>

            {/* Feature 5 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#DC2626',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)'
              }}>
                <Users size={40} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                רשת שדכנים חרדיים
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                הצטרפות לקהילה של שדכנים מנוסים מכל הזרמים החרדיים
                עם שיתוף ידע וניסיון לטובת כלל הציבור
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#DC2626',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Users size={16} />
                50+ שדכנים מנוסים
              </div>
            </div>

            {/* Feature 6 */}
            <div style={cardStyle}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
              }}>
                <Award size={40} style={{ color: 'white' }} />
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                הוכח בשטח
              </h3>
              <p style={{
                color: '#6B7280',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                יותר מ-800 שידוכים מוצלחים בציבור החרדי עם שיעור הצלחה גבוה
                ומשוב חיובי מהשדכנים המובילים
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#059669',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <Award size={16} />
                800+ שידוכים בציבור החרדי
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #FEF7CD 0%, #FED7AA 100%)',
        padding: '100px 0',
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: '24px'
            }}>
              מוכן להצטרף לקהילת השדכנים?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6B7280',
              marginBottom: '40px'
            }}>
              הצטרף עכשיו לעשרות שדכנים חרדיים שכבר משתמשים בכלים המתקדמים שלנו
            </p>
            <a
              href="/users/register"
              style={{
                ...buttonStyle,
                fontSize: '20px',
                padding: '20px 40px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#B45309';
                e.target.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#D97706';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={24} />
              הצטרף לקהילת השדכנים
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1F2937',
        color: 'white',
        padding: '60px 0 40px',
        textAlign: 'center'
      }}>
        <div style={containerStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px'
          }}>
            <img
              src="/MatchShtark1.png"
              alt="Match Shtark Logo"
              style={{
                height: '60px',
                width: 'auto'
              }}
            />
          </div>
          <p style={{
            color: '#9CA3AF',
            fontSize: '18px',
            marginBottom: '32px'
          }}>
            המוח של הבינה, הלב של השידוך
          </p>
          <div style={{
            borderTop: '1px solid #374151',
            paddingTop: '32px',
            color: '#6B7280'
          }}>
            <p style={{ margin: 0 }}>
              © 2025 Match Shtark. כל הזכויות שמורות. | פלטפורמה לשדכנים חרדיים
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;