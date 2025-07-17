import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import '../styles/profile.css';

export default function ProfilePage() {
    const { user } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setForm({ ...form, name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords don't match.");
            return;
        }

        try {
            await api.post('/me/update', {
                name: form.name,
                email: form.email,
                password: form.password || undefined,
            });
            setMessage('Profile updated successfully!');
        } catch (err) {
            setMessage('Update failed.');
        }
    };

    return (
        <div className="profile-glass-bg">
            <div className="profile-card">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                    <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password" />
                    <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />

                    <button type="submit">Save Changes</button>
                    {message && <p className="profile-msg">{message}</p>}
                </form>
            </div>

            <div className="live-preview-card">
                <h3>Live Preview</h3>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
            </div>
        </div>
    );
}
