import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import HeaderBar from './HeaderBar';
import '../styles/home.css';

function HomePage() {
  return (
    <div className="home-wrapper">
      <HeaderBar />
      <div className="home-container">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default HomePage;
