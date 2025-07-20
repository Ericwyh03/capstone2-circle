// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import useAuth from './hooks/useAuth';
import LoginRegisterPage from "./components/LoginRegisterPage";
import Matchmaking from "./components/Matchmaking";
import MatchRequests from "./components/MatchRequest";

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LoginRegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/matchmaking" element={<Matchmaking />} />
            <Route path="/match-requests" element={<MatchRequests />} />
        </Routes>
    );
}

export default App;
