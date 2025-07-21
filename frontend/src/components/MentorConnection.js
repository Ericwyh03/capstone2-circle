import React, { useEffect, useState } from 'react';
import api from '../api/axios';

function MentorConnections() {
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        api.get('/mentor-requests/mentorshipConnections', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => setConnections(response.data))
            .catch(error => console.error('Error fetching mentor connections:', error));
    }, []);

    return (
        <div className="friends-page">
            <h2>🎓 Your Mentors</h2>
            {connections.length === 0 ? (
                <p>No confirmed mentorships yet.</p>
            ) : (
                <ul className="friend-list">
                    {connections.map(user => (
                        <li key={user.id} className="friend-card">
                            <strong>{user.name}</strong>
                            <p>{user.email}</p>
                            {user.institution?.name && (
                                <p><strong>Institution:</strong> {user.institution.name}</p>
                            )}
                            {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MentorConnections;
