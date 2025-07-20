import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/event.css';
import bannerImg from '../assets/bg-events.png';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get current user ID
                const profile = await axios.get('/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserId(profile.data.id);

                // Get events
                const eventsRes = await axios.get('/events', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setEvents(eventsRes.data);
            } catch (err) {
                console.error('Error fetching events or user info:', err);
            }
        };
        fetchData();
    }, []);

    const handleJoin = async (eventId) => {
        try {
            await axios.post(`/events/${eventId}/join`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            // Refresh events
            const updated = await axios.get('/events', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEvents(updated.data);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to join.");
        }
    };

    return (
        <div className="dashboard">
            <div
                className="full-bg-banner"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="welcome-overlay">
                    <h2>Upcoming Events</h2>
                    <p>Find events that interest you and join the fun!</p>
                </div>
            </div>

            <div className="event-list">
                {events.length === 0 ? (
                    <p>No events to show right now.</p>
                ) : (
                    events.map((event) => {
                        const alreadyJoined = event.attendees?.some(u => u.id === userId);
                        const isCreator = event.creator_id === userId;

                        // Use event.color if it exists and is in the allowed list, else assign one randomly
                        const allowedColors = ['blue', 'green', 'pink', 'purple', 'grey'];
                        const colorClass = allowedColors.includes(event.color)
                            ? event.color
                            : allowedColors[event.id % allowedColors.length]; // consistent fallback

                        return (
                            <div key={event.id} className={`event-card tile ${colorClass}`}>
                                <h3>{event.name}</h3>
                                <p><strong>Date:</strong> {event.start_time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p>{event.description}</p>
                                <p className={`privacy-tag ${event.privacy}`}>
                                    Privacy: {event.privacy.charAt(0).toUpperCase() + event.privacy.slice(1)}
                                </p>

                                {isCreator ? (
                                    <p className="joined-label">👑 You created this</p>
                                ) : alreadyJoined ? (
                                    <p className="joined-label">✅ You're attending</p>
                                ) : (
                                    <button className="join-btn" onClick={() => handleJoin(event.id)}>
                                        Join Event
                                    </button>
                                )}
                            </div>
                        );
                    })

                    // events.map((event) => {
                    //     const alreadyJoined = event.attendees?.some(u => u.id === userId);
                    //     const isCreator = event.creator_id === userId;
                    //
                    //     return (
                    //         <div key={event.id} className="event-card tile">
                    //             <h3>{event.name}</h3>
                    //             <p><strong>Date:</strong> {event.start_time}</p>
                    //             <p><strong>Location:</strong> {event.location}</p>
                    //             <p>{event.description}</p>
                    //             <p className={`privacy-tag ${event.privacy}`}>
                    //                 Privacy: {event.privacy.charAt(0).toUpperCase() + event.privacy.slice(1)}
                    //             </p>
                    //
                    //             {isCreator ? (
                    //                 <p className="joined-label">👑 You created this</p>
                    //             ) : alreadyJoined ? (
                    //                 <p className="joined-label">✅ You're attending</p>
                    //             ) : (
                    //                 <button className="join-btn" onClick={() => handleJoin(event.id)}>
                    //                     Join Event
                    //                 </button>
                    //             )}
                    //         </div>
                    //     );
                    // })
                )}
            </div>
        </div>
    );
};

export default EventsPage;
