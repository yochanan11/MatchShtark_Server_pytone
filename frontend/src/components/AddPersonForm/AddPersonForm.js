import React, { useState, useEffect } from 'react';
import { User, Users, Heart, Plus, Minus, Save, UserPlus, Phone, MapPin, Building, Sparkles, Star } from 'lucide-react';
import StudentInfoFields from './StudentInfoFields';
import GenderSelect from './GenderSelect';

function AddPersonForm() {
  const [gender, setGender] = useState('male');
  const [formData, setFormData] = useState({
    recordId: Date.now(),
    gender: 'male',
    studentInfo: {
      firstName: '',
      lastName: '',
      age: '',
      birthDate: '',
      phone: '',
      choice: '',
      community: '',
      currentYeshiva: '',
      previousYeshiva: '',
      smallYeshiva: '',
      familyPosition: '',
      style: ''
    },
    fatherInfo: {
      fullName: '',
      phone: '',
      address: '',
      origin: '',
      community: '',
      style: '',
      dress: '',
      workplace: ''
    },
    motherInfo: {
      fullName: '',
      origin: '',
      community: '',
      style: '',
      choice: '',
      workplace: ''
    },
    contactPhones: {
      Friends: [{ name: '', phone: '' }],
      Neighbors: [{ name: '', phone: '' }]
    },
    inLaws: [{ name: '', city: '', Community: '', Address: '' }],
    status: 'פנוי',
    proposals: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    const updatedData = { ...formData };
    if (keys.length === 2) {
      updatedData[keys[0]][keys[1]] = value;
    } else {
      updatedData[name] = value;
    }
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/${gender === 'male' ? 'boy' : 'girl'}`;
    try {
      // Simulate API call
      console.log('Form Data:', formData);
      alert('הפרופיל נוסף בהצלחה!');
    } catch (error) {
      console.error(error);
      alert('שגיאה בהוספה');
    }
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
        maxWidth: '1000px',
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
            <UserPlus size={32} style={{ color: '#D97706' }} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: 0
            }}>
              טופס הוספת מועמד חדש
            </h1>
            <Sparkles size={32} style={{ color: '#D97706' }} />
          </div>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            margin: 0
          }}>
            הוסף פרופיל חדש למערכת השידוכים
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <GenderSelect 
            gender={gender} 
            setGender={setGender} 
            setFormData={setFormData} 
          />
          
          <StudentInfoFields handleChange={handleChange} />
          
          {/* Submit Button */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '2px solid #FEF3C7',
            padding: '24px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '16px 32px',
                backgroundColor: '#D97706',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#B45309';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(217, 119, 6, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#D97706';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(217, 119, 6, 0.3)';
              }}
            >
              <Save size={24} />
              שמור פרופיל
              <Star size={24} fill="currentColor" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPersonForm;