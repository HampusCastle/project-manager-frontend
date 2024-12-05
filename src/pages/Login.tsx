import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toastSuccess, toastError } from '../services/toastConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      toastSuccess('Inloggad!');
      navigate('/dashboard');
    } catch (error) {
      toastError('Felaktiga inloggningsuppgifter');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl mb-4">Logga in</h2>
      <div>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
      </div>
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">Logga in</button>
    </div>
  );
};

export default Login;