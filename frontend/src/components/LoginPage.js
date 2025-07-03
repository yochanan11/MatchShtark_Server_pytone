import React from "react";
import LogoSection from "./LogoSection";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegisterLink";
import Footer from "./Footer";

function LoginPage({ setUser }) {
    return (
        <div className="page-box">
            <div className="container text-center mt-5 ">

                <LoginForm setUser={setUser} />
                <RegisterLink />
                <Footer />
            </div>
        </div>
    );
}

export default LoginPage;
