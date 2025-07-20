import React, { useState } from 'react';
import '../../styles/createevent.css';

function CreateEvent({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [color, setColor] = useState('blue');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, date, color })
        });

        if (response.ok) {
            alert("Event Created!");
            onClose(); // 👈 close form
        } else {
            alert("Failed to create event.");
        }
    };

    return (
        <form className="create-event-form" onSubmit={handleSubmit}>
            <h3>Create New Event</h3>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />

            <select value={color} onChange={e => setColor(e.target.value)}>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
            </select>

            <button type="submit">Create Event</button>
        </form>
    );
}

export default CreateEvent;
