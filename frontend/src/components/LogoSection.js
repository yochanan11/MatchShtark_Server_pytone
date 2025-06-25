import React from "react";

function LogoSection() {
    return (
        <>
            <div className="logo">
                <img src="/MatchShtark.png" alt="MatchShtark Logo" style={{ height: "20%", width: "20%" }} />
            </div>
            <h1>ברוכים הבאים</h1>
            <p className="description">
                אנו מזמינים אותך להצטרף למערכת המתקדמת לשידוכים המבוססת על התאמה אמיתית. מצא את הזיווג המושלם
                שלך בדרך מכבדת, אישית ומקצועית.
            </p>
        </>
    );
}

export default LogoSection;
