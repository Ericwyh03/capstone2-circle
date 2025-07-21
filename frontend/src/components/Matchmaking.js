// frontend/src/components/Matchmaking.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/matchmaking.css';

const Matchmaking = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get('/matches')
            .then(res => setMatches(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleSendMatchRequest = (receiverId) => {
        axios.post('/match-request', { receiver_id: receiverId })
            .then(res => alert("Match request sent!"))
            .catch(err => {
                console.error("Failed to send match request:", err);
                alert("Something went wrong.");
            });
    };

    // Optional: Stable gradient based on user ID
    const getStableGradient = (userId) => {
        const hash = Array.from(userId.toString()).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `gradient-${(hash % 5) + 1}`;
    };

    return (
        <div className="matchmaking-container">
            <h2>✨ People You Might Connect With</h2>

            {matches.length === 0 ? (
                <p className="no-matches">No matches yet. Try updating your interests!</p>
            ) : (
                <div className="match-list">
                    {matches.map((user) => {
                        const gradientClass = getStableGradient(user.id); // or use random:
                        // const gradientClass = `gradient-${Math.floor(Math.random() * 5) + 1}`;

                        return (
                            <div key={user.id} className={`match-card ${gradientClass}`}>
                                <div className="match-name">{user.name}</div>
                                <div className="match-meta">{user.institution || 'No Institution'}</div>
                                <p className="match-bio">{user.bio}</p>
                                <div className="match-interests">
                                    {user.shared_interests.map((interest, i) => (
                                        <span key={i} className="interest-chip">{interest}</span>
                                    ))}
                                </div>
                                <button
                                    className="match-button"
                                    onClick={() => handleSendMatchRequest(user.id)}
                                >
                                    Match
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Matchmaking;
