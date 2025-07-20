// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import '../styles/matchrequest.css'; // Optional: create this file for styling
//
// const MatchRequests = () => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         axios.get('/match-requests/incoming')
//             .then(res => {
//                 setRequests(res.data);
//                 setLoading(false);
//             })
//             .catch(err => {
//                 console.error('Error fetching match requests:', err);
//                 setLoading(false);
//             });
//     }, []);
//
//     return (
//         <div className="match-requests-container">
//             <h2>📥 Incoming Match Requests</h2>
//
//             {loading ? (
//                 <p>Loading match requests...</p>
//             ) : requests.length === 0 ? (
//                 <p>No incoming match requests at the moment.</p>
//             ) : (
//                 <div className="request-list">
//                     {requests.map((request) => (
//                         <div key={request.id} className="request-card">
//                             <h3>{request.sender.name}</h3>
//                             <p><strong>Email:</strong> {request.sender.email}</p>
//                             <p><strong>Institution:</strong> {request.sender.institution?.name || 'Not listed'}</p>
//                             <p><strong>Bio:</strong> {request.sender.bio || 'No bio available'}</p>
//                             {/* (Optional) Buttons for Accept/Reject */}
//
//                             <button onClick={() => handleRespond(request.id, 'accepted')}>Accept</button>
//                             <button onClick={() => handleRespond(request.id, 'rejected')}>Reject</button>
//
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default MatchRequests;


//
// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
//
// function MatchFriends() {
//     const [requests, setRequests] = useState([]);
//     const token = localStorage.getItem('token');
//
//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const res = await api.get('/match-requests/incoming', {
//
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//
//                 setRequests(res.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchRequests();
//     }, [token]);
//
//     const acceptMatch = async (requestId) => {
//         try {
//             // await api.post(`/match-requests/accept/${requestId}`, null, {
//             //     headers: { Authorization: `Bearer ${token}` },
//             // });
//             await api.post('/match-request/respond', {
//                 request_id: requestId,
//                 action: 'accepted',
//             }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//
//             setRequests((prev) =>
//                 prev.filter((r) => r.id !== requestId)
//             );
//         } catch (err) {
//             console.error(err);
//         }
//     };
//
//     return (
//         <div className="match-friends-page">
//             <h2>📥 Match Requests</h2>
//             {requests.length === 0 ? (
//                 <p>No pending requests.</p>
//             ) : (
//                 requests.map((r) => (
//                     <div className="match-card" key={r.id}>
//                         <p><strong>{r.sender?.name}</strong> from <em>{r.sender?.institution?.name}</em></p>
//                         <button onClick={() => acceptMatch(r.id)}>🤝 Match</button>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }
//
// export default MatchFriends;

// src/pages/MatchRequests.js

import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/matchrequest.css'; // Keep using your current styling

const MatchRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('/match-requests/incoming', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching match requests:', err);
                setLoading(false);
            });
    }, [token]);

    const handleRespond = async (requestId, responseStatus) => {
        try {
            await axios.post('/match-request/respond', {
                request_id: requestId,
                status: responseStatus
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Remove the responded request from UI
            setRequests(prev => prev.filter(r => r.id !== requestId));
        } catch (err) {
            console.error(`Error responding to match request:`, err);
        }
    };

    return (
        <div className="match-requests-container">
            <h2>📥 Incoming Match Requests</h2>

            {loading ? (
                <p>Loading match requests...</p>
            ) : requests.length === 0 ? (
                <p>No incoming match requests at the moment.</p>
            ) : (
                <div className="request-list">
                    {requests.map((request) => (
                        <div key={request.id} className="request-card">
                            <h3>{request.sender.name}</h3>
                            <p><strong>Email:</strong> {request.sender.email}</p>
                            <p><strong>Institution:</strong> {request.sender.institution?.name || 'Not listed'}</p>
                            <p><strong>Bio:</strong> {request.sender.bio || 'No bio available'}</p>

                            <div className="button-group">
                                <button className="accept-btn" onClick={() => handleRespond(request.id, 'accepted')}>
                                    🤝 Accept
                                </button>
                                <button className="reject-btn" onClick={() => handleRespond(request.id, 'rejected')}>
                                    ❌ Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchRequests;
