import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/mentorrequest.css'; // Reuse same styling

const MentorRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('/mentor-requests/incomingRequests', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching mentor requests:', err);
                setLoading(false);
            });
    }, [token]);

    const handleRespond = async (requestId, responseStatus) => {
        try {
            await axios.post('/mentor-request/respond', {
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
            console.error(`Error responding to mentor request:`, err);
        }
    };

    return (
        <div className="match-requests-container">
            <h2>📥 Incoming Mentor Requests</h2>

            {loading ? (
                <p>Loading mentor requests...</p>
            ) : requests.length === 0 ? (
                <p>No incoming mentor requests at the moment.</p>
            ) : (
                <div className="request-list">
                    {requests.map((request) => (
                        <div key={request.id} className="request-card">
                            {request.mentee ? (
                                <>
                                    <h3>{request.mentee.name}</h3>
                                    <p><strong>Email:</strong> {request.mentee.email}</p>
                                    <p><strong>Institution:</strong> {request.mentee.institution?.name || 'Not listed'}</p>
                                    <p><strong>Bio:</strong> {request.mentee.bio || 'No bio available'}</p>
                                </>
                            ) : (
                                <p className="error-text">Sender data is missing for this request.</p>
                            )}

                            <div className="button-group">
                                <button className="accept-btn" onClick={() => handleRespond(request.id, 'accepted')}>
                                    ✅ Accept
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

export default MentorRequests;
