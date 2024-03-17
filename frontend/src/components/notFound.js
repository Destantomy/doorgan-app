import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const notFound = () => {
  return (
    <div className='notFound-container'>
      <div className="notFound">
      <FontAwesomeIcon icon={faPersonCircleExclamation} shake size='6x'/>
      <h4>404 Not found</h4>
      <h3 style={{color: 'red'}}>Whoops! You may have lost</h3>
      </div>
    </div>
  )
}

export default notFound
