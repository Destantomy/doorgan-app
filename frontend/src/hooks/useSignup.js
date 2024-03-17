import {useState} from 'react'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [created, setCreated] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (username, email, password) => {
    setError(null)
    setIsLoading(true)

    const response = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, email, password})
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
      setCreated(json.message)
    }
  }
  return {signup, isLoading, error, created}
}
