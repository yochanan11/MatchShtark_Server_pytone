// App.js
import React, {useState, useEffect} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterForm from './components/RegisterForm';
import BoysTable from './components/BoysTable';
import DashboardPage from './components/DashboardPage';
import MatchSearchForm from './components/MatchSearchForm';
import MatchesPage from './components/MatchesPage';
import HistoryPage from './components/HistoryPage';
import ProfilePage from "./components/profil_page/ProfilePage";
import AddPersonForm from './components/AddPersonForm/AddPersonForm';
import ExcelImportPage from './components/AddPersonForm/ExcelImportPage';
import AdminPage from './components/admin/AdminPage';
import UsersTable from "./components/admin/UsersTable";
import FeatureImportancePage from "./components/FeatureImportancePage";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
    return null;
}

function App() {
    const [user, setUser] = useState(null);
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        const userCookie = getCookie("user");
        if (userCookie) {
            try {
                const parsedUser = JSON.parse(userCookie);
                setUser(parsedUser);
            } catch (e) {
                console.error("\u274C שגיאה בקריאת הקוקי:", e);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setUserChecked(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const userCookie = getCookie("user");
            if (userCookie) {
                try {
                    const parsedUser = JSON.parse(userCookie);
                    if (!user || user.email !== parsedUser.email) {
                        setUser(parsedUser);
                    }
                } catch {
                    setUser(null);
                }
            } else {
                if (user !== null) setUser(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);

    return (
        <>
            <Navbar/>
            <div className=" pt-5">
                <Routes>

                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/dashboard" element={
                        userChecked ? (user ? <DashboardPage setUser={setUser}/> : <Navigate to="/users/login"/>) : null
                    }/>
                    <Route path="/users/login" element={
                        userChecked ? (user ? <Navigate to="/dashboard"/> : <LoginPage setUser={setUser}/>) : null
                    }/>
                    <Route path="/dashboard" element={<DashboardPage setUser={setUser}/>}/>
                    <Route path="/users/login" element={<LoginPage setUser={setUser}/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/admin/users" element={<UsersTable/>}/>
                    <Route path="/users/register" element={<RegisterForm/>}/>
                    <Route path="/boys" element={<BoysTable/>}/>
                    <Route path="/users/match" element={<MatchSearchForm/>}/>
                    <Route path="/matches" element={<MatchesPage/>}/>
                    <Route path="/users/history" element={<HistoryPage/>}/>
                    <Route path="/model/importance" element={<FeatureImportancePage/>}/>

                    <Route path="/profile/boy/:recordId" element={<ProfilePage isBoy={true}/>}/>
                    <Route path="/profile/girl/:recordId" element={<ProfilePage isBoy={false}/>}/>
                    <Route path="/add-person" element={<AddPersonForm/>}/>
                    <Route path="/add-from-excel" element={<ExcelImportPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;