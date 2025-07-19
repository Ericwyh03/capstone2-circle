import React from 'react';
import useAuth from '../hooks/useAuth';
import '../styles/profilepage.css';


const ProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="cover-photo" />
                <div className="profile-info">
                    <img src={user?.avatar || '/default-avatar.png'} alt="Profile" className="profile-avatar" />
                    <div>
                        <h2>{user?.name || 'Unnamed User'}</h2>
                        <p>{user?.institution?.name || 'No Institution'}</p>
                        <button className="edit-button">✏️ Edit Profile</button>
                    </div>
                </div>
            </div>

            <div className="profile-body">
                <div className="profile-card">
                    <h3>📄 Basic Info</h3>
                    <p><strong>Email:</strong> {user?.email || '-'}</p>
                    <p><strong>Joined:</strong> {new Date(user?.created_at).toLocaleDateString() || '-'}</p>
                </div>

                <div className="profile-card">
                    <h3>📊 Quick Stats</h3>
                    <p><strong>Connections:</strong> {user?.connections || 0}</p>
                    <p><strong>Events Joined:</strong> {user?.events || 0}</p>
                    <p><strong>Mentorships:</strong> {user?.mentorships || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
