import { useState, type ChangeEvent } from 'react'
import Navbar from '../components/Navbar'
import Button from 'react-bootstrap/Button'
import { useSocketUsers } from '../hooks/useSocketUsers'
import { CiTrash } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";

function Data() {
  const {
    userEditing,
    users,
    loading,
    error,
    addUser,
    deleteUser,
    updateUser,
    setUserEditing
  } = useSocketUsers()
  const [newUserName, setNewUserName] = useState('')
  const [editingUserName, setEditingUserName] = useState('')

  const handleAddUser = async () => {
    if (!newUserName.trim()) return

    await addUser(newUserName)
    setNewUserName('')
  }

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id)
  }

  const handleUpdateUser = async (id: number, userName: string) => {
    await updateUser(id, userName)
  }

  return (
    <div>
      <Navbar />

      <div style={{ textAlign: 'center' }}>
        {loading && <p>Loading...</p>}

        {users.map(user => (
          <div key={user.UserID}>
            <p>
              ID: {user.UserID} |               
              {userEditing === user.UserID ? (
                <> User: 
                  <input
                    value={editingUserName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEditingUserName(e.target.value)
                    }
                    placeholder={user.UserName}
                  /> <> </>
                </>
              ) : (
                <>User: {user.UserName} </>
              )}

              <Button
                onClick={() => handleDeleteUser(user.UserID)}
                variant="danger"
              >
                <CiTrash />
              </Button> <></>
              <Button
                onClick={() => {
                  { if (userEditing === user.UserID) {
                      setUserEditing(null)
                      return
                    }}
                  setUserEditing(user.UserID)
                  setEditingUserName(user.UserName)
                }}
                variant="warning"
              >
                <CiSettings />
              </Button> <> </>
              {userEditing === user.UserID && (
                <Button
                  onClick={() => handleUpdateUser(user.UserID, editingUserName)}
                  variant="success"
                >
                  <CiCircleCheck />
                </Button>
              )}
            </p>
            <hr />
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
          <CiCirclePlus /> Add User
        </Button>
      </div>
    </div>
  )
}

export default Data