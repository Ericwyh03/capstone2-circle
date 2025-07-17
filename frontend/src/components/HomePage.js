// import React from 'react';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import HeaderBar from './HeaderBar';
// import '../styles/home.css';
//
// function HomePage() {
//   return (
//     <div className="home-wrapper">
//       <HeaderBar />
//       <div className="home-container">
//         <Sidebar />
//         <Dashboard />
//       </div>
//     </div>
//   );
// }
//
// export default HomePage;
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import HeaderBar from './HeaderBar';
import '../styles/home.css';

function HomePage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div className="home-wrapper">
            <HeaderBar />
            <div className="home-container">
                <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
                <div className={`dashboard ${isSidebarOpen ? 'expanded' : 'full-width'}`}>
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
