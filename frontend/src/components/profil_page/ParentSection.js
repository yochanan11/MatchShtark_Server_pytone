import React from "react";

function ParentSection({ label, parentInfo = {} }) {
    return (
        <div className="mt-3">
            <h5>פרטי {label}</h5>
            <ul>
                <li>שם: {parentInfo.fullName}</li>
                <li>עיסוק: {parentInfo.workplace}</li>
                <li>כתובת: {parentInfo.address}</li>
                <li>טלפון: {parentInfo.phone}</li>
                <li>סגנון: {parentInfo.style}</li>
            </ul>
        </div>
    );
}

export default ParentSection;
