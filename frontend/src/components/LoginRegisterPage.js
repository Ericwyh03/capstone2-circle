import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../styles/loginpage.css';

export default function LoginRegisterPage() {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [isRegistering, setIsRegistering] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            if (isRegistering) {
                if (!name.trim()) {
                    setError('Name is required');
                    return;
                }
                if (password !== confirmPass) {
                    setError('Passwords do not match');
                    return;
                }
                await register(name, email, password);
                navigate('/home'); // Optional: redirect immediately
            } else {
                await login(email, password);
                navigate('/home');
            }
        } catch (e) {
            const errMsg = e?.response?.data?.error || e?.response?.data?.message;
            setError(errMsg || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-glass-bg">
            <div className="glass-card">
                <h2>{isRegistering ? 'Create Account' : 'Welcome to Circle'}</h2>
                <p className="subtext">
                    {isRegistering ? 'Join the community today.' : 'Connect. Collaborate. Thrive.'}
                </p>

                {isRegistering && (
                    <input
                        type="text"
                        value={name}
                        placeholder="Full Name"
                        onChange={e => setName(e.target.value)}
                    />
                )}

                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPass(e.target.value)}
                />

                {isRegistering && (
                    <input
                        type="password"
                        value={confirmPass}
                        placeholder="Confirm Password"
                        onChange={e => setConfirmPass(e.target.value)}
                    />
                )}

                <button onClick={handleSubmit} disabled={loading}>
                    {loading
                        ? isRegistering ? 'Registering…' : 'Logging in…'
                        : isRegistering ? 'Register' : 'Login'}
                </button>

                {error && <p className="error">{error}</p>}

                <p className="toggle-link">
                    {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{' '}
                    <span onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Login' : 'Register'}
                    </span>
                </p>
            </div>
        </div>
    );
}
