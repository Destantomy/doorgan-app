import {AuthContext} from '../context/authContext'
import {useContext} from 'react'

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('useAuthContext should be used inside the AuthContextProvider')
  }
  return context
}
