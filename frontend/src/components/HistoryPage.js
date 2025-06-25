import React, { useEffect, useState } from "react";
import Spinner from "./Spinner"; // ודא שזה הנתיב הנכון לרכיב הספינר

function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false); // טעינה הסתיימה
      })
      .catch((err) => {
        console.error("שגיאה בשליפת היסטוריית שידוכים:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-5" dir="rtl">
      <h2 className="text-center mb-4" style={{ color: "#c49a52" }}>
        💛 שידוכים מוצלחים
      </h2>

      {loading ? (
        <Spinner text="טוען שידוכים מוצלחים..." />
      ) : matches.length === 0 ? (
        <p className="text-center text-muted">לא נמצאו שידוכים מוצלחים</p>
      ) : (
        matches.map((match, idx) => (
            <div
                className="mb-4 p-3"
                key={idx}
                style={{
                    border: "2px solid #c49a52",
                    borderRadius: "8px",
                    backgroundColor: "#fdfdfc",
                }}
            >
                <h5 className="mb-2" style={{color: "#000"}}>
                    חתן: {match.boyName}
                </h5>
                <h5 className="mb-2" style={{color: "#000"}}>
                    כלה: {match.girlName}
                </h5>
                <p className="mb-0 text-muted">📝 {match.reason}</p>
            </div>
        ))
      )}
    </div>
  );
}

export default MatchHistory;
