import React from 'react'
import { useProductsContext } from '../hooks/useProductsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProductsTable = ({product}) => {
  
  const {dispatch} = useProductsContext()
  const {user} = useAuthContext()

  const deleteClick = async () => {
    if (!user) {
        return
    }
    const response = await fetch('https://doorgan-api.onrender.com/api/endpoint/products/admin/' + product._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if (response.ok) {
        dispatch({type: 'DELETE_PRODUCT', payload: json})
      }
  }

  return (
    <div className='products-admin-details'>
      <button className='btn btn-danger custom-btn-delete' onClick={deleteClick}>
      <FontAwesomeIcon icon={faTrash} shake></FontAwesomeIcon>
      </button>
      <img src={product.imageUrl} alt={product.productTitle} className='products-admin-custom'/>
      <p>{product.productTitle}</p>
      <p>Rp {product.productPrice}</p>
      <p>{formatDistanceToNow(new Date(product.createdAt), {addSuffix: true})}</p>
    </div>
  )
}

export default ProductsTable
