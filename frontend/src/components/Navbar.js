import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-sm fixed-top px-4" dir="rtl">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          MatchShtark
        </Link>

        {/* כפתור התפריט במסכים קטנים */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="תפריט ניווט"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* תוכן התפריט */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">תפריט ניהול</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#!" role="button" data-bs-toggle="dropdown"
                 aria-expanded="false">
                הוספת מועמד
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/add-person">הוספה ידנית</Link></li>
                <li><Link className="dropdown-item" to="/add-from-excel">ייבוא מקובץ Excel</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/users/match">חיפוש התאמות</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/history">היסטוריית שידוכים</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/boys">רשימת משודכים</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
