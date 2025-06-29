// components/ExcelImportPage.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function ExcelImportPage() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState('banim'); // או banot

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:5000/api/import/${collection}`;
      const res = await axios.post(url, { records: data });
      alert(`הועלו ${res.data.count} רשומות`);
    } catch (err) {
      console.error(err);
      alert('שגיאה בייבוא');
    }
  };

  return (
    <div className="container mt-4" dir="rtl">
      <h3>ייבוא נתונים מקובץ Excel</h3>
      <div className="mb-3">
        <label className="form-label">בחר קובץ Excel</label>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">לאיזו טבלה לייבא?</label>
        <select value={collection} onChange={(e) => setCollection(e.target.value)} className="form-select">
          <option value="banim">בחורים</option>
          <option value="banot">בחורות</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>ייבוא</button>
    </div>
  );
}

export default ExcelImportPage;
