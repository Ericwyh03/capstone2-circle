import React, { useEffect, useState } from 'react';
import '../styles/profilepage.css';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';
import { FaUserFriends, FaCalendarAlt, FaGraduationCap, FaChartBar, FaSave, FaLock, FaPen } from 'react-icons/fa';
import { MdOutlineEmail, MdPassword } from 'react-icons/md';
import { HiOutlineUserCircle } from 'react-icons/hi';


const ProfilePage = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [institutionSearch, setInstitutionSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [form, setForm] = useState({
        name: '',
        bio: '',
        institution_id: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                setProfileData(response.data);
                setForm({
                    name: response.data.name,
                    bio: response.data.bio || '',
                    institution_id: response.data.institution?.id || '',
                    email: response.data.email,
                    password: ''
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleInstitutionSearch = async (e) => {
        const query = e.target.value;
        setInstitutionSearch(query);
        if (query.length > 1) {
            try {
                const response = await api.get(`/institutions/search?query=${query}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Institution search error:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleProfileSave = async () => {
        try {
            await api.put('/profile', {
                name: form.name,
                bio: form.bio,
                institution_id: form.institution_id
            });
            alert('Profile updated successfully.');
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const handleCredentialUpdate = async () => {
        try {
            await api.put('/profile/auth', {
                email: form.email,
                password: form.password
            });
            alert('Credentials updated.');
        } catch (error) {
            console.error('Credential update failed:', error);
        }
    };

    if (!profileData) return <div className="profile-loading">Loading profile...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2><HiOutlineUserCircle
                    style={{verticalAlign: 'middle', marginRight: '8px'}}/>Welcome, {profileData.name}</h2>

                <p>Email: {profileData.email}</p>
            </div>

            <div className="profile-main-grid">
                <div className="profile-section profile-info-card">
                    <h3>Institution:</h3>
                    <p>{profileData.institution || 'No institution registered'}</p>

                    <h3>Bio:</h3>
                    <p>{profileData.bio || 'No bio yet'}</p>
                </div>

                <div className="profile-section stat-box">
                    <h3>
                        <FaChartBar style={{verticalAlign: 'middle', marginRight: '6px', color: '#AEBAF8'}}/>
                        Quick Stats
                    </h3>

                    <p><FaUserFriends
                        style={{marginRight: '6px', color: '#341539'}}/>Connections: {profileData.stats?.connections}
                    </p>
                    <p><FaCalendarAlt style={{marginRight: '6px', color: '#F6EA41'}}/>Events
                        Joined: {profileData.stats?.events}</p>
                    <p><FaGraduationCap
                        style={{marginRight: '6px', color: '#FFD6E8'}}/>Mentorships: {profileData.stats?.mentorships}
                    </p>

                </div>
            </div>

            <div className="profile-form-grid">
                <div className="profile-section edit-profile-card">
                    <h3>
                        <FaPen style={{marginRight: '6px', color: '#F048C6'}}/>
                        Edit Profile
                    </h3>


                    <label>Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />

                    <label>Bio</label>
                    <textarea
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    ></textarea>

                    <label>Search Institution</label>
                    <input
                        type="text"
                        placeholder="Search institution..."
                        value={institutionSearch}
                        onChange={handleInstitutionSearch}
                    />
                    {searchResults.length > 0 && (
                        <select
                            value={form.institution_id}
                            onChange={(e) => setForm({ ...form, institution_id: e.target.value })}
                        >
                            <option value="">Select an institution</option>
                            {searchResults.map((inst) => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <button onClick={handleProfileSave}>
                        <FaSave style={{marginRight: '6px'}}/>
                        Save Profile
                    </button>


                </div>

                <div className="profile-section update-credentials-card">
                    <h3>
                        <FaLock style={{marginRight: '6px', color: '#9600FF'}}/>
                        Update Login Credentials
                    </h3>


                    <label><MdOutlineEmail style={{marginRight: '4px', color: '#9600FF'}}/>Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />

                    <label>
                        <MdPassword style={{marginRight: '4px', color: '#F048C6'}}/>
                        New Password (optional)
                    </label>

                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />

                    <button onClick={handleCredentialUpdate}>
                        <FaLock style={{marginRight: '6px'}}/>Update Credentials
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
