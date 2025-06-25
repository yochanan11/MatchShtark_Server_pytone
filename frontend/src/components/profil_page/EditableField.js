import React from "react";

function EditableField({ label, value, onChange, readOnly }) {
    return (
        <div className="mb-2 text-end">
            <label className="form-label">{label}</label>
            <input
                type="text"
                className="form-control"
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                readOnly={readOnly}
            />
        </div>
    );
}

export default EditableField;
