import React from 'react';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import BoysTable from "./components/BoysTable";
import {Routes, Route} from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import MatchSearchForm from "./components/MatchSearchForm";
import MatchesPage from './components/MatchesPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/users/register" element={<RegisterForm/>}/>
                <Route path="/boys" element={<BoysTable/>}/>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/users/match" element={<MatchSearchForm />} />
                <Route path="/matches" element={<MatchesPage />} />

                    {/*<Route path="/users/login" element={<LoginForm />} />*/}
                    {/*<Route path="/users/already-registered" element={<AlreadyRegistered />} />*/}
            </Routes>
        </>
    );
}

export default App;
