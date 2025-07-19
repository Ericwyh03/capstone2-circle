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
// // export default HomePage;
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboard';
// import HeaderBar from './HeaderBar';
// import '../styles/home.css';
//
// function HomePage() {
//     const [isSidebarOpen, setSidebarOpen] = useState(true);
//
//     const toggleSidebar = () => {
//         setSidebarOpen(prev => !prev);
//     };
//
//     return (
//         <div className="home-wrapper">
//             <HeaderBar />
//             <div className="home-container">
//                 <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
//                 <div className={`dashboard ${isSidebarOpen ? 'expanded' : 'full-width'}`}>
//                     <Dashboard />
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default HomePage;
// 📄 src/components/HomePage.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Matchmaking from './Matchmaking';
import Events from './Events';
import Mentorship from './Mentorship';
import HeaderBar from './HeaderBar';
import '../styles/home.css';

function HomePage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [activeView, setActiveView] = useState('dashboard'); // 👈 Track the current view

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    const renderView = () => {
        switch (activeView) {
            case 'matchmaking':
                return <Matchmaking />;
            case 'events':
                return <Events />;
            case 'mentorship':
                return <Mentorship />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="home-wrapper">
            <HeaderBar />
            <div className="home-container">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onToggle={toggleSidebar}
                    onChangeView={setActiveView} // 👈 Pass the function down
                />
                <div className={`dashboard ${isSidebarOpen ? 'expanded' : 'full-width'}`}>
                    {renderView()}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
