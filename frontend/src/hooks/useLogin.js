import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    const response = await fetch('https://doorgan-api.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
    const json = await response.json()
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      return
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // update the auth context
      dispatch({ type: 'LOGIN', payload: json })
      // update loading state
      setIsLoading(false)
    }
  }
  return {login, isLoading, error}
}