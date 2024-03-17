import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faCoffee} from '@fortawesome/free-solid-svg-icons'

const FooterUser = () => {
  return (
    <div className='user-footer'>
            <div className="user-footer-header">
                <p>Doorgan Apparel &trade; &copy; all right reserved</p>
            </div>
            <div className="user-footer-body">
                <p>Doorgan Apparel is a trademark that belongs to mejangoding.com group</p>
            </div>
            <div className="user-footer-end">
                <p>This site was made with <FontAwesomeIcon icon={faHeart} className='user-footer-end-heart'/> & <FontAwesomeIcon icon={faCoffee}/>
                </p>
            </div>
    </div>
  )
}

export default FooterUser
