import React from "react";
import LogoSection from "./LogoSection";
import LoginForm from "./LoginForm";
import RegisterLink from "./RegisterLink";
import Footer from "./Footer";

function HomePage({ setUser }) {
    return (
        <div>
            <div className="container text-center mt-5">
                <LogoSection />
                <LoginForm setUser={setUser} />
                <RegisterLink />
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
