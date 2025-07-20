// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import '../styles/matchmaking.css'; // Optional: style file if needed
//
// const Matchmaking = () => {
//     const [matches, setMatches] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         axios.get('/matches')
//             .then(res => {
//                 setMatches(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Failed to fetch matches:', err);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <div className="matchmaking-container">
//             <h2>🔗 Matchmaking Based on Interests</h2>
//             {loading ? (
//                 <p>Loading matches...</p>
//             ) : matches.length === 0 ? (
//                 <p>No matches found based on your current interests.</p>
//             ) : (
//                 <div className="match-list">
//                     {matches.map((match) => (
//                         <div key={match.id} className="match-card">
//                             <h3>{match.name}</h3>
//                             <p><strong>Bio:</strong> {match.bio || 'No bio yet'}</p>
//                             <p><strong>Email:</strong> {match.email}</p>
//                             <p><strong>Institution:</strong> {match.institution || 'Not listed'}</p>
//                             <p><strong>Shared Interests:</strong> {match.shared_interests.join(', ')}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Matchmaking;

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


    return (
        <div className="matchmaking-container">
            <h2>✨ People You Might Connect With</h2>

            {matches.length === 0 ? (
                <p className="no-matches">No matches yet. Try updating your interests!</p>
            ) : (
                <div className="match-list">
                    {matches.map(user => (
                        <div key={user.id} className="match-card">
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default Matchmaking;
