import React, { useEffect, useState } from "react";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setError("שגיאה בטעינת המשתמשים");
        setLoading(false);
      })
      .catch(() => {
        setError("שגיאה בטעינה מהשרת");
        setLoading(false);
      });
  }, []);

  const openModal = (recordId) => {
    setSelectedUserId(recordId);
    setNewPassword("");
    setConfirmPassword("");
    setShowModal(true);
  };

  const handleSetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("יש למלא את שני השדות");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("הסיסמאות אינן תואמות");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/set-password/${selectedUserId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        setShowModal(false);
      } else {
        alert("❌ שגיאה: " + (data.error || "לא ידועה"));
      }
    } catch (err) {
      alert("❌ שגיאה בשליחת הבקשה לשרת");
    }
  };

  return (
    <div className="container mt-4" dir="rtl">
      <h4 className="mb-4 text-center">רשימת משתמשים</h4>

      {loading ? (
        <div className="text-center">טוען...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>מספר מזהה</th>
                <th>שם פרטי</th>
                <th>שם משפחה</th>
                <th>אימייל</th>
                <th>טלפון</th>
                <th>שחזור סיסמה</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.recordId}>
                  <td>{user.recordId}</td>
                  <td>{user.userInfo?.firstName}</td>
                  <td>{user.userInfo?.lastName}</td>
                  <td>{user.userInfo?.email}</td>
                  <td>{user.userInfo?.phone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openModal(user.recordId)}
                    >
                      אפס סיסמה
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* מודל להזנת סיסמה חדשה */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">הזנת סיסמה חדשה</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="הכנס סיסמה חדשה"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="אמת סיסמה חדשה"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  ביטול
                </button>
                <button className="btn btn-primary" onClick={handleSetPassword}>
                  עדכן סיסמה
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
