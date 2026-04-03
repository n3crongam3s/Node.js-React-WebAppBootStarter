import { useState } from 'react'
import Navbar from '../components/Navbar'

type User = {
  UserID: number
  UserName: string
}

function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = async () => {
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

  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center' }}>
        {loading && <p>Loading...</p>}

        {users.map(user => (
          <div key={user.UserID}>
            <p>{user.UserID} - {user.UserName}</p>
          </div>
        ))}

        {error && <p style={{ color: 'red' }}>Error!</p>}

        <button onClick={handleClick}>Get Data</button>
      </div>
    </div>
  )
}

export default UserManager