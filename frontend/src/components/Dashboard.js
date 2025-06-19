import React from "react";
import WelcomeHeader from "./WelcomeHeader";
import ActionButtons from "./ActionButtons";
import ActivitySummary from "./ActivitySummary";
import SmartMatches from "./SmartMatches";

function Dashboard({ user }) {
    return (
        <div className="container p-5" dir="rtl">
            <div className="row">
                <div className="col">
                    <WelcomeHeader name={user.name} />
                    <ActionButtons />
                    <ActivitySummary />
                    <SmartMatches />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
