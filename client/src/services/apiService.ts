import { API_URL } from '../config/api'

type ApiResponse = {
  message: string
}

export async function testConnection(): Promise<ApiResponse> {
  const response = await fetch(`${API_URL}/api/hello`)

  if (!response.ok) {
    throw new Error('Request failed')
  }

  return response.json()
}