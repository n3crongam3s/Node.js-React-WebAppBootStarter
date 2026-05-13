import React, { useState } from 'react'
import './components.css'

import { testConnection } from '../services/apiService'

type ApiResponse = {
  message: string
}

const Button: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    setError(false)
    setData(null)

    try {
      const result = await testConnection()
      setData(result)

    } catch (err) {
      console.error(err)
      setError(true)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <p>Loading...</p>}

      {data?.message && (
        <p
          style={{
            color: 'green',
            fontWeight: 'bold'
          }}
        >
          {data.message}
        </p>
      )}

      {error && (
        <p
          style={{
            color: 'red',
            fontWeight: 'bold'
          }}
        >
          Failed!
        </p>
      )}

      <br />

      <button onClick={handleClick}>
        Test Node Connection
      </button>
    </div>
  )
}

export default Button