import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../services/service'; // Import the service for signup
import './signup.css'; // Ensure you have the styles for sign up page

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    service.signup({ email, password })
      .then((response) => {
        console.log('Sign up successful');
        navigate('/login'); // Redirect to login after successful sign up
      })
      .catch((error) => {
        setErrorMessage('Sign up failed, please try again.');
        console.error('Error signing up:', error);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
