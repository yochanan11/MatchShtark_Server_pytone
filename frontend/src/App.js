import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import BoysTable from './components/BoysTable';
import DashboardPage from './components/DashboardPage';
import MatchSearchForm from './components/MatchSearchForm';
import MatchesPage from './components/MatchesPage';
import HistoryPage from './components/HistoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/LoginForm';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/dashboard" /> : <Navigate to="/users/login" />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage user={user} setUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path="/users/login" element={<HomePage setUser={setUser} />} />
        <Route path="/users/register" element={<RegisterForm />} />
        <Route path="/boys" element={<BoysTable />} />
        <Route path="/users/match" element={<MatchSearchForm />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/users/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
