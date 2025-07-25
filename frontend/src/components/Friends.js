import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import '../styles/friends.css'; // create this file if not existing

function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        api.get('/friends')
            .then(response => setFriends(response.data))
            .catch(error => console.error('Error fetching friends:', error));
    }, []);

    return (
        <div className="friends-page">
            <h2 className="friends-heading">👥 Your Circle</h2>
            {friends.length === 0 ? (
                <p className="no-friends">No confirmed matches yet. Start matching to grow your circle!</p>
            ) : (
                <div className="friends-grid">
                    {friends.map(friend => (
                        <div className="friend-card">
                            <div className="friend-avatar">
                                {friend.name?.[0] || "?"}
                            </div>
                            <div className="friend-info">
                                <strong>{friend.name}</strong>
                                <p title={friend.email}>{friend.email}</p>

                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}

export default Friends;
