import React, { useEffect, useState } from "react";
import { Users, Mail, Phone, Key, Lock, Eye, EyeOff, CheckCircle, XCircle, Loader, UserCheck, AlertCircle, Shield } from 'lucide-react';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setError("שגיאה בטעינת המשתמשים");
        setLoading(false);
      })
      .catch(() => {
        setError("שגיאה בטעינה מהשרת");
        setLoading(false);
      });
  }, []);

  const openModal = (recordId) => {
    setSelectedUserId(recordId);
    setNewPassword("");
    setConfirmPassword("");
    setShowModal(true);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("יש למלא את שני השדות");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    setIsUpdating(true);

    try {
      const res = await fetch(`http://localhost:5000/api/users/set-password/${selectedUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        setShowModal(false);
      } else {
        alert("❌ שגיאה: " + (data.error || "לא ידועה"));
      }
    } catch (err) {
      alert("❌ שגיאה בשליחת הבקשה לשרת");
    } finally {
      setIsUpdating(false);
    }
  };

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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #E5E7EB',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: 'white',
    color: '#1F2937',
    transition: 'all 0.3s ease',
    textAlign: 'right',
    direction: 'rtl',
    marginBottom: '16px'
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#D97706',
    color: 'white',
    boxShadow: '0 4px 8px rgba(217, 119, 6, 0.3)'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6B7280',
    color: 'white'
  };

  const warningButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#F59E0B',
    color: 'white'
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        direction: 'rtl',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #D97706',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <h3 style={{ color: '#1F2937', marginBottom: '8px' }}>טוען נתונים...</h3>
          <p style={{ color: '#6B7280', margin: 0 }}>אנא המתן</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        direction: 'rtl',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: '2px solid #FEE2E2'
        }}>
          <XCircle size={60} style={{ color: '#DC2626', margin: '0 auto 20px' }} />
          <h3 style={{ color: '#DC2626', marginBottom: '8px' }}>שגיאה</h3>
          <p style={{ color: '#6B7280', margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '1200px',
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
            <Users size={32} style={{ color: '#D97706' }} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: 0
            }}>
              רשימת משתמשים
            </h1>
            <UserCheck size={32} style={{ color: '#D97706' }} />
          </div>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            margin: 0
          }}>
            ניהול משתמשים ואיפוס סיסמאות במערכת
          </p>
        </div>

        {/* Users Table Card */}
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

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #F3F4F6'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1F2937',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Shield size={24} style={{ color: '#3B82F6' }} />
                פרטי משתמשים ({users.length})
              </h3>
            </div>

            {/* Table */}
            <div style={{
              overflowX: 'auto',
              borderRadius: '12px',
              border: '1px solid #E5E7EB'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#F9FAFB',
                    borderBottom: '2px solid #E5E7EB'
                  }}>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      מספר מזהה
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      שם פרטי
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      שם משפחה
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      אימייל
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      טלפון
                    </th>
                    <th style={{
                      padding: '16px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '14px'
                    }}>
                      פעולות
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.recordId} style={{
                      borderBottom: '1px solid #E5E7EB',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.parentElement.style.backgroundColor = '#F9FAFB'}
                    onMouseLeave={(e) => e.target.parentElement.style.backgroundColor = 'white'}
                    >
                      <td style={{
                        padding: '16px',
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#D97706'
                      }}>
                        #{user.recordId}
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center',
                        color: '#1F2937'
                      }}>
                        {user.userInfo?.firstName || '-'}
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center',
                        color: '#1F2937'
                      }}>
                        {user.userInfo?.lastName || '-'}
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center',
                        color: '#1F2937',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}>
                        <Mail size={16} style={{ color: '#6B7280' }} />
                        {user.userInfo?.email || '-'}
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center',
                        color: '#1F2937'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}>
                          <Phone size={16} style={{ color: '#6B7280' }} />
                          {user.userInfo?.phone || '-'}
                        </div>
                      </td>
                      <td style={{
                        padding: '16px',
                        textAlign: 'center'
                      }}>
                        <button
                          style={warningButtonStyle}
                          onClick={() => openModal(user.recordId)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#D97706';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#F59E0B';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          <Key size={16} />
                          אפס סיסמה
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Password Modal */}
        {showModal && (
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
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}>
              {/* Modal Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #F3F4F6'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1F2937',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Lock size={24} style={{ color: '#D97706' }} />
                  הזנת סיסמה חדשה
                </h3>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#6B7280',
                    padding: '4px'
                  }}
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{
                  color: '#6B7280',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  הזן סיסמה חדשה עבור משתמש מספר: <strong>{selectedUserId}</strong>
                </p>

                {/* Password Input */}
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    style={inputStyle}
                    placeholder="הכנס סיסמה חדשה"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6B7280'
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm Password Input */}
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    style={inputStyle}
                    placeholder="אמת סיסמה חדשה"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6B7280'
                    }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {newPassword && confirmPassword && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '8px',
                    fontSize: '14px',
                    color: newPassword === confirmPassword ? '#059669' : '#DC2626'
                  }}>
                    {newPassword === confirmPassword ? (
                      <>
                        <CheckCircle size={16} />
                        הסיסמאות תואמות
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} />
                        הסיסמאות אינן תואמות
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}>
                <button
                  style={secondaryButtonStyle}
                  onClick={() => setShowModal(false)}
                  disabled={isUpdating}
                  onMouseEnter={(e) => {
                    if (!isUpdating) e.target.style.backgroundColor = '#4B5563';
                  }}
                  onMouseLeave={(e) => {
                    if (!isUpdating) e.target.style.backgroundColor = '#6B7280';
                  }}
                >
                  ביטול
                </button>
                <button
                  style={{
                    ...primaryButtonStyle,
                    opacity: isUpdating ? 0.7 : 1,
                    cursor: isUpdating ? 'not-allowed' : 'pointer'
                  }}
                  onClick={handleSetPassword}
                  disabled={isUpdating}
                  onMouseEnter={(e) => {
                    if (!isUpdating) {
                      e.target.style.backgroundColor = '#B45309';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUpdating) {
                      e.target.style.backgroundColor = '#D97706';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isUpdating ? (
                    <>
                      <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      מעדכן...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} />
                      עדכן סיסמה
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default UsersTable;