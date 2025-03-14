
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Messages } from './messages/messages';
import { SignUp } from './signup/signup'; // Import your SignUp component

export default function App() {
  const [messages, setMessages] = useState({
    green: '',
    red: '',
    blue: '',
    purple: '',
    orange: '',
  });

  // Function to update message of a certain color
  const updateMessage = (color, message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [color]: message,
    }));
  };

  return (
    <BrowserRouter>
      <nav className="gird-1">
        <div className="nav-1">
          <NavLink className="frosty-snippers" to="/">Frosty Snippers</NavLink>
        </div>
        <div className="nav-2">
          <NavLink className="home" to="/">Home</NavLink>
          <NavLink className="play" to="play">Play</NavLink>
          <NavLink className="messages" to="messages">Messages</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/signup' element={<SignUp />} />  {/* Route for the SignUp page */}
        <Route 
          path='/play' 
          element={<Play updateMessage={updateMessage} />} 
        />
        <Route 
          path='/messages' 
          element={<Messages messages={messages} />} 
        />
        <Route path='*' element={<NotFound />} />
      </Routes>  

      <footer>
        <a className="github" href="https://github.com/Tobywarrenhunt/StartUp-260.git">GitHub</a>
      </footer>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
