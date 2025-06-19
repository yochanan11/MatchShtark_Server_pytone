import React from "react";
import LogoHeader from "./LogoHeader";
import FormFields from "./FormFields";
import AlreadyRegistered from "./AlreadyRegistered";

function RegisterForm() {
    return (
        <div className="container text-center mt-5" dir="rtl">
            <LogoHeader />
            <form
                action="/users/register"
                method="POST"
                className="mx-auto p-4 border rounded"
                style={{ maxWidth: "400px" }}
            >
                <FormFields />
                <input type="submit" className="btn btn-primary" value="הרשמה" />
            </form>
            <AlreadyRegistered />
        </div>
    );
}

export default RegisterForm;
