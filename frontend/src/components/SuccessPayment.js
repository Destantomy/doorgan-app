/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from '../hooks/useLogout';

const SuccessPayment = () => {
  const { productId } = useParams();
  const { user } = useAuthContext();

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

  const downloadFile = async () => {
    try {
      const response = await fetch(`https://doorgan-api.onrender.com/api/endpoint/products/download/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Download response not ok:', response);
        throw new Error('Network response was not ok.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Buat elemen link sementara
      const link = document.createElement('a');
      link.href = url;
      link.download = productId;

      // Dengan menggunakan fungsi click untuk trigger download
      link.click();

      // Merevoke URL objek untuk membebaskan sumber daya
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className='users-payment-success' onClick={handleInteraction}>
      <div className="users-payment-success-container">
            <div className="users-payment-success-header">
                <h1>Doorgan Apparel &trade;</h1>
                <div className="dotted">
                  <div className="dot1" style={{
                    backgroundColor: '#9b59b6',
                    padding: '5px',
                    borderRadius: '500px',
                    margin: '5px'
                    }}/>
                  <div className="dot2"
                  style={{
                    backgroundColor: '#e74c3c',
                    padding: '5px',
                    borderRadius: '500px',
                    margin: '5px'
                    }}
                  />
                  <div className="dot3"
                  style={{
                    backgroundColor: '#f39c12',
                    padding: '5px',
                    borderRadius: '500px',
                    margin: '5px'
                    }}
                  />
                </div>
            </div>
            <div className="users-payment-success-body">
                <FontAwesomeIcon icon={faCheck} bounce className='fa-check'></FontAwesomeIcon>
                <p>Your payment was successfuly</p>
                <button className='btn btn-success' onClick={downloadFile}>
                    <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faDownload} /> Download jersey
                </button>
            </div>
            <div className="users-payment-success-footer">
                <Link to='/home'>Back to home</Link>
            </div>
        </div>
    </div>
  );
};

export default SuccessPayment;