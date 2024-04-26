import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './jsx_files/home.jsx';
import Login from './jsx_files/login.jsx';
import Register from './jsx_files/register.jsx';
import Main from './jsx_files/main.jsx';
import Logout from './jsx_files/logout.jsx';

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/main" element={<Main />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;