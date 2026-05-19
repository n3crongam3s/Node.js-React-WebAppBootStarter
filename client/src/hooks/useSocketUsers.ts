import { useEffect, useState } from 'react'
import { socket } from '../services/socket'
import { API_URL } from '../config/api'
import type { User } from '../../../shared/types/User'

export function useSocketUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [userEditing, setUserEditing] = useState<number | null>(null)

  const getUsers = async () => {
    setLoading(true)
    setError(false)

    try {
      const response = await fetch(`${API_URL}/api/users`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = (await response.json()) as User[]
      setUsers(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (userName: string) => {
    if (!userName.trim()) return

    setError(false)
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: userName })
      })

      if (!response.ok) throw new Error('Failed to add user')

      const payload = await response.json()
      if (payload.user) {
        setUsers(prev => {
          if (prev.some(item => item.UserID === payload.user.UserID)) return prev
          return [...prev, payload.user]
        })
        setUserEditing(null)
      }
    } catch {
      setError(true)
    }
  }

  const updateUser = async (userId: number, userName: string) => {
    if (!userName.trim()) return

    setError(false)
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserID: userId, UserName: userName })
      })

      if (!response.ok) throw new Error('Failed to update user')

      const payload = await response.json()
      if (payload.user) {
        setUsers(prev => {
          if (prev.some(item => item.UserID === payload.user.UserID)) return prev
          return [...prev, payload.user]
        })
        setUserEditing(null)
      }
    } catch {
      setError(true)
    }
  }

  const deleteUser = async (userId: number) => {
    setError(false)
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserID: userId })
      })

      if (!response.ok) throw new Error('Failed to delete user')

      setUsers(prev => prev.filter(item => item.UserID !== userId))
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    const handleNewUser = (user: User) => {
      setUsers(prev => {
        if (prev.some(item => item.UserID === user.UserID)) return prev
        return [...prev, user]
      })
    }

    const handleDeleteUser = (userId: number) => {
      setUsers(prev => prev.filter(item => item.UserID !== userId))
    }

    const handleUpdateUser = (updatedUser: User) => {
      setUsers(prev => prev.map(user => user.UserID === updatedUser.UserID ? updatedUser : user))
    }

    socket.on('newUser', handleNewUser)
    socket.on('deleteUser', handleDeleteUser)
    socket.on('updateUser', handleUpdateUser)

    return () => {
      socket.off('newUser', handleNewUser)
      socket.off('deleteUser', handleDeleteUser)
      socket.off('updateUser', handleUpdateUser)
    }
  }, [])

  return {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    updateUser,
    refresh: getUsers,
    userEditing,
    setUserEditing
  }
}
