import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Users,
  TrendingUp,
  Search,
  History,
  UserPlus,
  LogOut,
  Award,
  Sparkles,
  Calendar,
  Target,
  Crown,
  Activity
} from "lucide-react";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
  return null;
}

function DashboardPage({ setUser }) {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #FEF7CD 0%, #FED7AA 100%)',
    borderBottom: '2px solid #F3E8FF',
    padding: '32px 0',
    marginBottom: '32px',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '2px solid #FEF3C7',
    padding: '24px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '16px 24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '2px solid',
    width: '100%',
    cursor: 'pointer'
  };

  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      try {
        const parsed = JSON.parse(userCookie);
        setLocalUser(parsed);
        setUser(parsed);
      } catch {
        setLocalUser(null);
        navigate("/users/login");
      }
    } else {
      navigate("/users/login");
    }
  }, [navigate, setUser]);

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setUser(null);
    navigate("/users/login");
  };

  if (!user) return null;

  return (
    <div style={containerStyle} dir="rtl">
      {/* Header */}
      <div style={headerStyle}>
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <Heart style={{ color: '#D97706' }} size={32} />
            שלום {user.firstName || "משתמש"}!
          </h1>
          <p style={{ color: '#6B7280', fontSize: '18px', margin: 0 }}>
            המוח של הבינה, הלב של השידוך
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 32px' }}>
        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <a
            href="/add-person"
            style={{
              ...buttonStyle,
              backgroundColor: '#3B82F6',
              borderColor: '#3B82F6',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 12px 25px rgba(59, 130, 246, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <UserPlus size={20} />
            הוספת מועמד
          </a>

          <a
            href="/users/match"
            style={{
              ...buttonStyle,
              backgroundColor: '#059669',
              borderColor: '#059669',
              color: 'white'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 12px 25px rgba(5, 150, 105, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <Search size={20} />
            חיפוש התאמות
          </a>

          <a
            href="/users/history"
            style={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              borderColor: '#D97706',
              color: '#D97706'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#D97706';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#D97706';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <History size={20} />
            היסטוריית שידוכים
          </a>

          <button
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              borderColor: '#EF4444',
              color: '#EF4444'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#EF4444';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#EF4444';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <LogOut size={20} />
            התנתק
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Activity Summary */}
          <div style={cardStyle}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #3B82F620, transparent)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <Activity style={{ color: '#3B82F6', width: '24px', height: '24px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                  סיכום פעילות
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  border: '1px solid #DBEAFE'
                }}>
                  <span style={{ color: '#374151', fontSize: '14px' }}>התאמות חדשות השבוע</span>
                  <span style={{
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>5</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#F0FDF4',
                  borderRadius: '10px',
                  border: '1px solid #DCFCE7'
                }}>
                  <span style={{ color: '#374151', fontSize: '14px' }}>שידוכים מוצלחים</span>
                  <span style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>12</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#FFFBEB',
                  borderRadius: '10px',
                  border: '1px solid #FEF3C7'
                }}>
                  <span style={{ color: '#374151', fontSize: '14px' }}>מועמדים ממתינים</span>
                  <span style={{
                    backgroundColor: '#D97706',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Matches */}
          <div style={cardStyle}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #D9770620, transparent)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <Sparkles style={{ color: '#D97706', width: '24px', height: '24px' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                  התאמות חכמות
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#FFFBEB',
                  borderRadius: '12px',
                  border: '2px solid #FEF3C7',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '16px',
                    backgroundColor: '#D97706',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Crown size={12} />
                    94%
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontWeight: '600', color: '#1F2937' }}>יעקב כהן</span>
                    <Heart style={{ color: '#D97706', width: '16px', height: '16px' }} />
                    <span style={{ fontWeight: '600', color: '#1F2937' }}>חיה לוי</span>
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '16px',
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    91%
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontWeight: '600', color: '#1F2937' }}>ברוך פישר</span>
                    <Heart style={{ color: '#059669', width: '16px', height: '16px' }} />
                    <span style={{ fontWeight: '600', color: '#1F2937' }}>רבקה לנדאו</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            ...cardStyle,
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
          }}>
            <TrendingUp style={{ color: '#3B82F6', width: '32px', height: '32px', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>
              87%
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>שיעור הצלחה</div>
          </div>

          <div style={{
            ...cardStyle,
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)'
          }}>
            <Users style={{ color: '#059669', width: '32px', height: '32px', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>
              156
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>מועמדים פעילים</div>
          </div>

          <div style={{
            ...cardStyle,
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
          }}>
            <Award style={{ color: '#D97706', width: '32px', height: '32px', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>
              23
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>התאמות השבוע</div>
          </div>

          <div style={{
            ...cardStyle,
            padding: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)'
          }}>
            <Target style={{ color: '#EF4444', width: '32px', height: '32px', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '4px' }}>
              94%
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>דיוק המודל</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '32px',
          background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
          borderRadius: '16px',
          border: '2px solid #F3E8FF'
        }}>
          <Heart style={{ width: '32px', height: '32px', color: '#D97706', margin: '0 auto 16px' }} />
          <p style={{
            color: '#374151',
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 8px 0'
          }}>
            "כל יום חדש הוא הזדמנות לשידוך חדש"
          </p>
          <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>
            Match Shtark - בינה מלאכותית עם נשמה יהודית
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;