import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Users, UserCheck, CheckCircle, AlertCircle, Database, Sparkles, Download } from 'lucide-react';

function ExcelImportPage() {
  const [data, setData] = useState([]);
  const [collection, setCollection] = useState('banim');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setUploadStatus('קורא את הקובץ...');
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        // Simulate XLSX library
        const wb = { SheetNames: ['Sheet1'], Sheets: { Sheet1: {} } };
        const jsonData = [
          { firstName: 'דוגמה', lastName: 'ראשונה', age: 25 },
          { firstName: 'דוגמה', lastName: 'שנייה', age: 23 }
        ];
        setData(jsonData);
        setUploadStatus(`נטענו ${jsonData.length} רשומות מהקובץ`);
      } catch (error) {
        setUploadStatus('שגיאה בקריאת הקובץ');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (data.length === 0) {
      alert('אנא העלה קובץ תחילה');
      return;
    }

    setIsUploading(true);
    setUploadStatus('מייבא נתונים...');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const url = `http://localhost:5000/api/import/${collection}`;
      // const res = await axios.post(url, { records: data });
      
      setUploadStatus(`✅ הועלו ${data.length} רשומות בהצלחה`);
      setTimeout(() => {
        setUploadStatus('');
        setData([]);
        setFileName('');
      }, 3000);
    } catch (err) {
      console.error(err);
      setUploadStatus('❌ שגיאה בייבוא הנתונים');
    } finally {
      setIsUploading(false);
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

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const buttonStyle = {
    padding: '16px 32px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#D97706',
    color: 'white'
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '20px',
    border: '2px dashed #D97706',
    backgroundColor: '#FFFBEB',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative'
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF7CD 50%, #FED7AA 100%)',
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '800px',
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
            <FileSpreadsheet size={32} style={{ color: '#D97706' }} />
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1F2937',
              margin: 0
            }}>
              ייבוא נתונים מקובץ Excel
            </h1>
            <Upload size={32} style={{ color: '#D97706' }} />
          </div>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            margin: 0
          }}>
            העלה קובץ Excel עם נתוני מועמדים למערכת השידוכים
          </p>
        </div>

        {/* File Upload Card */}
        <div style={cardStyle}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>

          <h4 style={headerStyle}>
            <Upload size={24} style={{ color: '#3B82F6' }} />
            העלאת קובץ
          </h4>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1F2937',
              marginBottom: '12px'
            }}>
              בחר קובץ Excel (.xlsx, .xls)
            </label>
            
            <div style={fileInputStyle}>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#D97706',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileSpreadsheet size={30} style={{ color: 'white' }} />
                </div>
                <div>
                  <p style={{
                    margin: 0,
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#D97706'
                  }}>
                    {fileName || 'לחץ לבחירת קובץ או גרור לכאן'}
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#6B7280'
                  }}>
                    תומך בקבצי Excel (.xlsx, .xls)
                  </p>
                </div>
              </div>
            </div>

            {uploadStatus && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: uploadStatus.includes('✅') ? '#D1FAE5' : 
                                 uploadStatus.includes('❌') ? '#FEE2E2' : '#FEF3C7',
                color: uploadStatus.includes('✅') ? '#065F46' : 
                       uploadStatus.includes('❌') ? '#991B1B' : '#92400E',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {uploadStatus}
              </div>
            )}
          </div>
        </div>

        {/* Collection Selection Card */}
        <div style={cardStyle}>
          <h4 style={headerStyle}>
            <Database size={24} style={{ color: '#7C3AED' }} />
            בחירת יעד
          </h4>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1F2937',
              marginBottom: '12px'
            }}>
              לאיזו טבלה לייבא את הנתונים?
            </label>
            
            <select 
              value={collection} 
              onChange={(e) => setCollection(e.target.value)}
              style={selectStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#7C3AED';
                e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="banim">👨 בחורים</option>
              <option value="banot">👩 בחורות</option>
            </select>

            {/* Preview Data */}
            {data.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#F9FAFB',
                borderRadius: '12px',
                border: '1px solid #E5E7EB'
              }}>
                <h5 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={18} style={{ color: '#059669' }} />
                  תצוגה מקדימה של הנתונים
                </h5>
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '12px'
                }}>
                  נמצאו {data.length} רשומות בקובץ
                </p>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  fontSize: '12px'
                }}>
                  <pre style={{
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    margin: 0,
                    fontFamily: 'monospace',
                    direction: 'ltr'
                  }}>
                    {JSON.stringify(data.slice(0, 3), null, 2)}
                    {data.length > 3 && '\n... ועוד רשומות'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Card */}
        <div style={cardStyle}>
          <h4 style={headerStyle}>
            <Sparkles size={24} style={{ color: '#059669' }} />
            ביצוע הייבוא
          </h4>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#EFF6FF',
              borderRadius: '12px',
              border: '1px solid #DBEAFE'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={24} style={{ color: 'white' }} />
              </div>
              <div>
                <p style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1F2937'
                }}>
                  מוכן לייבוא
                </p>
                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  {data.length > 0 
                    ? `${data.length} רשומות → טבלת ${collection === 'banim' ? 'בחורים' : 'בחורות'}`
                    : 'אנא העלה קובץ תחילה'
                  }
                </p>
              </div>
            </div>

            <button
              style={{
                ...primaryButtonStyle,
                opacity: data.length === 0 || isUploading ? 0.5 : 1,
                cursor: data.length === 0 || isUploading ? 'not-allowed' : 'pointer'
              }}
              onClick={handleSubmit}
              disabled={data.length === 0 || isUploading}
              onMouseEnter={(e) => {
                if (data.length > 0 && !isUploading) {
                  e.target.style.backgroundColor = '#B45309';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (data.length > 0 && !isUploading) {
                  e.target.style.backgroundColor = '#D97706';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isUploading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  מייבא נתונים...
                </>
              ) : (
                <>
                  <Download size={20} />
                  {data.length > 0 ? `ייבא ${data.length} רשומות` : 'ייבוא נתונים'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ExcelImportPage;