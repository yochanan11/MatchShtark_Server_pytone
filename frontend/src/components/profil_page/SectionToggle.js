import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

function SectionToggle({ label, children }) {
  const [show, setShow] = useState(false);

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    border: '2px solid #FEF3C7',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonStyle = {
    width: '100%',
    padding: '20px 32px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#1F2937',
    textAlign: 'right',
    direction: 'rtl'
  };

  const contentStyle = {
    padding: '0 32px 32px 32px',
    borderTop: '1px solid #F3F4F6',
    backgroundColor: '#FAFAFA'
  };

  const iconStyle = {
    color: '#D97706',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={cardStyle}>
      {/* Decorative background element */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        left: '-20px',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        opacity: show ? 1 : 0.5,
        transition: 'opacity 0.3s ease'
      }}></div>

      <button
        style={buttonStyle}
        onClick={() => setShow(!show)}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#F9FAFB';
          const icon = e.target.querySelector('svg');
          if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.color = '#B45309';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          const icon = e.target.querySelector('svg');
          if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.color = '#D97706';
          }
        }}
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {show ? `הסתר ${label}` : `הצג ${label}`}
        </span>

        <div style={{
          ...iconStyle,
          transform: show ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          <ChevronDown size={24} />
        </div>
      </button>

      {show && (
        <div style={contentStyle}>
          <div style={{
            animation: 'fadeIn 0.3s ease-in-out',
            paddingTop: '20px'
          }}>
            {children}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default SectionToggle;