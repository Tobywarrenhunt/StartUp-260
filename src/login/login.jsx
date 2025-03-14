import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import service from '../services/service'; // Import service for login

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    service.login({ email, password })
      .then((response) => {
        console.log('Login successful');
        navigate('/play'); // Redirect to /play on successful login
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setErrorMessage('Login failed, please try again');
      });
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to sign-up page
  };

  return (
    <main>
      <div className="area-2">
        <div className="middle">
          <div className="welcome">
            <p className="welcome-1">Welcome</p>
          </div>
          <div className="main-1">
            <input
              className="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="main-2">
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Display error message */}
          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="main-3">
            <button className="login" type="submit" onClick={handleLogin}>Login</button>
            <button className="signup" type="button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </main>
  );
}










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate
// import "./login.css";

// export function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();  // Initialize the navigate function

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage('Please fill out both fields.');
//       return;
//     }

//     console.log('Logging in with', email, password);
//     setErrorMessage('');
//     alert('Login successful!');

//     // Navigate to the '/play' route after successful login
//     navigate('/play');
//   };

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     console.log('Redirecting to sign up');
//   };

//   return (
//     <main>
//         <div className="area-2">
//             <div className="middle">
//                 <div className="welcome">
//                     <p className="welcome-1">Welcome</p>
//                 </div>
//                 <div className="main-1">
//                     <input
//                       className="email"
//                       type="email"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div className="main-2">
//                     <input
//                       className="password"
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 {/* Display error message */}
//                 {errorMessage && <p className="error">{errorMessage}</p>}

//                 <div className="main-3">
//                     <button className="login" type="submit" onClick={handleLogin}>Login</button>
//                     <button className="signup" type="button" onClick={handleSignUp}>Sign Up</button>
//                 </div>
//             </div>
//         </div>
//     </main>
//   );
// }





















// const React = require('react');
// const { useState } = React;
// const { useNavigate } = require('react-router-dom');  // Use require for useNavigate
// require('./login.css');

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();  // Initialize the navigate function

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setErrorMessage('Please fill out both fields.');
//       return;
//     }

//     console.log('Logging in with', email, password);
//     setErrorMessage('');
//     alert('Login successful!');

//     // Navigate to the '/play' route after successful login
//     navigate('/play');
//   };

//   const handleSignUp = (e) => {
//     e.preventDefault();
//     console.log('Redirecting to sign up');
//   };

//   return (
//     <main>
//         <div className="area-2">
//             <div className="middle">
//                 <div className="welcome">
//                     <p className="welcome-1">Welcome</p>
//                 </div>
//                 <div className="main-1">
//                     <input
//                       className="email"
//                       type="email"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div className="main-2">
//                     <input
//                       className="password"
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 {/* Display error message */}
//                 {errorMessage && <p className="error">{errorMessage}</p>}

//                 <div className="main-3">
//                     <button className="login" type="submit" onClick={handleLogin}>Login</button>
//                     <button className="signup" type="button" onClick={handleSignUp}>Sign Up</button>
//                 </div>
//             </div>
//         </div>
//     </main>
//   );
// }

// module.exports = Login;






