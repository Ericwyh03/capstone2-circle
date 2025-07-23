import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/mentor.css';
import bannerImg from '../assets/bg-mentor.png';
import { FaUserPlus, FaCheck, FaLightbulb } from 'react-icons/fa';
import { MdClose, MdSchool } from 'react-icons/md';
import { BiSolidUserVoice } from 'react-icons/bi';

const MentorshipPage = () => {
    const [mentors, setMentors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        club: '',
        mentoring_areas: '',
    });

    const fetchMentors = async () => {
        try {
            const res = await axios.get('/mentors');
            setMentors(res.data);
        } catch (err) {
            console.error("Failed to load mentors:", err);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/mentors', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setFormData({ club: '', mentoring_areas: '' });
            setShowForm(false);
            fetchMentors();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to volunteer.");
        }
    };
    const handleSendMentorRequest = async (mentorId) => {
        try {
            await axios.post('/mentor-request/sendRequest', { mentor_id: mentorId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Mentor request sent!');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to send mentor request.');
        }
    };

    const colors = ['blue', 'green', 'pink', 'purple', 'default'];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="dashboard">
            <div
                className="full-bg-banner"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="welcome-overlay-mentor">
                    <h2>Peer Mentorship</h2>
                    <p>Volunteer to mentor or find someone to guide you 🌱</p>
                </div>
                <div className="sparkle-container"> {/* You can reuse sparkle-container or make a new one */}
                    {Array.from({ length: 15 }).map((_, i) => ( // Render about 15-20 flakes
                        <div key={i} className="hexagon-flake"></div>))}</div>
            </div>

            <div className="events-header">
                <h2 className="subheading">Mentors</h2>
                <button
                    className="create-event-button"
                    onClick={() => setShowForm(prev => !prev)}
                >
                    {showForm ? (
                        <>
                            <MdClose style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Close Form
                        </>
                    ) : (
                        <>
                            <FaUserPlus style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Become a Mentor
                        </>
                    )}
                </button>
            </div>

            {showForm && (
                <form className="create-event-form" onSubmit={handleSubmit}>
                    <h3 className="form-title"><BiSolidUserVoice style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Volunteer as Mentor</h3>

                    <div className="form-group">
                        <label> <MdSchool style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Club Affiliation (optional)</label>
                        <input
                            type="text"
                            name="club"
                            value={formData.club}
                            onChange={handleInputChange}
                            placeholder="e.g. IEEE Student Chapter"
                        />
                    </div>

                    <div className="form-group">
                        <label> <FaLightbulb style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Mentoring Topics</label>
                        <textarea
                            name="mentoring_areas"
                            value={formData.mentoring_areas}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="e.g. Python basics, resume review, event organizing..."
                            required
                        />
                    </div>

                    <button className="submit-btn" type="submit"><FaCheck style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Submit</button>
                </form>
            )}

            <div className="mentor-list">
                {mentors.length === 0 ? (
                    <p>No mentors listed yet.</p>
                ) : (
                    <div className="mentor-cards">
                        {mentors.map((mentor, index) => (
                            <div key={mentor.id} className={`mentor-card ${getRandomColor()}`}>
                                <h3>{mentor.user.name}</h3>
                                <p><strong>Expertise:</strong> {mentor.expertise}</p>
                                <p><strong>Institution:</strong> {mentor.institution?.name || 'No institution'}</p>
                                <p><strong>Club:</strong> {mentor.club?.name || 'No club'}</p>

                                <button
                                    className="mentor-button"
                                    onClick={() => handleSendMentorRequest(mentor.id)}
                                >
                                    Request Mentor
                                </button>

                                {index !== mentors.length - 1 && <hr />}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorshipPage;
