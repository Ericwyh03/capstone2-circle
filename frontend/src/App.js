// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import useAuth from './hooks/useAuth';
import LoginRegisterPage from "./components/LoginRegisterPage";

function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<LoginRegisterPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
}

export default App;
