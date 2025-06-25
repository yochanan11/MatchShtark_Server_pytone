import React from "react";

function ProposalsSection({ proposals = [] }) {
    return (
        <div className="mt-3">
            <h5>הצעות</h5>
            {proposals.length > 0 ? proposals.map((p, i) => (
                <p key={i}>
                    <b>{p.boyName || p.girlName}</b> - {p.status === "success" ? "✅ שידוך הצליח" : "❌ נכשל"} - סיבה: {p.reason}
                </p>
            )) : <p>אין הצעות כרגע.</p>}
        </div>
    );
}

export default ProposalsSection;
