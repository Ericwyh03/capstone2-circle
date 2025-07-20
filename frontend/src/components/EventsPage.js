// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import '../styles/event.css';
// import bannerImg from '../assets/bg-events.png';
// import { useNavigate } from 'react-router-dom';
//
//
// const EventsPage = () => {
//     const [events, setEvents] = useState([]);
//     const [userId, setUserId] = useState(null);
//     const navigate = useNavigate();
//
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Get current user ID
//                 const profile = await axios.get('/me', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setUserId(profile.data.id);
//
//                 // Get events
//                 const eventsRes = await axios.get('/events', {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setEvents(eventsRes.data);
//             } catch (err) {
//                 console.error('Error fetching events or user info:', err);
//             }
//         };
//         fetchData();
//     }, []);
//
//     const handleJoin = async (eventId) => {
//         try {
//             await axios.post(`/events/${eventId}/join`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//
//             // Refresh events
//             const updated = await axios.get('/events', {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setEvents(updated.data);
//         } catch (err) {
//             alert(err.response?.data?.message || "Failed to join.");
//         }
//     };
//
//     return (
//         <div className="dashboard">
//             <div
//                 className="full-bg-banner"
//                 style={{backgroundImage: `url(${bannerImg})`}}
//             >
//                 <div className="welcome-overlay">
//                     <h2>Upcoming Events</h2>
//                     <p>Find events that interest you and join the fun!</p>
//                 </div>
//             </div>
//
//             <div className="events-header">
//                 <h2 className="subheading">All Events</h2>
//                 <button className="create-event-button" onClick={() => navigate('/create-event')}>
//                     + Create Event
//                 </button>
//             </div>
//
//
//             <div className="event-list">
//                 {events.length === 0 ? (
//                     <p>No events to show right now.</p>
//                 ) : (
//                     events.map((event) => {
//                         const alreadyJoined = event.attendees?.some(u => u.id === userId);
//                         const isCreator = event.creator_id === userId;
//
//                         // Use event.color if it exists and is in the allowed list, else assign one randomly
//                         const allowedColors = ['blue', 'green', 'pink', 'purple', 'grey'];
//                         const colorClass = allowedColors.includes(event.color)
//                             ? event.color
//                             : allowedColors[event.id % allowedColors.length]; // consistent fallback
//
//                         return (
//                             <div key={event.id} className={`event-card tile ${colorClass}`}>
//                                 <h3>{event.name}</h3>
//                                 <p><strong>Date:</strong> {event.start_time}</p>
//                                 <p><strong>Location:</strong> {event.location}</p>
//                                 <p>{event.description}</p>
//                                 <p className={`privacy-tag ${event.privacy}`}>
//                                     Privacy: {event.privacy.charAt(0).toUpperCase() + event.privacy.slice(1)}
//                                 </p>
//
//                                 {isCreator ? (
//                                     <p className="joined-label">👑 You created this</p>
//                                 ) : alreadyJoined ? (
//                                     <p className="joined-label">✅ You're attending</p>
//                                 ) : (
//                                     <button className="join-btn" onClick={() => handleJoin(event.id)}>
//                                         Join Event
//                                     </button>
//                                 )}
//                             </div>
//                         );
//                     })
//
//                     // events.map((event) => {
//                     //     const alreadyJoined = event.attendees?.some(u => u.id === userId);
//                     //     const isCreator = event.creator_id === userId;
//                     //
//                     //     return (
//                     //         <div key={event.id} className="event-card tile">
//                     //             <h3>{event.name}</h3>
//                     //             <p><strong>Date:</strong> {event.start_time}</p>
//                     //             <p><strong>Location:</strong> {event.location}</p>
//                     //             <p>{event.description}</p>
//                     //             <p className={`privacy-tag ${event.privacy}`}>
//                     //                 Privacy: {event.privacy.charAt(0).toUpperCase() + event.privacy.slice(1)}
//                     //             </p>
//                     //
//                     //             {isCreator ? (
//                     //                 <p className="joined-label">👑 You created this</p>
//                     //             ) : alreadyJoined ? (
//                     //                 <p className="joined-label">✅ You're attending</p>
//                     //             ) : (
//                     //                 <button className="join-btn" onClick={() => handleJoin(event.id)}>
//                     //                     Join Event
//                     //                 </button>
//                     //             )}
//                     //         </div>
//                     //     );
//                     // })
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default EventsPage;
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/event.css';
import bannerImg from '../assets/bg-events.png';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const [newEvent, setNewEvent] = useState({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        privacy: 'public',
        color: 'blue', // ✅ add default color
    });


    const fetchEvents = async () => {
        const res = await axios.get('/events', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEvents(res.data);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await axios.get('/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserId(profile.data.id);
                await fetchEvents();
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
            await fetchEvents();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to join.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/events', newEvent, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setShowCreateForm(false);
            setNewEvent({ name: '', description: '', start_time: '', end_time: '', location: '', color: 'blue', privacy: 'public' });
            await fetchEvents();
        } catch (err) {
            alert('Failed to create event.');
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

            <div className="events-header">
                <h2 className="subheading">All Events</h2>
                <button className="create-event-button" onClick={() => setShowCreateForm(prev => !prev)}>
                    {showCreateForm ? "Close Form" : "+ Create Event"}
                </button>
            </div>

            {showCreateForm && (
                <form className="create-event-form" onSubmit={handleCreate}>
                    <h3 className="form-title">📅 Create New Event</h3>

                    <div className="form-group">
                        <label>📌 Title</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Study Jam: Web Dev"
                            value={newEvent.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>📍 Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Library Room A"
                            value={newEvent.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>🕒 Start Time</label>
                        <input
                            type="datetime-local"
                            name="start_time"
                            value={newEvent.start_time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>🕓 End Time</label>
                        <input
                            type="datetime-local"
                            name="end_time"
                            value={newEvent.end_time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>📝 Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe your event and what to expect..."
                            value={newEvent.description}
                            onChange={handleInputChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>🎨 Color</label>
                        <select name="color" value={newEvent.color} onChange={handleInputChange}>
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                            <option value="grey">Grey</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>🔐 Privacy</label>
                        <select name="privacy" value={newEvent.privacy} onChange={handleInputChange}>
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                        </select>
                    </div>

                    <button className="submit-btn" type="submit">🚀 Create Event</button>
                </form>
            )}



            <div className="event-list">
                {events.length === 0 ? (
                    <p>No events to show right now.</p>
                ) : (
                    events.map((event) => {
                        const alreadyJoined = event.attendees?.some(u => u.id === userId);
                        const isCreator = event.creator_id === userId;
                        const allowedColors = ['blue', 'green', 'pink', 'purple', 'grey'];
                        const colorClass = allowedColors.includes(event.color)
                            ? event.color
                            : allowedColors[event.id % allowedColors.length];

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
                )}
            </div>
        </div>
    );
};

export default EventsPage;
