import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import "./login.css";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    console.log('Logging in with', email, password);
    setErrorMessage('');
    alert('Login successful!');

    // Navigate to the '/play' route after successful login
    navigate('/play');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Redirecting to sign up');
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












// import React from 'react';
// import "./login.css";



// export function Login() {
//   return (
//     <main>
//         <div className="area-2">
//             <div className="middle">
//                 <div className="welcome">
//                     <p className="welcome-1">Welcome</p>
//                 </div>
//                 <div className="main-1">
//                     <input className="email" type="email" placeholder="Email" />
//                 </div>
//                 <div className="main-2">
//                     <input className="password" type="password" placeholder="Password" />
//                 </div>
//                 <div className="main-3">
//                     <button className="login" type="submit">Login</button>
//                     <button className="signup" type="submit">Sign Up</button>
//                 </div>
//             </div>
//         </div>
//     </main>

//   );
// }