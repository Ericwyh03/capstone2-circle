import React, { useEffect, useState } from 'react';

function EditInterests({ userId }) {
  const [allInterests, setAllInterests] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
  fetch('http://localhost/circle/backend/get_all_interests.php')
    .then(res => res.json())
    .then(data => setAllInterests(data));

  fetch(`http://localhost/circle/backend/get_interests.php?user_id=${userId}`)
    .then(res => res.json())
    .then(data => setSelected(data.map(i => i.id)));
}, [userId]);

  const handleToggle = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const saveInterests = () => {
    fetch('http://localhost/circle/backend/update_interests.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, interest_ids: selected })
    })
    .then(res => res.json())
    .then(data => alert('Updated!'));
  };

  return (
    <div>
      <h2>Select Your Interests</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {allInterests.map(interest => (
          <label key={interest.id} style={{ margin: '5px' }}>
            <input
              type="checkbox"
              checked={selected.includes(interest.id)}
              onChange={() => handleToggle(interest.id)}
            />
            {interest.name}
          </label>
        ))}
      </div>
      <button onClick={saveInterests}>Save</button>
    </div>
  );
}

export default EditInterests;
