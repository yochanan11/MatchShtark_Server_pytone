// components/AddPersonForm/StudentInfoFields.js
import React, { useState, useEffect } from 'react';

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

  return (
    <div dir="rtl">
      {/* שדות ראשיים */}
      <div className="row">
        <div className="col-md-6">
          <input type="text" name="studentInfo.firstName" className="form-control mb-2" placeholder="שם פרטי" onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <input type="text" name="studentInfo.lastName" className="form-control mb-2" placeholder="שם משפחה" onChange={handleChange} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <input type="number" value={calculatedAge} readOnly className="form-control mb-2" placeholder="גיל" />
        </div>
        <div className="col-md-4">
          <input type="text" name="studentInfo.birthDate" className="form-control mb-2" placeholder="תאריך לידה (dd/mm/yyyy)" onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="text" name="studentInfo.phone" className="form-control mb-2" placeholder="טלפון" onChange={handleChange} />
        </div>
      </div>

      <input type="text" name="studentInfo.community" className="form-control mb-2" placeholder="קהילה" onChange={handleChange} />
<input type="text" name="studentInfo.style" className="form-control mb-2" placeholder="סגנון" onChange={handleChange} />
<input type="text" name="studentInfo.choice" className="form-control mb-2" placeholder="כיסוי ראש / כובע" onChange={handleChange} />
<input type="text" name="studentInfo.familyPosition" className="form-control mb-2" placeholder="מיקום במשפחה (למשל: 2 מתוך 8)" onChange={handleChange} />
<input type="text" name="studentInfo.currentYeshiva" className="form-control mb-2" placeholder="ישיבה/סמינר נוכחית" onChange={handleChange} />
<input type="text" name="studentInfo.previousYeshiva" className="form-control mb-2" placeholder="ישיבה/סמינר קודמת" onChange={handleChange} />
<input type="text" name="studentInfo.smallYeshiva" className="form-control mb-2" placeholder={'ת"ת/חיידר/בי"ס יסודי'} onChange={handleChange} />

<hr />
<h5>פרטי אב</h5>
<input type="text" name="fatherInfo.fullName" className="form-control mb-2" placeholder="שם האב" onChange={handleChange} />
<input type="text" name="fatherInfo.phone" className="form-control mb-2" placeholder="טלפון אב" onChange={handleChange} />
<input type="text" name="fatherInfo.address" className="form-control mb-2" placeholder="כתובת" onChange={handleChange} />
<input type="text" name="fatherInfo.origin" className="form-control mb-2" placeholder="מוצא" onChange={handleChange} />
<input type="text" name="fatherInfo.community" className="form-control mb-2" placeholder="קהילה" onChange={handleChange} />
<input type="text" name="fatherInfo.style" className="form-control mb-2" placeholder="סגנון" onChange={handleChange} />
<input type="text" name="fatherInfo.dress" className="form-control mb-2" placeholder="לבוש בשבת" onChange={handleChange} />
<input type="text" name="fatherInfo.workplace" className="form-control mb-2" placeholder="מקום עבודה" onChange={handleChange} />

<hr />
<h5>פרטי אם</h5>
<input type="text" name="motherInfo.fullName" className="form-control mb-2" placeholder="שם האם" onChange={handleChange} />
<input type="text" name="motherInfo.origin" className="form-control mb-2" placeholder="מוצא" onChange={handleChange} />
<input type="text" name="motherInfo.community" className="form-control mb-2" placeholder="קהילה" onChange={handleChange} />
<input type="text" name="motherInfo.style" className="form-control mb-2" placeholder="סגנון" onChange={handleChange} />
<input type="text" name="motherInfo.choice" className="form-control mb-2" placeholder="כיסוי ראש (פאה/מטפחת)" onChange={handleChange} />
<input type="text" name="motherInfo.workplace" className="form-control mb-2" placeholder="מקום עבודה" onChange={handleChange} />

<hr />
<h5>שכנים</h5>
{neighbors.map((n, i) => (
  <div className="row" key={i}>
    <div className="col-md-5">
      <input type="text" name={`contactPhones.Neighbors[${i}].name`} className="form-control mb-2" placeholder="שם שכן" onChange={handleChange} />
    </div>
    <div className="col-md-5">
      <input type="text" name={`contactPhones.Neighbors[${i}].phone`} className="form-control mb-2" placeholder="טלפון שכן" onChange={handleChange} />
    </div>
    <div className="col-md-2 d-flex align-items-start">
      {i > 0 && (
        <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => removeNeighbor(i)}>
          ✖️ הסר
        </button>
      )}
    </div>
  </div>
))}
<button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={addNeighbor}>➕ הוסף שכן</button>

<h5>חברים</h5>
{friends.map((f, i) => (
  <div className="row" key={i}>
    <div className="col-md-5">
      <input type="text" name={`contactPhones.Friends[${i}].name`} className="form-control mb-2" placeholder="שם חבר" onChange={handleChange} />
    </div>
    <div className="col-md-5">
      <input type="text" name={`contactPhones.Friends[${i}].phone`} className="form-control mb-2" placeholder="טלפון חבר" onChange={handleChange} />
    </div>
    <div className="col-md-2 d-flex align-items-start">
      {i > 0 && (
        <button type="button" className="btn btn-sm btn-outline-danger mb-2" onClick={() => removeFriend(i)}>
          ✖️ הסר
        </button>
      )}
    </div>
  </div>
))}
<button type="button" className="btn btn-sm btn-outline-primary mb-3" onClick={addFriend}>➕ הוסף חבר</button>

<hr />
<h5>מחותנים</h5>
{inLaws.map((inLaw, i) => (
  <div className="row" key={i}>
    <div className="col-md-5">
      <input type="text" name={`inLaws[${i}].name`} className="form-control mb-2" placeholder="שם משפחת מחותנים" onChange={handleChange} />
    </div>
    <div className="col-md-5">
      <input type="text" name={`inLaws[${i}].city`} className="form-control mb-2" placeholder="עיר" onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <input type="text" name={`inLaws[${i}].Community`} className="form-control mb-2" placeholder="קהילה" onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <input type="text" name={`inLaws[${i}].Address`} className="form-control mb-2" placeholder="כתובת" onChange={handleChange} />
    </div>
    <div className="col-md-12 text-end">
      {i > 0 && (
        <button type="button" className="btn btn-sm btn-outline-danger mb-3" onClick={() => removeInLaw(i)}>
          ✖️ הסר
        </button>
      )}
    </div>
  </div>
))}
<button type="button" className="btn btn-sm btn-outline-primary" onClick={addInLaw}>➕ הוסף מחותן</button>

    </div>
  );
}

export default StudentInfoFields;
