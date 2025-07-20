import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        api.get('/friends')
            .then(response => setFriends(response.data))
            .catch(error => console.error('Error fetching friends:', error));
    }, []);

    return (
        <div className="friends-page">
            <h2>👥 Your Friends</h2>
            {friends.length === 0 ? (
                <p>No confirmed matches yet.</p>
            ) : (
                <ul className="friend-list">
                    {friends.map(friend => (
                        <li key={friend.id} className="friend-card">
                            <strong>{friend.name}</strong>
                            <p>{friend.email}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Friends;
