import React from 'react'
import { useUsersContext } from '../hooks/useUsersContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
// import timeStamp from 'date-fns/formatDistanceToNow'

const UsersTable = ({users, index}) => {
  
  const {dispatch} = useUsersContext()
  const {user} = useAuthContext()

  const handClick = async () => {
    if (!user) {
        return
    }
    const response = await fetch('https://doorgan-api.onrender.com/api/endpoint/users/admin/' + users._id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    const json = await response.json()
    if (response.ok) {
        dispatch({type: 'DELETE_USER', payload: json})
    }
  }
  
  return (
    <tr>
      <td className='text-center'>{index}</td>
      <td className='text-center'>{users.username}</td>
      <td className='text-center custom-row-table'>{users.email}</td>
      <td className='text-center'>{users.role}</td>
      <td className='text-center'>
        <button onClick={handClick} className='btn btn-danger'>
          <FontAwesomeIcon icon={faTrash} shake></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  )
}

export default UsersTable
