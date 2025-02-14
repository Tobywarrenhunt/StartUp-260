import React from 'react';
import "./login.css";


export function About() {
  return (
 <main>
        <div className="grid-2">
            <div className="middle">
                <div className="welcome">
                    <p className="welcome-1">Welcome</p>
                </div>
                <div className="main-1">
                    <input className="email" type="email" placeholder="Email">
                </div>
                <div className="main-2">
                    <input className="password" type="password" placeholder="Password">
                </div>
                <div className="main-3">
                    <button className="login" type="submit">Login</button>
                    <button className="signup" type="submit">Sign Up</button>
                </div>
            </div>
        </div>
    </main>

  );
}