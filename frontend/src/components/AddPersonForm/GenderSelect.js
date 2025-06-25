// components/AddPersonForm/GenderSelect.js
import React from 'react';

function GenderSelect({ gender, setGender, setFormData }) {
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setFormData(prev => ({ ...prev, gender: e.target.value }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">מין:</label>
      <select className="form-select" value={gender} onChange={handleGenderChange}>
        <option value="male">בחור</option>
        <option value="female">בחורה</option>
      </select>
    </div>
  );
}

export default GenderSelect;
