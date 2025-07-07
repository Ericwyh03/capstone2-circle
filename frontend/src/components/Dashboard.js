import React from 'react';
import rightbarImage from '../assets/rightbar.png';

function Dashboard() {
  return (
    <div className="dashboard">
      {/* You can remove this if you're using the Welcome banner already */}
      {/* <h2>Welcome back, John!</h2> */}

      {/* 🎉 Full-width image banner with overlay text */}
      <div
        className="welcome-banner full-bg-banner"
        style={{
          backgroundImage: `url(${rightbarImage})`,
        }}
      >
        {/* <div className="flake-container">
          <div className="flake"></div>
          <div className="flake"></div>
          <div className="flake"></div>
        </div> */}
        <div className="flake-container">
  {Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className={`flake sparkle-flake flake-${i + 1}`}></div>
  ))}
</div>


        <div className="welcome-overlay">
          <h2>👋 Welcome back, Kris!</h2>
          <p>Let’s help you connect, meet, and grow today.</p>
        </div>
      </div>

      <div className="quick-tiles">
        <div className="tile">💬 Recent Match: Sarah</div>
        <div className="tile">📅 Upcoming Event: Tech Talk</div>
        <div className="tile">🧑‍🏫 Ongoing Mentorship</div>
      </div>

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
