import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.js';

function usermanager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(false);
    setUsers([]);

    try {
      const res = await fetch('/api/users');

      if (!res.ok) {
        throw new Error('Request failed');
      }

      const result = await res.json();
      console.log(result);
      setUsers(result);

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center' }}>
        {loading && <p>A carregar...</p>}

        {users.length > 0 && (
          users.map(item => (
            <div key={item.UserID}>
              <p>ID: {item.UserID} Name: {item.UserName}</p>
            </div>
          ))
        )}

        {error && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Failed!
          </p>
        )}

        <button onClick={handleClick}>
          Get data
        </button>
      </div>
    </div>
  );
}

export default usermanager;
