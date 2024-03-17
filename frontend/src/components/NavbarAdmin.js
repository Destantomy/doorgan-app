import React,{ useState } from 'react'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStore, faCartShopping, faUsers, faBars, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const NavbarAdmin = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const [isBurgerVisible, setBurgerVisibility] = useState(false)

  const handleSubmit = () => {
    logout()
  }

  const handleBtn1Click = () => {
    setBurgerVisibility(!isBurgerVisible);
  };

  return (
    <div className='navbar-admin'>
      <div className='navbar-admin-header'>
        <div className='navbar-admin-brand'>
            <h3>Doorgan Apparel &trade;</h3>
            <span>Keep going!</span>
        </div>
        <div className='void'></div>
        <div className='navbar-admin-log'>
            {user && (
                <div className='admin-log-data'>
                    <span>Hello, {user.username}</span>
                    <button className='btn btn-danger' onClick={handleSubmit}><FontAwesomeIcon icon={faRightFromBracket}/></button>
                </div>
            )}
        </div>
      </div>
      <div className='navbar-admin-menu'>
        <div className="navbar-admin-links">
        <Link className='the-link btn btn-light' to='/home'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faStore} bounce/>Home</Link>
        <Link className='the-link btn btn-light' to='/admin/products'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faCartShopping} bounce/>Products</Link>
        <Link className='the-link btn btn-light' to='/admin/users'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faUsers} bounce/>Users</Link>
        </div>
        <div className='burger'>
            <button className='btn btn-light' onClick={handleBtn1Click}><FontAwesomeIcon icon={faBars}/></button>
            {isBurgerVisible && 
            <div className="navbar-admin-burgers">
            <Link className='the-link btn btn-light' to='/home'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faStore} bounce/>Home</Link>
            <Link className='the-link btn btn-light' to='/admin/products'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faCartShopping} bounce/>Products</Link>
            <Link className='the-link btn btn-light' to='/admin/users'><FontAwesomeIcon style={{marginRight: '5px'}} icon={faUsers} bounce/>Users</Link>
            </div>
            }
        </div>
      </div>
    </div>
  )
}

export default NavbarAdmin
