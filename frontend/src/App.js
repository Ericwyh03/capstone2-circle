import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/circle/backend/check_session.php', {
      credentials: 'include' // Makes the browser send cookies
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser({ id: data.user_id });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Session check failed:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h3>🔄 Checking session...</h3>
    </div>
  );

  return user ? (
    <HomePage user={user} />
  ) : (
    <LoginPage onLogin={(data) => setUser({ id: data.user_id })} />
  );
}

export default App;
