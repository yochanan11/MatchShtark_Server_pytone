import React from "react";

function FormFields() {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="first-name" className="form-label">שם פרטי</label>
                    <input type="text" className="form-control" id="first-name" name="first-name" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="last-name" className="form-label">שם משפחה</label>
                    <input type="text" className="form-control" id="last-name" name="last-name" required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">נייד</label>
                    <input type="text" className="form-control" id="phone" name="phone" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">אימייל</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="password" className="form-label">סיסמא</label>
                    <input type="password" className="form-control" id="password" name="password" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="password-aging" className="form-label">אימות סיסמא</label>
                    <input type="password" className="form-control" id="password-aging" name="password-aging" required />
                </div>
            </div>
        </>
    );
}

export default FormFields;
