import React from 'react';
import '../styles/home.css';

function HeaderBar() {
  return (
    <div className="header-bar">
      <div className="header-left">
        <img src="/logo192.png" alt="Logo" className="header-logo" />
        <span className="site-name">Circle</span>
      </div>
      <div className="header-right">
        <button>💬 Messages</button>
        <button>👤 Profile</button>
        <button>🔔 Notifications</button>
        <button>🌙 Theme</button>
      </div>
    </div>
  );
}

export default HeaderBar;
