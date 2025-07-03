import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Settings,
  UserPlus,
  Search,
  History,
  Users,
  ChevronDown,
  Heart,
  Upload
} from "lucide-react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'linear-gradient(135deg, #FFFFFF 0%, #FEF7CD 50%, #FED7AA 100%)',
    borderBottom: '2px solid #F3E8FF',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'serif',
    letterSpacing: '1px'
  };

  const menuStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    position: 'relative'
  };

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: isSidebarOpen ? '0' : '-100%',
    width: '280px',
    height: '100vh',
    background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF7CD 100%)',
    borderLeft: '2px solid #F3E8FF',
    boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
    zIndex: 1002,
    transition: 'right 0.3s ease',
    overflowY: 'auto'
  };

  const sidebarHeaderStyle = {
    padding: '24px',
    borderBottom: '2px solid #F3E8FF',
    background: 'linear-gradient(135deg, #FEF7CD 0%, #FED7AA 100%)'
  };

  const sidebarMenuStyle = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const sidebarLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    border: '2px solid transparent'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    background: 'white',
    borderRadius: '12px',
    border: '2px solid #FEF3C7',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    padding: '8px',
    minWidth: '200px',
    zIndex: 1001
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001,
    opacity: isSidebarOpen ? 1 : 0,
    visibility: isSidebarOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease'
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDropdownOpen(false);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav style={navbarStyle} dir="rtl">
        <div style={containerStyle}>
          {/* Logo */}
          <Link to="/" style={logoStyle}>
            <span>MATCH SHTARK</span>
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <div>
              <ul style={menuStyle}>
                <li>
                  <Link
                    to="/admin"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#EFF6FF';
                      e.target.style.color = '#1D4ED8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                    }}
                  >
                    <Settings size={16} />
                    תפריט ניהול
                  </Link>
                </li>

                <li style={{ position: 'relative' }}>
                  <a
                    href="#"
                    style={linkStyle}
                    onClick={toggleDropdown}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#F0FDF4';
                      e.target.style.color = '#059669';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                    }}
                  >
                    <UserPlus size={16} />
                    הוספת מועמד
                    <ChevronDown size={14} style={{
                      transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} />
                  </a>

                  {isDropdownOpen && (
                    <div style={dropdownStyle}>
                      <Link
                        to="/add-person"
                        style={dropdownItemStyle}
                        onClick={() => setIsDropdownOpen(false)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#EFF6FF';
                          e.target.style.color = '#1D4ED8';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        <UserPlus size={14} />
                        הוספה ידנית
                      </Link>
                      <Link
                        to="/add-from-excel"
                        style={dropdownItemStyle}
                        onClick={() => setIsDropdownOpen(false)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#F0FDF4';
                          e.target.style.color = '#059669';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#374151';
                        }}
                      >
                        <Upload size={14} />
                        ייבוא מקובץ Excel
                      </Link>
                    </div>
                  )}
                </li>

                <li>
                  <Link
                    to="/users/match"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#FFFBEB';
                      e.target.style.color = '#D97706';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                    }}
                  >
                    <Search size={16} />
                    חיפוש התאמות
                  </Link>
                </li>

                <li>
                  <Link
                    to="/users/history"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#FEF2F2';
                      e.target.style.color = '#DC2626';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                    }}
                  >
                    <History size={16} />
                    היסטוריית שידוכים
                  </Link>
                </li>

                <li>
                  <Link
                    to="/boys"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#F3E8FF';
                      e.target.style.color = '#7C3AED';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#374151';
                    }}
                  >
                    <Users size={16} />
                    רשימת משודכים
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                background: 'transparent',
                border: '2px solid #D97706',
                borderRadius: '8px',
                color: '#D97706',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={toggleSidebar}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#D97706';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#D97706';
              }}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Desktop Dropdown Overlay */}
        {!isMobile && isDropdownOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </nav>

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          <div style={overlayStyle} onClick={closeSidebar} />

          {/* Sidebar */}
          <div style={sidebarStyle}>
            {/* Sidebar Header */}
            <div style={sidebarHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1F2937',
                    fontFamily: 'serif'
                  }}>
                    MATCH SHTARK
                  </div>
                </div>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6B7280',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                  onClick={closeSidebar}
                >
                  <X size={24} />
                </button>
              </div>
              <p style={{
                margin: '8px 0 0 0',
                color: '#6B7280',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                המוח של הבינה, הלב של השידוך
              </p>
            </div>

            {/* Sidebar Menu */}
            <div style={sidebarMenuStyle}>
              <Link
                to="/admin"
                style={sidebarLinkStyle}
                onClick={closeSidebar}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#EFF6FF';
                  e.target.style.borderColor = '#3B82F6';
                  e.target.style.color = '#1D4ED8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                <Settings size={20} />
                תפריט ניהול
              </Link>

              {/* Dropdown Section in Sidebar */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '2px solid #E2E8F0',
                padding: '16px',
                margin: '8px 0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  color: '#6B7280',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  <UserPlus size={18} />
                  הוספת מועמד
                </div>

                <Link
                  to="/add-person"
                  style={{
                    ...sidebarLinkStyle,
                    padding: '12px 16px',
                    fontSize: '15px',
                    marginRight: '8px'
                  }}
                  onClick={closeSidebar}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#EFF6FF';
                    e.target.style.borderColor = '#3B82F6';
                    e.target.style.color = '#1D4ED8';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.color = '#374151';
                  }}
                >
                  <UserPlus size={18} />
                  הוספה ידנית
                </Link>

                <Link
                  to="/add-from-excel"
                  style={{
                    ...sidebarLinkStyle,
                    padding: '12px 16px',
                    fontSize: '15px',
                    marginRight: '8px'
                  }}
                  onClick={closeSidebar}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F0FDF4';
                    e.target.style.borderColor = '#059669';
                    e.target.style.color = '#059669';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.color = '#374151';
                  }}
                >
                  <Upload size={18} />
                  ייבוא מקובץ Excel
                </Link>
              </div>

              <Link
                to="/users/match"
                style={sidebarLinkStyle}
                onClick={closeSidebar}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FFFBEB';
                  e.target.style.borderColor = '#D97706';
                  e.target.style.color = '#D97706';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                <Search size={20} />
                חיפוש התאמות
              </Link>

              <Link
                to="/users/history"
                style={sidebarLinkStyle}
                onClick={closeSidebar}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#FEF2F2';
                  e.target.style.borderColor = '#DC2626';
                  e.target.style.color = '#DC2626';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                <History size={20} />
                היסטוריית שידוכים
              </Link>

              <Link
                to="/boys"
                style={sidebarLinkStyle}
                onClick={closeSidebar}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F3E8FF';
                  e.target.style.borderColor = '#7C3AED';
                  e.target.style.color = '#7C3AED';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = 'transparent';
                  e.target.style.color = '#374151';
                }}
              >
                <Users size={20} />
                רשימת משודכים
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;