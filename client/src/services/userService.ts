import { API_URL } from '../config/api'
import type { User } from '../../../shared/types/User'

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/api/users`)

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function addUser(userName: string) {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      UserName: userName
    })
  })

  if (!response.ok) {
    throw new Error('Failed to add user')
  }

  return response.json()
}

export async function deleteUser(userId: number) {
  const response = await fetch(`${API_URL}/api/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      UserID: userId
    })
  })

  if (!response.ok) {
    throw new Error('Failed to delete user')
  }

  return response.json()
}