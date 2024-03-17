import React, {useEffect, useState, Fragment} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlugCircleXmark, faCheck } from '@fortawesome/free-solid-svg-icons'

const Verified = () => {
  const [validUrl, setValidUrl] = useState(false);
  const params = useParams()
  useEffect(() => {

    const verifying = async () => {
        try {
            const url = `http://localhost:4000/api/auth/userVerify/${params.id}/${params.token}`
            const {data} = await axios.get(url)
            console.log(data)
            setValidUrl(true)
        } catch (error) {
            console.log(error)
        }
    }
    verifying()
  }, [params])

  return (
    <Fragment>
        {validUrl ? (
            <div className='notFound-container'>
            <div className="notFound">
            <FontAwesomeIcon style={{color: 'green'}} icon={faCheck} bounce size='6x'/>
            <div className="error-auth error alert alert-success" role="alert" style={{textAlign: 'center'}}>Verification successfuly</div>
            <Link to={'/login'}>login now</Link>
            </div>
          </div>
        ) : (
            <div className='notFound-container'>
            <div className="notFound">
            <FontAwesomeIcon icon={faPlugCircleXmark} size='6x'/>
            <h3>Whoops! You may have lost</h3>
            </div>
          </div>
        )}
    </Fragment>
  )
}

export default Verified
