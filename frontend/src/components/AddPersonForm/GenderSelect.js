// components/AddPersonForm/GenderSelect.js
import React, { useState } from 'react';
import { User, Users, Heart, Plus, Minus, Save, UserPlus, Phone, MapPin, Building, Sparkles, Star } from 'lucide-react';

// GenderSelect Component
function GenderSelect({ gender, setGender, setFormData }) {
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setFormData(prev => ({ ...prev, gender: e.target.value }));
  };

  return (
    <div style={{
      marginBottom: '32px',
      padding: '24px',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '2px solid #FEF3C7',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
    }}>
      <label style={{
        display: 'block',
        fontSize: '18px',
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: '12px',
        textAlign: 'right'
      }}>
        <User size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
        מין:
      </label>
      <select
        value={gender}
        onChange={handleGenderChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px solid #E5E7EB',
          borderRadius: '12px',
          fontSize: '16px',
          backgroundColor: 'white',
          color: '#1F2937',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textAlign: 'right',
          direction: 'rtl'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#D97706';
          e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#E5E7EB';
          e.target.style.boxShadow = 'none';
        }}
      >
        <option value="male">בחור</option>
        <option value="female">בחורה</option>
      </select>
    </div>
  );
}

export default GenderSelect;
