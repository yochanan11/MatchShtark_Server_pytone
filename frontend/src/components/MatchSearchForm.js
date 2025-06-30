import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MatchSearchForm() {
  const [boys, setBoys] = useState([]);
  const [selectedBoyId, setSelectedBoyId] = useState("");
  const [girls, setGirls] = useState([]);
  const [selectedGirlId, setSelectedGirlId] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // שליפת בנים פנויים
  useEffect(() => {
    fetch("http://localhost:5000/api/boys")
      .then(res => res.json())
      .then(data => {
        const freeBoys = data
          .map((boy, i) => {
            const isMatched = boy.proposals?.some(p => p.status === "success");
            return {
              ...boy,
              name: `${boy.studentInfo?.firstName || ""} ${boy.studentInfo?.lastName || ""}`,
              status: isMatched ? "שודך" : "פנוי"
            };
          })
          .filter(boy => boy.status === "פנוי");

        setBoys(freeBoys);
      })
      .catch(() => setMessage("שגיאה בשליפת הבחורים"));
  }, []);

  // שליפת בנות פנויות
  useEffect(() => {
    fetch("http://localhost:5000/api/girls")
      .then(res => res.json())
      .then(data => {
        const freeGirls = data.filter(g => g.status !== "engaged").map(girl => ({
          ...girl,
          name: `${girl.studentInfo?.firstName || ""} ${girl.studentInfo?.lastName || ""}`
        }));
        setGirls(freeGirls);
      })
      .catch(() => setMessage("שגיאה בשליפת הבנות"));
  }, []);

  const handleBoySubmit = async (e) => {
    e.preventDefault();
    if (!selectedBoyId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/matches/boy/${selectedBoyId}`);
      const data = await res.json();
      if (data.error) {
        setMessage("שגיאה בשרת: " + data.error);
      } else {
        navigate("/matches", {
          state: {
            firstName: data.boy.firstName,
            lastName: data.boy.lastName,
            matches: data.matches,
            isBoy: true // ✅ הוספה – מאפשר ל-MatchesPage לדעת
          }
        });
      }
    } catch (err) {
      setMessage("שגיאה בעת שליחת הבקשה");
    }
  };

  const handleGirlSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGirlId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/matches/girl/${selectedGirlId}`);
      const data = await res.json();
      if (data.error) {
        setMessage("שגיאה בשרת: " + data.error);
      } else {
        navigate("/matches", {
          state: {
            firstName: data.girl.firstName,
            lastName: data.girl.lastName,
            matches: data.matches,
            isBoy: false // ✅ הוספה – התאמות לבחורה
          }
        });
      }
    } catch (err) {
      setMessage("שגיאה בעת שליחת הבקשה");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">🔍 חיפוש התאמות</h3>

      {/* טופס עבור בחור */}
      <form onSubmit={handleBoySubmit}>
        <label className="form-label">בחר בחור פנוי:</label>
        <select
          className="form-select"
          value={selectedBoyId}
          onChange={(e) => setSelectedBoyId(e.target.value)}
          required
        >
          <option value="">בחר מועמד</option>
          {boys.map(boy => (
            <option key={boy.index} value={boy.index}>
              #{boy.index} - {boy.name}
            </option>
          ))}
        </select>
        <input type="submit" className="btn btn-primary mt-3" value="חפש התאמות לבחורים" />
      </form>

      <hr className="my-5" />

      {/* טופס עבור בחורה */}
      <form onSubmit={handleGirlSubmit}>
        <label className="form-label">בחרי בחורה פנויה:</label>
        <select
          className="form-select"
          value={selectedGirlId}
          onChange={(e) => setSelectedGirlId(e.target.value)}
          required
        >
          <option value="">בחרי מועמדת</option>
          {girls.map(girl => (
            <option key={girl.recordId} value={girl.recordId}>
              #{girl.recordId} - {girl.name}
            </option>
          ))}
        </select>
        <input type="submit" className="btn btn-success mt-3" value="חפשי התאמות לבנות" />
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default MatchSearchForm;
