import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button'
import type { User } from '@shared/types/User'

function Data() {
  const [users, setUsers] = useState<User[]>([])
  const [newUserName, setNewUserName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const getInfo = async () => {
    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/users')
      if (!res.ok) throw new Error()

      const result: User[] = await res.json()
      setUsers(result)

    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: number) => {
    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserID: id })
      })

      if (!res.ok) throw new Error()
      getInfo()

    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async () => {
    if (!newUserName.trim()) return

    setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: newUserName })
      })

      if (!res.ok) throw new Error()

      setNewUserName('')
      getInfo()

    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center' }}>
        {loading && <p>Loading...</p>}

        {users.map(user => (
          <div key={user.UserID}>
            <p>
              ID: {user.UserID} | {user.UserName}
              <Button onClick={() => deleteUser(user.UserID)} variant="danger">
                Delete
              </Button>
            </p>
          </div>
        ))}

        <input
          value={newUserName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewUserName(e.target.value)
          }
          placeholder="New User"
        />

        <br /><br />

        {error && <p style={{ color: 'red' }}>Error!</p>}

        <Button onClick={getInfo} variant="info">
          Get Data
        </Button>

        <Button onClick={addUser} variant="success">
          Add User
        </Button>
      </div>
    </div>
  )
}

export default Data