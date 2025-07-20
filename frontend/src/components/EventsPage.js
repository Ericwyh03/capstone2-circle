// src/pages/EventsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/event.css'; // optional if you plan to split styles
import bannerImg from '../assets/bg-events.png';

const EventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/events', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => setEvents(response.data))
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className="dashboard">
            <div
                className="full-bg-banner"
                style={{backgroundImage: `url(${bannerImg})`}}
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
                    events.map((event) => (
                        <div key={event.id} className="event-card tile">
                            <h3>{event.name}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p>{event.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventsPage;
