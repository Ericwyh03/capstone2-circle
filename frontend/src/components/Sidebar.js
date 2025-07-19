// // src/components/Sidebar.jsx
// import React from 'react';
// import avatar from '../assets/avatar.png';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import '../styles/sidebar.css';
//
// function Sidebar({ isOpen, onToggle, setView }) {
//     const navigate = useNavigate();
//     const { user, logout } = useAuth();
//
//     const handleLogout = async () => {
//         await logout();
//         navigate('/'); // Optional: Navigate to login page if App doesn't auto-redirect
//     };
//
//     return (
//         <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
//             <button className="toggle-btn" onClick={onToggle}>
//                 <span className="toggle-icon">{isOpen ? '⮜' : '⮞'}</span>
//             </button>
//
//             {isOpen && (
//                 <div className="profile-card">
//                     <img src={avatar} alt="Avatar" className="avatar" />
//                     <h3>{user?.name || 'Unnamed User'}</h3>
//                     <p>{user?.institution?.name || 'Not Registered'}</p>
//                     <button onClick={() => setView('profile')}>📝 Edit Profile</button>
//                 </div>
//             )}
//
//             {isOpen && (
//                 <>
//                     <hr />
//                     <div className="main-buttons">
//                         <button onClick={() => setView('matchmaking')}>🔍 Matchmaking</button>
//                         <button onClick={() => setView('events')}>📅 Events</button>
//                         <button onClick={() => setView('mentorship')}>🧑‍🏫 Mentorship</button>
//                     </div>
//                     <hr />
//                     <div className="quick-stats">
//                         <p>Connections: 21</p>
//                         <p>Events Joined: 5</p>
//                         <p>Mentorships: 3</p>
//                     </div>
//                 </>
//             )}
//
//             <div className="nav-footer">
//                 <button onClick={() => setView('dashboard')}>🏠 Home</button>
//                 <button onClick={() => alert("Settings not available yet")}>⚙️ Settings</button>
//                 <button onClick={handleLogout}>🚪 Logout</button>
//             </div>
//         </div>
//     );
// }
//
// export default Sidebar;
// src/components/Sidebar.jsx
import React from 'react';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/sidebar.css';

function Sidebar({ isOpen, onToggle, setView }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();             // Call your useAuth logout
            navigate('/');             // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <button className="toggle-btn" onClick={onToggle}>
                <span className="toggle-icon">{isOpen ? '⮜' : '⮞'}</span>
            </button>

            {isOpen && (
                <div className="profile-card">
                    <img src={avatar} alt="Avatar" className="avatar" />
                    <h3>{user?.name || 'Unnamed User'}</h3>
                    <p>{user?.institution?.name || 'Not Registered'}</p>
                    <button onClick={() => setView('profile')}>📝 Edit Profile</button>
                </div>
            )}

            {isOpen && (
                <>
                    <hr />
                    <div className="main-buttons">
                        <button onClick={() => setView('matchmaking')}>🔍 Matchmaking</button>
                        <button onClick={() => setView('events')}>📅 Events</button>
                        <button onClick={() => setView('mentorship')}>🧑‍🏫 Mentorship</button>
                    </div>
                    <hr />
                    <div className="quick-stats">
                        <p>Connections: 21</p>
                        <p>Events Joined: 5</p>
                        <p>Mentorships: 3</p>
                    </div>
                </>
            )}

            <div className="nav-footer">
                <button onClick={() => setView('dashboard')}>🏠 Home</button>
                <button onClick={() => alert("Settings not available yet")}>⚙️ Settings</button>
                <button onClick={handleLogout}>🚪 Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
