import React from "react";

function InLawsSection({ inLaws = [] }) {
  return (
    <div className="mt-3">
      <h5>מחותנים</h5>
      {inLaws.map((il, i) => (
        <p key={i}>{il.name} - {il.city} - {il.Community} - {il.Address}</p>
      ))}
    </div>
  );
}

export default InLawsSection;
