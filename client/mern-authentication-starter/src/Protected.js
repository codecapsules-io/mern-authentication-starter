import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Protected({ isLoggedIn }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    axios.get('http://localhost:5003/api/protected', { headers: { Authorization: token } })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Access denied');
      });
  }, [isLoggedIn, navigate]);

  return (
    <div className="form-card">
      <h2>Protected Route</h2>
      <p>{message}</p>
      {isLoggedIn && <p>Congratulations! You have successfully implemented server-side authentication in your MERN application.</p>}
    </div>
  );
}

export default Protected;