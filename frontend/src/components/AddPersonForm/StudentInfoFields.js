// components/AddPersonForm/StudentInfoFields.js
import React, { useState, useEffect } from 'react';
import { User, Users, Heart, Plus, Minus, Phone, MapPin, Building } from 'lucide-react';

function StudentInfoFields({ handleChange }) {
 const [neighbors, setNeighbors] = useState([{ name: '', phone: '' }]);
 const [friends, setFriends] = useState([{ name: '', phone: '' }]);
 const [inLaws, setInLaws] = useState([{ name: '', city: '', Community: '', Address: '' }]);
 const [birthDate, setBirthDate] = useState('');
 const [calculatedAge, setCalculatedAge] = useState('');

 useEffect(() => {
   if (birthDate) {
     const birth = new Date(birthDate.split('/').reverse().join('-'));
     const today = new Date();
     let age = today.getFullYear() - birth.getFullYear();
     const m = today.getMonth() - birth.getMonth();
     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
       age--;
     }
     setCalculatedAge(age);
     handleChange({ target: { name: 'studentInfo.age', value: age } });
   }
 }, [birthDate, handleChange]);

 const addNeighbor = () => setNeighbors([...neighbors, { name: '', phone: '' }]);
 const removeNeighbor = (index) => setNeighbors(neighbors.filter((_, i) => i !== index));
 const addFriend = () => setFriends([...friends, { name: '', phone: '' }]);
 const removeFriend = (index) => setFriends(friends.filter((_, i) => i !== index));
 const addInLaw = () => setInLaws([...inLaws, { name: '', city: '', Community: '', Address: '' }]);
 const removeInLaw = (index) => setInLaws(inLaws.filter((_, i) => i !== index));

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

 const sectionStyle = {
   backgroundColor: 'white',
   borderRadius: '16px',
   border: '2px solid #FEF3C7',
   padding: '24px',
   marginBottom: '24px',
   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
 };

 const headerStyle = {
   fontSize: '20px',
   fontWeight: 'bold',
   color: '#1F2937',
   marginBottom: '20px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   gap: '8px'
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
   gap: '6px',
   textDecoration: 'none'
 };

 const addButtonStyle = {
   ...buttonStyle,
   backgroundColor: '#D97706',
   color: 'white',
   marginBottom: '16px'
 };

 const removeButtonStyle = {
   ...buttonStyle,
   backgroundColor: '#DC2626',
   color: 'white',
   padding: '6px 12px',
   fontSize: '12px'
 };

 return (
   <div style={{ direction: 'rtl' }}>
     {/* פרטים אישיים */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <User size={24} style={{ color: '#D97706' }} />
         פרטים אישיים
       </h4>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
         <input
           type="text"
           name="studentInfo.firstName"
           style={inputStyle}
           placeholder="שם פרטי"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="studentInfo.lastName"
           style={inputStyle}
           placeholder="שם משפחה"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
         <input
           type="number"
           value={calculatedAge}
           readOnly
           style={{...inputStyle, backgroundColor: '#F9FAFB'}}
           placeholder="גיל"
         />
         <input
           type="text"
           name="studentInfo.birthDate"
           style={inputStyle}
           placeholder="תאריך לידה (dd/mm/yyyy)"
           onChange={(e) => setBirthDate(e.target.value)}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="studentInfo.phone"
           style={inputStyle}
           placeholder="טלפון"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="studentInfo.community"
           style={inputStyle}
           placeholder="קהילה"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="studentInfo.style"
           style={inputStyle}
           placeholder="סגנון"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#D97706';
             e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <select
         name="studentInfo.choice"
         style={inputStyle}
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#D97706';
           e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       >
         <option value="">בחר כיסוי ראש</option>
         <option value="כובע">כובע</option>
         <option value="פאה">פאה</option>
         <option value="מטפחת">מטפחת</option>
       </select>

       <input
         type="text"
         name="studentInfo.familyPosition"
         style={inputStyle}
         placeholder="מיקום במשפחה (למשל: 2 מתוך 8)"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#D97706';
           e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />
       <input
         type="text"
         name="studentInfo.currentYeshiva"
         style={inputStyle}
         placeholder="ישיבה/סמינר נוכחית"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#D97706';
           e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />
       <input
         type="text"
         name="studentInfo.previousYeshiva"
         style={inputStyle}
         placeholder="ישיבה/סמינר קודמת"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#D97706';
           e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />
       <input
         type="text"
         name="studentInfo.smallYeshiva"
         style={inputStyle}
         placeholder="ת״ת/חיידר/בי״ס יסודי"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#D97706';
           e.target.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />
     </div>

     {/* פרטי אב */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <User size={24} style={{ color: '#3B82F6' }} />
         פרטי אב
       </h4>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="fatherInfo.fullName"
           style={inputStyle}
           placeholder="שם האב"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="fatherInfo.phone"
           style={inputStyle}
           placeholder="טלפון אב"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <input
         type="text"
         name="fatherInfo.address"
         style={inputStyle}
         placeholder="כתובת"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#3B82F6';
           e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="fatherInfo.origin"
           style={inputStyle}
           placeholder="מוצא"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="fatherInfo.community"
           style={inputStyle}
           placeholder="קהילה"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="fatherInfo.style"
           style={inputStyle}
           placeholder="סגנון"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="fatherInfo.dress"
           style={inputStyle}
           placeholder="לבוש בשבת"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="fatherInfo.workplace"
           style={inputStyle}
           placeholder="מקום עבודה"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#3B82F6';
             e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>
     </div>

     {/* פרטי אם */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <Heart size={24} style={{ color: '#7C3AED' }} />
         פרטי אם
       </h4>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="motherInfo.fullName"
           style={inputStyle}
           placeholder="שם האם"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#7C3AED';
             e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="motherInfo.origin"
           style={inputStyle}
           placeholder="מוצא"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#7C3AED';
             e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
       </div>

       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
         <input
           type="text"
           name="motherInfo.community"
           style={inputStyle}
           placeholder="קהילה"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#7C3AED';
             e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <input
           type="text"
           name="motherInfo.style"
           style={inputStyle}
           placeholder="סגנון"
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#7C3AED';
             e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         />
         <select
           name="motherInfo.choice"
           style={inputStyle}
           onChange={handleChange}
           onFocus={(e) => {
             e.target.style.borderColor = '#7C3AED';
             e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
           }}
           onBlur={(e) => {
             e.target.style.borderColor = '#E5E7EB';
             e.target.style.boxShadow = 'none';
           }}
         >
           <option value="">בחר כיסוי ראש</option>
           <option value="כובע">כובע</option>
           <option value="פאה">פאה</option>
           <option value="מטפחת">מטפחת</option>
         </select>
       </div>

       <input
         type="text"
         name="motherInfo.workplace"
         style={inputStyle}
         placeholder="מקום עבודה"
         onChange={handleChange}
         onFocus={(e) => {
           e.target.style.borderColor = '#7C3AED';
           e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
         }}
         onBlur={(e) => {
           e.target.style.borderColor = '#E5E7EB';
           e.target.style.boxShadow = 'none';
         }}
       />
     </div>

     {/* שכנים */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <MapPin size={24} style={{ color: '#059669' }} />
         שכנים
       </h4>

       {neighbors.map((n, i) => (
         <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '12px', alignItems: 'start' }}>
           <input
             type="text"
             name={`contactPhones.Neighbors[${i}].name`}
             style={inputStyle}
             placeholder="שם שכן"
             onChange={handleChange}
             onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)'; }}
             onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
           />
           <input
             type="text"
             name={`contactPhones.Neighbors[${i}].phone`}
             style={inputStyle}
             placeholder="טלפון שכן"
             onChange={handleChange}
             onFocus={(e) => { e.target.style.borderColor = '#059669'; e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)'; }}
             onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
           />
           {i > 0 && (
             <button
               type="button"
               style={removeButtonStyle}
               onClick={() => removeNeighbor(i)}
               onMouseEnter={(e) => { e.target.style.backgroundColor = '#B91C1C'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = '#DC2626'; }}
             >
               <Minus size={16} />
               הסר
             </button>
           )}
         </div>
       ))}

       <button
         type="button"
         style={addButtonStyle}
         onClick={addNeighbor}
         onMouseEnter={(e) => { e.target.style.backgroundColor = '#B45309'; }}
         onMouseLeave={(e) => { e.target.style.backgroundColor = '#D97706'; }}
       >
         <Plus size={16} />
         הוסף שכן
       </button>
     </div>

     {/* חברים */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <Users size={24} style={{ color: '#DC2626' }} />
         חברים
       </h4>

       {friends.map((f, i) => (
         <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', marginBottom: '12px', alignItems: 'start' }}>
           <input
             type="text"
             name={`contactPhones.Friends[${i}].name`}
             style={inputStyle}
             placeholder="שם חבר"
             onChange={handleChange}
             onFocus={(e) => { e.target.style.borderColor = '#DC2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)'; }}
             onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
           />
           <input
             type="text"
             name={`contactPhones.Friends[${i}].phone`}
             style={inputStyle}
             placeholder="טלפון חבר"
             onChange={handleChange}
             onFocus={(e) => { e.target.style.borderColor = '#DC2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)'; }}
             onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
           />
           {i > 0 && (
             <button
               type="button"
               style={removeButtonStyle}
               onClick={() => removeFriend(i)}
               onMouseEnter={(e) => { e.target.style.backgroundColor = '#B91C1C'; }}
               onMouseLeave={(e) => { e.target.style.backgroundColor = '#DC2626'; }}
             >
               <Minus size={16} />
               הסר
             </button>
           )}
         </div>
       ))}

       <button
         type="button"
         style={addButtonStyle}
         onClick={addFriend}
         onMouseEnter={(e) => { e.target.style.backgroundColor = '#B45309'; }}
         onMouseLeave={(e) => { e.target.style.backgroundColor = '#D97706'; }}
       >
         <Plus size={16} />
         הוסף חבר
       </button>
     </div>

     {/* מחותנים */}
     <div style={sectionStyle}>
       <h4 style={headerStyle}>
         <Building size={24} style={{ color: '#7C3AED' }} />
         מחותנים
       </h4>

       {inLaws.map((inLaw, i) => (
         <div key={i} style={{ marginBottom: '20px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
             <input
               type="text"
               name={`inLaws[${i}].name`}
               style={inputStyle}
               placeholder="שם משפחת מחותנים"
               onChange={handleChange}
               onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'; }}
               onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
             />
             <input
               type="text"
               name={`inLaws[${i}].city`}
               style={inputStyle}
               placeholder="עיר"
               onChange={handleChange}
               onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'; }}
               onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
             />
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
             <input
               type="text"
               name={`inLaws[${i}].Community`}
               style={inputStyle}
               placeholder="קהילה"
               onChange={handleChange}
               onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'; }}
               onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
             />
             <input
               type="text"
               name={`inLaws[${i}].Address`}
               style={inputStyle}
               placeholder="כתובת"
               onChange={handleChange}
               onFocus={(e) => { e.target.style.borderColor = '#7C3AED'; e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'; }}
               onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none'; }}
             />
           </div>
           {i > 0 && (
             <div style={{ textAlign: 'left', marginBottom: '16px' }}>
               <button
                 type="button"
                 style={removeButtonStyle}
                 onClick={() => removeInLaw(i)}
                 onMouseEnter={(e) => { e.target.style.backgroundColor = '#B91C1C'; }}
                 onMouseLeave={(e) => { e.target.style.backgroundColor = '#DC2626'; }}
               >
                 <Minus size={16} />
                 הסר
               </button>
             </div>
           )}
         </div>
       ))}

       <button
         type="button"
         style={addButtonStyle}
         onClick={addInLaw}
         onMouseEnter={(e) => { e.target.style.backgroundColor = '#B45309'; }}
         onMouseLeave={(e) => { e.target.style.backgroundColor = '#D97706'; }}
       >
         <Plus size={16} />
         הוסף מחותן
       </button>
     </div>
   </div>
 );
}

export default StudentInfoFields;