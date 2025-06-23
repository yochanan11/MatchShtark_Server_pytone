import React from "react";

function Spinner({ text = "טוען..." }) {
    return (
        <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{text}</span>
            </div>
            <p className="mt-2">{text}</p>
        </div>
    );
}

export default Spinner;
