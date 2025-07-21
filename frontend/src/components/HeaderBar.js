import React from 'react';
import '../styles/home.css';

function HeaderBar({ setActiveView }) {
    return (
        <div className="header-bar">
            <div className="header-left">
                <img src="/logo192.png" alt="Logo" className="header-logo" />
                <span className="site-name">Circle</span>
            </div>
            <div className="header-right">
                <button onClick={() => setActiveView('dashboard')}>🏠 Home</button>
                <button onClick={() => setActiveView('messages')}>💬 Messages</button>
                <button onClick={() => setActiveView('friends')}>👥 Friends</button>
                <button onClick={() => setActiveView('mentoring')}>👥 Mentor</button>
                <button onClick={() => setActiveView('matchRequests')}>📥 Match Requests</button>
                <button onClick={() => setActiveView('mentorRequests')}>📥 Mentor Requests</button>
                <button onClick={() => setActiveView('theme')}>🌙 Theme</button>
            </div>
        </div>
    );
}

export default HeaderBar;
