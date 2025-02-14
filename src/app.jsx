import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Messages } from './messages/messages';

export default function App() {
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
            <Route path='/play' element={<Play />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='*' element={<NotFound />} />
        </Routes>  
        
        <footer>
        <a className="github" href="https://github.com/Tobywarrenhunt/StartUp-260.git">GitHub</a>
    </footer>
    </BrowserRouter>
    );

function NotFound() {
    return <main classNameName="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}
}