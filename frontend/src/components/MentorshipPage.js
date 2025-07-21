// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import '../styles/mentor.css';
// import bannerImg from '../assets/bg-mentor.png';
// import { FaUserPlus } from 'react-icons/fa';
// import { MdClose } from 'react-icons/md';
//
// const MentorshipPage = () => {
//     const [mentors, setMentors] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         club: '',
//         mentoring_areas: '',
//     });
//
//     const fetchMentors = async () => {
//         try {
//             const res = await axios.get('/mentors');
//             setMentors(res.data);
//         } catch (err) {
//             console.error("Failed to load mentors:", err);
//         }
//     };
//
//     useEffect(() => {
//         fetchMentors();
//     }, []);
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };
//
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/mentors', formData, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setFormData({ club: '', mentoring_areas: '' });
//             setShowForm(false);
//             fetchMentors();
//         } catch (err) {
//             alert(err.response?.data?.message || "Failed to volunteer.");
//         }
//     };
//
//     return (
//         <div className="dashboard">
//             <div
//                 className="full-bg-banner"
//                 style={{ backgroundImage: `url(${bannerImg})` }}
//             >
//                 <div className="welcome-overlay">
//                     <h2>Peer Mentorship</h2>
//                     <p>Volunteer to mentor or find someone to guide you 🌱</p>
//                 </div>
//             </div>
//
//             <div className="events-header">
//                 <h2 className="subheading">Mentors</h2>
//                 <button
//                     className="create-event-button"
//                     onClick={() => setShowForm(prev => !prev)}
//                 >
//                     {showForm ? (
//                         <>
//                             <MdClose style={{ verticalAlign: 'middle', marginRight: '6px' }} />
//                             Close Form
//                         </>
//                     ) : (
//                         <>
//                             <FaUserPlus style={{ verticalAlign: 'middle', marginRight: '6px' }} />
//                             Become a Mentor
//                         </>
//                     )}
//                 </button>
//             </div>
//
//             {showForm && (
//                 <form className="create-event-form" onSubmit={handleSubmit}>
//                     <h3 className="form-title">🙋 Volunteer as Mentor</h3>
//
//                     <div className="form-group">
//                         <label>🎓 Club Affiliation (optional)</label>
//                         <input
//                             type="text"
//                             name="club"
//                             value={formData.club}
//                             onChange={handleInputChange}
//                             placeholder="e.g. IEEE Student Chapter"
//                         />
//                     </div>
//
//                     <div className="form-group">
//                         <label>💡 Mentoring Topics</label>
//                         <textarea
//                             name="mentoring_areas"
//                             value={formData.mentoring_areas}
//                             onChange={handleInputChange}
//                             rows={4}
//                             placeholder="e.g. Python basics, resume review, event organizing..."
//                             required
//                         />
//                     </div>
//
//                     <button className="submit-btn" type="submit">✅ Submit</button>
//                 </form>
//             )}
//
//             <div className="mentor-list">
//                 {mentors.length === 0 ? (
//                     <p>No mentors listed yet.</p>
//                 ) : (
//                     <div className="mentor-cards">
//                         {mentors.map((mentor) => (
//                             <div className="mentor-card tile" key={mentor.id}>
//                                 <h3>{mentor.user.name}</h3>
//                                 <p><strong>Institution:</strong> {mentor.institution?.name || 'N/A'}</p>
//                                 {mentor.club && <p><strong>Club:</strong> {mentor.club}</p>}
//                                 <p><strong>Topics:</strong> {mentor.expertise}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default MentorshipPage;
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../styles/mentor.css';
import bannerImg from '../assets/bg-mentor.png';
import { FaUserPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

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

    return (
        <div className="dashboard">
            <div
                className="full-bg-banner"
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <div className="welcome-overlay">
                    <h2>Peer Mentorship</h2>
                    <p>Volunteer to mentor or find someone to guide you 🌱</p>
                </div>
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
                    <h3 className="form-title">🙋 Volunteer as Mentor</h3>

                    <div className="form-group">
                        <label>🎓 Club Affiliation (optional)</label>
                        <input
                            type="text"
                            name="club"
                            value={formData.club}
                            onChange={handleInputChange}
                            placeholder="e.g. IEEE Student Chapter"
                        />
                    </div>

                    <div className="form-group">
                        <label>💡 Mentoring Topics</label>
                        <textarea
                            name="mentoring_areas"
                            value={formData.mentoring_areas}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="e.g. Python basics, resume review, event organizing..."
                            required
                        />
                    </div>

                    <button className="submit-btn" type="submit">✅ Submit</button>
                </form>
            )}

            <div className="mentor-list">
                {mentors.length === 0 ? (
                    <p>No mentors listed yet.</p>
                ) : (
                    <div className="mentor-cards">
                        {mentors.map((mentor) => (
                            <div className="mentor-card tile" key={mentor.id}>
                                <h3>{mentor.user.name}</h3>
                                <p><strong>Institution:</strong> {mentor.institution?.name || 'N/A'}</p>
                                {mentor.club && <p><strong>Club:</strong> {mentor.club}</p>}
                                <p><strong>Topics:</strong> {mentor.expertise}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorshipPage;
