import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Protected from './components/Protected';

const App = () => {
  const [tokens, setTokens] = useState(() => {
    // Intentar leer los tokens desde localStorage al iniciar la aplicación
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  });

  useEffect(() => {
    // Guardar tokens en localStorage cuando se actualicen
    if (tokens) {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }, [tokens]);

  return (
    <div>
      <h1>JWT Authentication</h1>
      {!tokens ? (
        <>
          <Register />
          <Login setTokens={setTokens} />
        </>
      ) : (
        <Protected tokens={tokens} setTokens={setTokens} />
      )}
    </div>
  );
};

export default App;
