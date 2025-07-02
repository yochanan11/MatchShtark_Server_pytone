import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Heart, Users, UserCheck, AlertCircle, Sparkles, ChevronDown } from "lucide-react";

function MatchSearchForm() {
  const [boys, setBoys] = useState([]);
  const [selectedBoyId, setSelectedBoyId] = useState("");
  const [girls, setGirls] = useState([]);
  const [selectedGirlId, setSelectedGirlId] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #FFFBEB, #FFFFFF, #FFF7ED)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
    borderBottom: '1px solid #F3E8FF',
    padding: '32px 0',
    marginBottom: '32px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #FEF3C7',
    padding: '32px',
    marginBottom: '32px',
    position: 'relative',
    overflow: 'hidden'
  };

  const selectStyle = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #FEF3C7',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: 'white',
    color: '#374151',
    outline: 'none',
    transition: 'all 0.3s ease',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'left 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingLeft: '40px'
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
    gap: '12px',
    marginTop: '24px',
    position: 'relative',
    overflow: 'hidden'
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#059669'
  };

  // שליפת בנים פנויים
  useEffect(() => {
    fetch("http://localhost:5000/api/boys")
      .then(res => res.json())
      .then(data => {
        const freeBoys = data
          .map((boy, i) => {
            const isMatched = boy.proposals?.some(p => p.status === "success");
            return {
              ...boy,
              name: `${boy.studentInfo?.firstName || ""} ${boy.studentInfo?.lastName || ""}`,
              status: isMatched ? "שודך" : "פנוי"
            };
          })
          .filter(boy => boy.status === "פנוי");

        setBoys(freeBoys);
      })
      .catch(() => setMessage("שגיאה בשליפת הבחורים"));
  }, []);

  // שליפת בנות פנויות
  useEffect(() => {
    fetch("http://localhost:5000/api/girls")
      .then(res => res.json())
      .then(data => {
        const freeGirls = data.filter(g => g.status !== "engaged").map(girl => ({
          ...girl,
          name: `${girl.studentInfo?.firstName || ""} ${girl.studentInfo?.lastName || ""}`
        }));
        setGirls(freeGirls);
      })
      .catch(() => setMessage("שגיאה בשליפת הבנות"));
  }, []);

  const handleBoySubmit = async (e) => {
    e.preventDefault();
    if (!selectedBoyId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/matches/boy/${selectedBoyId}`);
      const data = await res.json();
      if (data.error) {
        setMessage("שגיאה בשרת: " + data.error);
      } else {
        navigate("/matches", {
          state: {
            firstName: data.boy.firstName,
            lastName: data.boy.lastName,
            matches: data.matches,
            isBoy: true
          }
        });
      }
    } catch (err) {
      setMessage("שגיאה בעת שליחת הבקשה");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGirlSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGirlId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/matches/girl/${selectedGirlId}`);
      const data = await res.json();
      if (data.error) {
        setMessage("שגיאה בשרת: " + data.error);
      } else {
        navigate("/matches", {
          state: {
            firstName: data.girl.firstName,
            lastName: data.girl.lastName,
            matches: data.matches,
            isBoy: false
          }
        });
      }
    } catch (err) {
      setMessage("שגיאה בעת שליחת הבקשה");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle} dir="rtl">
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          {/* Logo Section */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{
              color: '#374151',
              fontSize: '32px',
              fontFamily: 'serif',
              letterSpacing: '2px',
              marginRight: '16px'
            }}>
            </div>

          </div>

          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1F2937',
            margin: '0 0 16px 0'
          }}>
            🔍 חיפוש התאמות
          </h1>
          <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
            מצא את ההתאמה המושלמת עם הבינה המלאכותית המתקדמת שלנו
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px 32px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            border: '1px solid #FEF3C7',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Users style={{ width: '24px', height: '24px', color: '#3B82F6', marginLeft: '12px' }} />
            <div>
              <h3 style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>בחורים פנויים</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: '4px 0 0 0' }}>
                {boys.length}
              </p>
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            border: '1px solid #FEF3C7',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Heart style={{ width: '24px', height: '24px', color: '#EC4899', marginLeft: '12px' }} />
            <div>
              <h3 style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>בחורות פנויות</h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937', margin: '4px 0 0 0' }}>
                {girls.length}
              </p>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div style={{
            backgroundColor: message.includes('שגיאה') ? '#FEE2E2' : '#DBEAFE',
            border: `1px solid ${message.includes('שגיאה') ? '#FECACA' : '#BFDBFE'}`,
            color: message.includes('שגיאה') ? '#DC2626' : '#1D4ED8',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertCircle size={20} />
            {message}
          </div>
        )}

        {/* Boys Form */}
        <div style={cardStyle}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
            borderRadius: '50%',
            opacity: '0.1'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '-20px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #8B5CF6, #A78BFA)',
            borderRadius: '50%',
            opacity: '0.1'
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <UserCheck style={{ width: '28px', height: '28px', color: '#3B82F6', marginLeft: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                חיפוש התאמות לבחור
              </h2>
            </div>

            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '16px' }}>
              בחר בחור מהרשימה ומצא לו את ההתאמות הכי טובות
            </p>

            <form onSubmit={handleBoySubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  בחר בחור פנוי:
                </label>
                <select
                  style={selectStyle}
                  value={selectedBoyId}
                  onChange={(e) => setSelectedBoyId(e.target.value)}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                >
                  <option value="">בחר מועמד...</option>
                  {boys.map(boy => (
                    <option key={boy.index} value={boy.index}>
                      #{boy.index} - {boy.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={buttonStyle}
                disabled={isLoading || !selectedBoyId}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#1D4ED8';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
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
                    מחפש...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    חפש התאמות לבחור
                    <Sparkles size={16} style={{ opacity: 0.8 }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '40px 0',
          textAlign: 'center'
        }}>
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, transparent, #D97706, transparent)' }}></div>
          <div style={{
            margin: '0 20px',
            padding: '12px 20px',
            backgroundColor: 'white',
            borderRadius: '25px',
            border: '2px solid #FEF3C7',
            fontSize: '18px'
          }}>
            💕 או 💕
          </div>
          <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, transparent, #D97706, transparent)' }}></div>
        </div>

        {/* Girls Form */}
        <div style={cardStyle}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-15px',
            left: '-15px',
            width: '120px',
            height: '120px',
            background: 'linear-gradient(45deg, #EC4899, #F472B6)',
            borderRadius: '50%',
            opacity: '0.1'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            right: '-25px',
            width: '90px',
            height: '90px',
            background: 'linear-gradient(45deg, #10B981, #34D399)',
            borderRadius: '50%',
            opacity: '0.1'
          }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Heart style={{ width: '28px', height: '28px', color: '#EC4899', marginLeft: '12px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', margin: 0 }}>
                חיפוש התאמות לבחורה
              </h2>
            </div>

            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '16px' }}>
              בחרי בחורה מהרשימה ומצאי לה את ההתאמות הכי מושלמות
            </p>

            <form onSubmit={handleGirlSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  בחרי בחורה פנויה:
                </label>
                <select
                  style={selectStyle}
                  value={selectedGirlId}
                  onChange={(e) => setSelectedGirlId(e.target.value)}
                  required
                  onFocus={(e) => e.target.style.borderColor = '#EC4899'}
                  onBlur={(e) => e.target.style.borderColor = '#FEF3C7'}
                >
                  <option value="">בחרי מועמדת...</option>
                  {girls.map(girl => (
                    <option key={girl.recordId} value={girl.recordId}>
                      #{girl.recordId} - {girl.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                style={successButtonStyle}
                disabled={isLoading || !selectedGirlId}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#047857';
                    e.target.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
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
                    מחפשת...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    חפשי התאמות לבחורה
                    <Sparkles size={16} style={{ opacity: 0.8 }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(to right, #FEF7CD, #FED7AA)',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #F3E8FF'
          }}>
            <Sparkles style={{ width: '32px', height: '32px', color: '#D97706', margin: '0 auto 16px' }} />
            <p style={{ color: '#374151', fontSize: '20px', fontWeight: '600', margin: '0 0 8px 0' }}>
              "בשעה טובה ומוצלחת!"
            </p>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '16px' }}>
              Match Shtark - שם הטכנולוגיה פוגשת את הלב היהודי
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}

export default MatchSearchForm;