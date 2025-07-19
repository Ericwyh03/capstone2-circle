// import React from 'react';
// import useAuth from '../hooks/useAuth';
// import '../styles/profilepage.css';
//
//
// const ProfilePage = () => {
//     const { user } = useAuth();
//
//     return (
//         <div className="profile-container">
//             <div className="profile-header">
//                 <div className="cover-photo" />
//                 <div className="profile-info">
//                     <img src={user?.avatar || '/default-avatar.png'} alt="Profile" className="profile-avatar" />
//                     <div>
//                         <h2>{user?.name || 'Unnamed User'}</h2>
//                         <p>{user?.institution?.name || 'No Institution'}</p>
//                         <button className="edit-button">✏️ Edit Profile</button>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="profile-body">
//                 <div className="profile-card">
//                     <h3>📄 Basic Info</h3>
//                     <p><strong>Email:</strong> {user?.email || '-'}</p>
//                     <p><strong>Joined:</strong> {new Date(user?.created_at).toLocaleDateString() || '-'}</p>
//                 </div>
//
//                 <div className="profile-card">
//                     <h3>📊 Quick Stats</h3>
//                     <p><strong>Connections:</strong> {user?.connections || 0}</p>
//                     <p><strong>Events Joined:</strong> {user?.events || 0}</p>
//                     <p><strong>Mentorships:</strong> {user?.mentorships || 0}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProfilePage;
// src/pages/ProfilePage.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import '../styles/profilepage.css';
//
// function ProfilePage() {
//     const [user, setUser] = useState(null);
//     const [name, setName] = useState('');
//     const [bio, setBio] = useState('');
//     const [institutionSearch, setInstitutionSearch] = useState('');
//     const [institutionList, setInstitutionList] = useState([]);
//     const [selectedInstitutionId, setSelectedInstitutionId] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [stats, setStats] = useState({ connections: 0, events: 0, mentorships: 0 });
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const res = await api.get('/profile');
//                 const { user, stats } = res.data;
//                 setUser(user);
//                 setName(user.name);
//                 setBio(user.bio || '');
//                 setSelectedInstitutionId(user.institution_id || '');
//                 setEmail(user.email);
//                 setStats(stats);
//             } catch (error) {
//                 console.error('Failed to load profile:', error);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     useEffect(() => {
//         if (institutionSearch.trim() === '') {
//             setInstitutionList([]);
//             return;
//         }
//
//         const fetchInstitutions = async () => {
//             try {
//                 const res = await api.get(`/institutions/search?query=${institutionSearch}`);
//                 setInstitutionList(res.data);
//             } catch (err) {
//                 console.error('Error fetching institutions', err);
//             }
//         };
//
//         fetchInstitutions();
//     }, [institutionSearch]);
//
//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await api.put('/profile/update', {
//                 name,
//                 bio,
//                 institution_id: selectedInstitutionId || null
//             });
//             alert('Profile updated!');
//         } catch (err) {
//             console.error('Error updating profile:', err);
//         }
//     };
//
//     const handleAuthUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await api.put('/profile/update-auth', {
//                 email,
//                 password
//             });
//             alert('Credentials updated!');
//             setPassword('');
//         } catch (err) {
//             console.error('Error updating credentials:', err);
//         }
//     };
//
//     if (!user) return <div>Loading...</div>;
//
//     return (
//         <div className="profile-container">
//             <div className="profile-card">
//                 <h2>Welcome, {user.name}</h2>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Institution:</strong> {user.institution?.name || 'No current institution'}</p>
//                 <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
//
//                 <div className="stats">
//                     <div>Connections: {stats.connections}</div>
//                     <div>Events Joined: {stats.events}</div>
//                     <div>Mentorships: {stats.mentorships}</div>
//                 </div>
//
//                 <h3>Edit Profile</h3>
//                 <form onSubmit={handleProfileUpdate}>
//                     <label>Name</label>
//                     <input value={name} onChange={(e) => setName(e.target.value)} required />
//
//                     <label>Bio</label>
//                     <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
//
//                     <label>Search Institution</label>
//                     <input
//                         type="text"
//                         placeholder="Search institution..."
//                         value={institutionSearch}
//                         onChange={(e) => setInstitutionSearch(e.target.value)}
//                     />
//
//                     {institutionList.length > 0 && (
//                         <select
//                             value={selectedInstitutionId}
//                             onChange={(e) => setSelectedInstitutionId(e.target.value)}
//                         >
//                             <option value="">Select an institution</option>
//                             {institutionList.map(inst => (
//                                 <option key={inst.id} value={inst.id}>{inst.name}</option>
//                             ))}
//                         </select>
//                     )}
//
//                     <button type="submit">Save Profile</button>
//                 </form>
//
//                 <h3>Update Login Credentials</h3>
//                 <form onSubmit={handleAuthUpdate}>
//                     <label>Email</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//
//                     <label>New Password (optional)</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Leave blank to keep current password"
//                     />
//
//                     <button type="submit">Update Credentials</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
//
// export default ProfilePage;
// src/pages/ProfilePage.jsx
// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import '../styles/profilepage.css';
import useAuth from '../hooks/useAuth';
import api from '../api/axios';

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
            await api.put('/profile/credentials', {
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
                <h2>👋 Welcome, {profileData.name}</h2>
                <p>Email: {profileData.email}</p>
            </div>

            <div className="profile-main-grid">
                <div className="profile-section profile-info-card">
                    <h3>Institution:</h3>
                    <p>{profileData.institution?.name || 'No institution registered'}</p>

                    <h3>Bio:</h3>
                    <p>{profileData.bio || 'No bio yet'}</p>
                </div>

                <div className="profile-section stats-card">
                    <h3>📊 Quick Stats</h3>
                    <p>🧑‍🤝‍🧑 Connections: {profileData.connections}</p>
                    <p>📅 Events Joined: {profileData.events}</p>
                    <p>🎓 Mentorships: {profileData.mentorships}</p>
                </div>
            </div>

            <div className="profile-form-grid">
                <div className="profile-section edit-profile-card">
                    <h3>📝 Edit Profile</h3>
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

                    <button onClick={handleProfileSave}>💾 Save Profile</button>
                </div>

                <div className="profile-section update-credentials-card">
                    <h3>🔐 Update Login Credentials</h3>
                    <label>Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <label>New Password (optional)</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <button onClick={handleCredentialUpdate}>🔐 Update Credentials</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
