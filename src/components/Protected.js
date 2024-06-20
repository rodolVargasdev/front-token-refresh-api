import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Protected = ({ tokens, setTokens }) => {
  const [message, setMessage] = useState('');

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/private', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response.status === 401) {
        try {
          const refreshResponse = await axios.post('http://localhost:5000/api/auth/refresh-token', {
            token: tokens.refreshToken
          });
          const { accessToken } = refreshResponse.data;
          setTokens({ ...tokens, accessToken });
        } catch (refreshError) {
          console.error('Error al refrescar el token', refreshError);
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, [tokens]);

  const handleLogout = () => {
    // Eliminar tokens de localStorage y actualizar el estado de tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setTokens(null);
  };

  return (
    <div>
      <h2>Protected</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Protected;
 