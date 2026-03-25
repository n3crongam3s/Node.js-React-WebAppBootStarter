import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import Button from 'react-bootstrap/Button';

function Data() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // GET USERS
  const getInfo = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/users');

      if (!res.ok) throw new Error('Request failed');

      const result = await res.json();
      setUsers(result);

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserID: id })
      });

      if (!res.ok) throw new Error('Delete failed');

      // Refresh List
      getInfo();

    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // ADD USER
  const addUser = async () => {
    if (!newUserName.trim()) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: newUserName })
      });

      if (!res.ok) throw new Error('Insert failed');

      setNewUserName('');
      getInfo();

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

        {loading && <p>Leading...</p>}

        {users.map(item => (
          <div key={item.UserID}>
            <p>
              ID: {item.UserID} | Name: {item.UserName} | <Button onClick={() => deleteUser(item.UserID)} variant="danger">Delete</Button>
            </p>
          </div>
        ))}

        <input
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="New User"
        />

        <br /><br />

        {error && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            Erro!
          </p>
        )}

        <Button onClick={getInfo} variant="info">
          Get Data
        </Button>

        <Button onClick={addUser} variant="success">
          Add User
        </Button>
      </div>
    </div>
  );
}

export default Data;
