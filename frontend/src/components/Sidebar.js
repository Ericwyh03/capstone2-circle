import React from 'react';
import avatar from '../assets/avatar.png'; 
import EditInterests from './EditInterests';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div>
        <div className="profile-card">
          <img src={avatar} alt="Avatar" className="avatar" />
          <h3>John Doe</h3>
          <p>Sunway University</p>
           <button onClick={() => navigate("/edit-interests")}>🎯 Edit Interests</button>
        </div>

        <hr />

        <div className="main-buttons">
          <button>🔍 Matchmaking</button>
          <button>📅 Events</button>
          <button>🧑‍🏫 Mentorship</button>
        </div>

        <hr />

        <div className="quick-stats">
          <p>Connections: 21</p>
          <p>Events Joined: 5</p>
          <p>Mentorships: 3</p>
        </div>
      </div>

      <div className="nav-footer">
        <button>🏠 Home</button>
        <button>⚙️ Settings</button>
        <button>🚪 Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
