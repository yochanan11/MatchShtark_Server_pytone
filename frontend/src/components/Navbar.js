// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4" dir="rtl">
      <Link className="navbar-brand fw-bold" to="/">
        💒 MatchShtark
      </Link>
      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/users/register">➕ הוספת מועמד</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/users/match">🔍 חיפוש התאמות</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="users/history">📜 היסטוריית שידוכים</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/boys">👦 רשימת בחורים</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
