import { useState, type ChangeEvent } from 'react'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button'
import { useSocketUsers } from '../hooks/useSocketUsers'

function Data() {
  const {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    refresh
  } = useSocketUsers()
  const [newUserName, setNewUserName] = useState('')

  const handleAddUser = async () => {
    if (!newUserName.trim()) return

    await addUser(newUserName)
    setNewUserName('')
  }

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
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

              <Button
                onClick={() => handleDeleteUser(user.UserID)}
                variant="danger"
              >
                Delete
              </Button>
            </p>
          </div>
        ))}

        <br />
        
        <input
          value={newUserName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewUserName(e.target.value)
          }
          placeholder="New User"
        />

        <br />

        {error && (
          <p style={{ color: 'red' }}>
            Error!
          </p>
        )}

        {/* <Button
          onClick={refresh}
          variant="info"
        >
          Refresh Data
        </Button> */}

        <Button
          onClick={handleAddUser}
          variant="success"
        >
          Add User
        </Button>
      </div>
    </div>
  )
}

export default Data