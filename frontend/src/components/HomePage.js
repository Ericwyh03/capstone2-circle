import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Matchmaking from './Matchmaking';
import EventsPage from './EventsPage';
import MentorshipPage from './MentorshipPage';
import ProfilePage from './ProfilePage';
import HeaderBar from './HeaderBar';
import '../styles/home.css';
import MatchRequests from "./MatchRequest";
import MentorRequests from "./MentorRequest";
import Messages from "./Messages";
import Friends from "./Friends";
import MentorConnections from "./MentorConnection";
import MentorConnection from "./MentorConnection";

function HomePage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeView, setActiveView] = useState('dashboard'); // ⬅️ control what's shown

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const renderView = () => {
        switch (activeView) {
            case 'matchmaking': return <Matchmaking />;
            case 'events': return <EventsPage />;
            case 'mentor': return <MentorshipPage />;
            case 'profile': return <ProfilePage />;
            case 'matchRequests':return <MatchRequests />;
            case 'mentorRequests':return <MentorRequests />;
            case 'messages':return <Messages />;
            case 'friends': return <Friends />;
            case 'mentoring': return <MentorConnection />;


            default: return <Dashboard />;

        }
    };

    return (
        <div className="home-wrapper">
            <HeaderBar setActiveView={setActiveView} />
            <div className="home-container">
                <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} setView={setActiveView} />
                <div className={`dashboard ${isSidebarOpen ? 'expanded' : 'full-width'}`}>
                    {renderView()}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
