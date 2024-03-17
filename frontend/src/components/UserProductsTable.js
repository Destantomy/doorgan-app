import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const UserProductsTable = ({ product }) => {
  const { user } = useAuthContext();

  const checkOut = async () => {
    try {
      const data = {
        id: product._id,
        productName: product.productTitle,
        price: product.productPrice,
        quantity: 1,
      };

      const response = await fetch(` http://localhost:4000/api/endpoint/products/payment/${product._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const requestData = await response.json();

      window.snap.pay(requestData.token, {
        ...requestData.options,
        onSuccess: async function () {
          // Handle success
          console.log('payment success');
          // Redirect ke halaman success dengan menyertakan parameter product._id
          window.location.href = `https://3990-182-0-133-121.ngrok-free.app/success/${product._id}`;
        },
        onPending: function () {
          // Handle pending payment
          console.log('payment pending');
          window.location.href = `https://3990-182-0-133-121.ngrok-free.app/home`;
        },
        onError: function () {
          // Handle error
          console.log('payment error');
          window.location.href = `https://3990-182-0-133-121.ngrok-free.app/home`;
        },
      });
    } catch (error) {
      console.error('Error pada proses checkout:', error);
    }
  };

  return (
    <div className='user-product-detail'>
      <img src={product.imageUrl} alt={product.productTitle} className='user-products-img' />
      <div className="user-products-caption">
        <p>{product.productTitle}</p>
        <p>Rp {product.productPrice}</p>
        <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
        <button className='btn btn-success' onClick={checkOut}>
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faDollarSign} bounce />Buy
        </button>
      </div>
    </div>
  );
};

export default UserProductsTable;
