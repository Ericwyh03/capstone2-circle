// 📄 components/EditInterests.js
import React, { useState } from 'react';

function EditInterests() {
  // Replace this with real interests later
  const [allInterests] = useState([
    { id: 1, name: 'Gaming' },
    { id: 2, name: 'Music' },
    { id: 3, name: 'Photography' },
    { id: 4, name: 'Coding' },
    { id: 5, name: 'Art' },
  ]);

  const [selected, setSelected] = useState([]);

  const handleToggle = (id) => {
    setSelected((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const saveInterests = () => {
    alert(`(Placeholder) Saved: ${selected.length} interests selected`);
    // Later: Send to Laravel API
  };

  return (
      <div>
        <h2>Select Your Interests</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {allInterests.map((interest) => (
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
