import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/sidebar.css';
import avatar from '../assets/avatar.png';

// Icons
import { FaUserEdit, FaSearch, FaCalendarAlt, FaChalkboardTeacher, FaCog, FaSignOutAlt, FaHome, FaUserFriends } from 'react-icons/fa';

function Sidebar({ isOpen, onToggle, setView }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
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
                    <button className="function-button" onClick={() => setView('profile')}>
                        <FaUserEdit style={{ marginRight: '6px', color: '#F048C6' }} /> Profile
                    </button>
                </div>
            )}

            {isOpen && (
                <>
                    <hr />
                    <div className="main-buttons">
                        <button onClick={() => setView('matchmaking')}>
                            <FaSearch style={{ marginRight: '6px' }} /> Matchmaking
                        </button>
                        <button onClick={() => setView('events')}>
                            <FaCalendarAlt style={{ marginRight: '6px' }} /> Events
                        </button>
                        <button onClick={() => setView('mentorship')}>
                            <FaChalkboardTeacher style={{ marginRight: '6px' }} /> Mentorship
                        </button>
                    </div>
                    <hr />
                    <div className="quick-stats">
                        <p><FaUserFriends style={{ marginRight: '6px' }} />Connections: 21</p>
                        <p><FaCalendarAlt style={{ marginRight: '6px' }} />Events Joined: 5</p>
                        <p><FaChalkboardTeacher style={{ marginRight: '6px' }} />Mentorships: 3</p>
                    </div>
                </>
            )}

            <div className="nav-footer">
                <button onClick={() => setView('dashboard')}>
                    <FaHome style={{ marginRight: '6px', color: '#9600FF' }} /> Home
                </button>
                <button onClick={() => alert("Settings not available yet")}>
                    <FaCog style={{ marginRight: '6px', color: '#341539' }} /> Settings
                </button>
                <button onClick={handleLogout}>
                    <FaSignOutAlt style={{ marginRight: '6px', color: '#F048C6' }} /> Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
