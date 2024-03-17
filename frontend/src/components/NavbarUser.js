import React from 'react'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const NavbarUser = () => {
    const handleSubmit = () => {
        logout()
    }

    const {logout} = useLogout()
    const {user} = useAuthContext()
    
  return (
    <div className='navbar-users'>
        <div className="navbar-users-title">
            <h3>Doorgan Apparel &trade;</h3>
            <span>Keep going!</span>
        </div>
        <div className="navbar-users-void"/>
        <div className="navbar-users-logs">
        {user && (
                <div className='users-log-data'>
                    <span>Hello, {user.username}</span>
                    <button className='btn btn-danger' onClick={handleSubmit}><FontAwesomeIcon icon={faRightFromBracket}/></button>
                </div>
            )}
        </div>
    </div>
  )
}

export default NavbarUser
