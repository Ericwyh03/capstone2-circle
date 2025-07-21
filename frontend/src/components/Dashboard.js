// 📄 components/Dashboard.js
import React from 'react';
import rightbarImage from '../assets/rightbar.png';
import useAuth from "../hooks/useAuth";
import { FaComments, FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';

function Dashboard() {
    const { user} = useAuth();
    return (
        <div className="dashboard">
            {/* 🎉 Welcome banner with decorative flakes and overlay */}
            <div
                className="welcome-banner full-bg-banner"
                style={{ backgroundImage: `url(${rightbarImage})` }}
            >
                <div className="flake-container">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`flake sparkle-flake flake-${i + 1}`}></div>
                    ))}
                </div>

                <div className="welcome-overlay">
                    <h2>👋 Welcome back, {user?.name || 'Unnamed User'}!</h2>
                    <p>Let’s help you connect, meet, and grow today.</p>
                </div>
            </div>

            {/* 🔍 Quick tiles section */}
            <div className="quick-tiles">
                <div className="tile">
                    <FaComments style={{marginRight: '6px', color: '#9600FF'}}/>
                    Recent Match: Sarah
                </div>
                <div className="tile">
                    <FaCalendarAlt style={{marginRight: '6px', color: '#9600FF'}}/>
                    Upcoming Event: Tech Talk
                </div>
                <div className="tile">
                    <FaChalkboardTeacher style={{marginRight: '6px', color: '#9600FF' }}/>
                    Ongoing Mentorship
                </div>
            </div>

            {/* 📜 Activity Feed */}
            <div className="activity-feed">
                <h3>Activity Feed</h3>
                <ul>
                    <li>You joined "AI Meetup".</li>
                    <li>You matched with Sarah.</li>
                    <li>You viewed John's mentor profile.</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
