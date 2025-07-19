// // src/components/Sidebar.jsx
// import React from 'react';
// import avatar from '../assets/avatar.png';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
//
// function Sidebar() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//
//   return (
//       <div className="sidebar">
//         <div>
//           <div className="profile-card">
//             <img src={avatar} alt="Avatar" className="avatar" />
//
//             <h3>{user?.name || 'Unnamed User'}</h3>
//             <p>{user?.institution?.name || 'Not Currently Registered to an Institution'}</p>
//
//             <button onClick={() => navigate("/profile")}>📝 Edit Profile</button>
//           </div>
//
//           <hr />
//
//           <div className="main-buttons">
//             <button>🔍 Matchmaking</button>
//             <button>📅 Events</button>
//             <button>🧑‍🏫 Mentorship</button>
//           </div>
//
//           <hr />
//
//           <div className="quick-stats">
//             <p>Connections: 21</p>
//             <p>Events Joined: 5</p>
//             <p>Mentorships: 3</p>
//           </div>
//         </div>
//
//         <div className="nav-footer">
//           <button>🏠 Home</button>
//           <button>⚙️ Settings</button>
//           <button>🚪 Logout</button>
//         </div>
//       </div>
//   );
// }
//
// export default Sidebar;
// Sidebar.jsx
import React from 'react';
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/sidebar.css';

// function Sidebar({ isOpen, onToggle }) {
//     const navigate = useNavigate();
//     const { user } = useAuth();
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
//                     <button onClick={() => navigate('/profile')}>📝 Edit Profile</button>
//                 </div>
//             )}
//
//             {isOpen && (
//                 <>
//                     <hr />
//                     <div className="main-buttons">
//                         <button>🔍 Matchmaking</button>
//                         <button>📅 Events</button>
//                         <button>🧑‍🏫 Mentorship</button>
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
//                 <button>🏠 Home</button>
//                 <button>⚙️ Settings</button>
//                 <button>🚪 Logout</button>
//             </div>
//         </div>
//     );
// }
// 📄 src/components/Sidebar.jsx
function Sidebar({ isOpen, onToggle, onChangeView }) {
    const navigate = useNavigate();
    const { user } = useAuth();

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
                    <button onClick={() => navigate('/profile')}>📝 Edit Profile</button>
                </div>
            )}

            {isOpen && (
                <>
                    <hr />
                    <div className="main-buttons">
                        <button onClick={() => onChangeView('matchmaking')}>🔍 Matchmaking</button>
                        <button onClick={() => onChangeView('events')}>📅 Events</button>
                        <button onClick={() => onChangeView('mentorship')}>🧑‍🏫 Mentorship</button>
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
                <button onClick={() => onChangeView('dashboard')}>🏠 Home</button>
                <button>⚙️ Settings</button>
                <button>🚪 Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
