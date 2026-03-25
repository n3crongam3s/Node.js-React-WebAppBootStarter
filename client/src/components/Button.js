import React, { useState } from 'react'
import './components.css'

const Button = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    setError(false)
    setData(null)

    try {
      const res = await fetch('/api/hello')

      if (!res.ok) {
        throw new Error('Request failed')
      }

      const result = await res.json()
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
      {loading && <p>A carregar...</p>}

      {data?.message && (
        <p style={{ color: 'green', fontWeight: 'bold' }}>
          {data.message}
        </p>
      )}

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
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
