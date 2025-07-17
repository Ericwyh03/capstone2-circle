import { useState, useCallback, useEffect } from 'react';
import api from '../api/axios';

export default function useAuth() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user') || 'null')
    );

    const login = useCallback(async (email, password) => {
        const res = await api.post('/login', { email, password });
        localStorage.setItem('token', res.data.token);

        const { data } = await api.get('/me');
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    }, []);

    const register = useCallback(async (name, email, password) => {
        const res = await api.post('/register', { name, email, password });
        localStorage.setItem('token', res.data.token);

        const { data } = await api.get('/me');
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    }, []);

    const logout = useCallback(async () => {
        try { await api.post('/logout'); } catch (_) {}
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            if (token && !user) {
                try {
                    const { data } = await api.get('/me');
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } catch {
                    logout();
                }
            }
        })();
    }, []);

    return { user, login, register, logout };
}
