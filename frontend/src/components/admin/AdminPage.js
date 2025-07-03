import React, { useState, useEffect } from 'react';
import { User, Users, Brain, BarChart3, Shield, Loader, CheckCircle, AlertCircle, Sparkles, Crown } from 'lucide-react';

function AdminPage() {
  const [code, setCode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMessage, setTrainingMessage] = useState("");
  const [trainingComplete, setTrainingComplete] = useState(false);
  const secretCode = "456789";

  // בדיקה אם המשתמש כבר מורשה (זכירה ב-sessionStorage)
  useEffect(() => {
    const authorized = sessionStorage.getItem('adminAuthorized');
    if (authorized === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === secretCode) {
      setIsAuthorized(true);
      sessionStorage.setItem('adminAuthorized', 'true'); // שמירה בזיכרון הסשן
    } else {
      alert("❌ קוד שגוי");
    }
  };

  const handleModelTraining = async () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setTrainingMessage("המודל מתחיל להתאמן...");

    try {
      const res = await fetch("http://localhost:5000/api/retrain-model", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        setTrainingMessage("✅ המודל אומן בהצלחה!");
        setTrainingComplete(true);
      } else {
        setTrainingMessage("❌ שגיאה: " + (data.error || "לא ידועה"));
        setTimeout(() => {
          setIsTraining(false);
          setTrainingMessage("");
        }, 3000);
      }
    } catch (err) {
      console.error("שגיאה בשליחת הבקשה:", err);
      setTrainingMessage("❌ שגיאה בחיבור לשרת");
      setTimeout(() => {
        setIsTraining(false);
        setTrainingMessage("");
      }, 3000);
    }
  };

  const goToUsersPage = () => {
    window.location.href = "/admin/users";
  };

  const goToModelGraph = () => {
    window.location.href = "/model/importance";
  };

  const closeTrainingModal = () => {
    setIsTraining(false);
    setTrainingComplete(false);
    setTrainingMessage("");
  };

  const goToGraphFromModal = () => {
    closeTrainingModal();
    goToModelGraph();
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuthorized');
    setIsAuthorized(false);
    setCode("");
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '2px solid #FEF3C7',
    padding: '40px',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '18px',
    backgroundColor: 'white',
    color: '#1F2937',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    marginBottom: '24px'
  };

  const buttonStyle = {
    padding: '16px 32px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textDecoration: 'none',
    width: '100%',
    marginBottom: '16px'
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

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#DC2626',
    color: 'white',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
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
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <Shield size={32} style={{ color: '#D97706' }} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: 0
            }}>
              {!isAuthorized ? 'כניסה לתפריט ניהול' : 'תפריט ניהול מתקדם'}
            </h1>
            <Crown size={32} style={{ color: '#D97706' }} />
          </div>
          {!isAuthorized && (
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              margin: 0
            }}>
              הזן קוד סודי לגישה למערכת הניהול
            </p>
          )}
        </div>

        {/* Main Card */}
        <div style={cardStyle}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>

          {!isAuthorized ? (
            /* Login Form */
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#D97706',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.3)'
              }}>
                <Shield size={50} style={{ color: 'white' }} />
              </div>

              <div onSubmit={handleSubmit}>
                <input
                  type="password"
                  style={inputStyle}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="הכנס קוד סודי"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D97706';
                    e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  style={primaryButtonStyle}
                  onClick={handleSubmit}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#B45309';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#D97706';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <User size={20} />
                  כניסה למערכת
                </button>
              </div>
            </div>
          ) : (
            /* Admin Dashboard */
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  marginLeft: '16px',
                  boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
                }}>
                  <CheckCircle size={40} style={{ color: 'white' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#059669',
                    margin: 0,
                    marginBottom: '8px'
                  }}>
                    ברוך הבא לתפריט הניהול
                  </h3>
                  <p style={{
                    color: '#6B7280',
                    margin: 0,
                    fontSize: '16px'
                  }}>
                    ניהול מתקדם של מערכת השידוכים
                  </p>
                </div>
              </div>

              {/* Loading Overlay */}
              {isTraining && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  backdropFilter: 'blur(5px)'
                }}>
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)',
                    maxWidth: '400px',
                    margin: '20px'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#D97706',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      animation: 'spin 2s linear infinite'
                    }}>
                      <Brain size={40} style={{ color: 'white' }} />
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#1F2937',
                      marginBottom: '16px'
                    }}>
                      אימון המודל בתהליך
                    </h3>
                    <p style={{
                      color: '#6B7280',
                      marginBottom: '24px',
                      lineHeight: 1.5
                    }}>
                      {trainingMessage}
                    </p>

                    {!trainingComplete ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: '#D97706'
                      }}>
                        <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        <span>אנא המתן...</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <button
                          style={{
                            ...primaryButtonStyle,
                            width: 'auto',
                            marginBottom: 0,
                            padding: '12px 24px',
                            fontSize: '16px'
                          }}
                          onClick={goToGraphFromModal}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#B45309';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#D97706';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <BarChart3 size={18} />
                          לגרף השפעות
                        </button>
                        <button
                          style={{
                            ...secondaryButtonStyle,
                            width: 'auto',
                            marginBottom: 0,
                            padding: '12px 24px',
                            fontSize: '16px',
                            color: '#6B7280',
                            borderColor: '#E5E7EB'
                          }}
                          onClick={closeTrainingModal}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#F3F4F6';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        >
                          סגור
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Actions */}
              <div style={{ marginBottom: '32px' }}>
                <button
                  style={{
                    ...secondaryButtonStyle,
                    color: '#3B82F6',
                    borderColor: '#3B82F6'
                  }}
                  onClick={goToUsersPage}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#3B82F6';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#3B82F6';
                  }}
                >
                  <Users size={20} />
                  הצג רשימת משתמשים
                </button>

                <button
                  style={{
                    ...secondaryButtonStyle,
                    color: '#7C3AED',
                    borderColor: '#7C3AED'
                  }}
                  onClick={handleModelTraining}
                  disabled={isTraining}
                  onMouseEnter={(e) => {
                    if (!isTraining) {
                      e.target.style.backgroundColor = '#7C3AED';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isTraining) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#7C3AED';
                    }
                  }}
                >
                  <Brain size={20} />
                  {isTraining ? 'המודל מתאמן...' : 'אימון מודל מחדש'}
                </button>

                <button
                  style={{
                    ...secondaryButtonStyle,
                    color: '#059669',
                    borderColor: '#059669'
                  }}
                  onClick={goToModelGraph}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#059669';
                  }}
                >
                  <BarChart3 size={20} />
                  גרף השפעות המודל
                </button>
              </div>

              {/* Logout Button */}
              <div style={{
                borderTop: '1px solid #E5E7EB',
                paddingTop: '24px'
              }}>
                <button
                  style={dangerButtonStyle}
                  onClick={logout}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#B91C1C';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#DC2626';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <AlertCircle size={20} />
                  יציאה מהמערכת
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AdminPage;