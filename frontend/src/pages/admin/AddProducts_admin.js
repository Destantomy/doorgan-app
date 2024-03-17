import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useProductsContext} from '../../hooks/useProductsContext'
import {useAuthContext} from '../../hooks/useAuthContext'
import NavbarAdmin from '../../components/NavbarAdmin'
import Spinner from '../../../node_modules/react-bootstrap/Spinner'
import { useLogout } from '../../hooks/useLogout'

const AddProducts_admin = () => {
    const {dispatch} = useProductsContext()
    const [isLoading, setIsLoading] = useState(null)
    const {user} = useAuthContext()
    const [productTitle, setProductTitle] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productSnapshot, setProductSnapshot] = useState('')
    const [productFile, setProductFile] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

      /* /timer */
  const {logout} = useLogout()

  const [lastActiveTime, setLastActiveTime] = useState(new Date());

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      const currentTime = new Date();
      const diffInMilliseconds = currentTime - lastActiveTime;
      if (diffInMilliseconds >= 60000) {
        logout();
      }
    }, 60000);

    return () => clearTimeout(logoutTimer);
  }, [lastActiveTime]);

  const handleInteraction = () => {
    setLastActiveTime(new Date());
  };
  /* /timer */

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!user) {
            setError('You must logged in')
            return
        }

        const formData = new FormData()
        formData.append('productTitle', productTitle)
        formData.append('productPrice', productPrice)
        // Check if files were chosen and append them to formData
        if (productSnapshot) formData.append('productSnapshot', productSnapshot);
        if (productFile) formData.append('productFile', productFile);

        const response = await fetch('http://localhost:4000/api/endpoint/products/admin', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        } else {
            setProductTitle('')
            setProductPrice('')
            setProductSnapshot('')
            setProductFile('')
            setIsLoading(false)
            dispatch({type: 'CREATE_PRODUCT', payload: json})
            navigate('/admin/products/')
        }
    }

  return (
    <div onClick={handleInteraction}>
      <NavbarAdmin />
      <div className="add-product-admin">
        <form className="container-add-product-admin" onSubmit={handleSubmit}>
            <label>Jersey title: </label>
            <input type="text"
            id='exampleInputEmail1'
            className='form-control custom-form-control'
            autoFocus
            onChange={(e) => setProductTitle(e.target.value)}
            maxLength={20}
            value={productTitle}
            />

            <label>Price: </label>
            <input type="number"
            id='exampleInputEmail1'
            className='form-control custom-form-control'
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            />

            <label>Product snapshot: </label>
            <input type="file"
            id='exampleInputEmail1'
            className='form-control custom-form-control'
            onChange={(e) => setProductSnapshot(e.target.files[0])}
            />

            <label>Product file: </label>
            <input type="file"
            id='exampleInputEmail1'
            className='form-control custom-form-control'
            onChange={(e) => setProductFile(e.target.files[0])}
            />

            {!isLoading && <button className='btn btn-danger custom-form-control'>Add new product</button>}
            {isLoading && <button className='btn btn-danger custom-form-control' disabled><Spinner variant='light'/></button>}
            {error && <div className="alert alert-danger" style={{textAlign:'center'}} role="alert">{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default AddProducts_admin
