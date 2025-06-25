import React, { useState } from "react";

function SectionToggle({ label, children }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-3">
      <button
        className="btn btn-outline-primary w-100 text-end"
        onClick={() => setShow(!show)}
      >
        {show ? `🔽 הסתר ${label}` : `▶️ הצג ${label}`}
      </button>
      {show && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default SectionToggle;
