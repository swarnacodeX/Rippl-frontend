// src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUsernameGlobal, setEmailGlobal, reset } from './components/redux/userSlice'; // Import Redux actions
import Login from './components/login';
import Profile from './components/profile';
import Home from './components/home';
import Register from './components/register';
import ChatPage from './components/chatPage';
const App = () => {
  const dispatch = useDispatch();
  const { usernameGlobal, emailGlobal } = useSelector((state) => state.user); // Use Redux state
  const token = sessionStorage.getItem('token');
  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated && !usernameGlobal) {
      axios
        .post('http://localhost:3001/profiledata', { token })
        .then((response) => {
          dispatch(setUsernameGlobal(response.data.username)); // Dispatch Redux action
          dispatch(setEmailGlobal(response.data.email)); // Dispatch Redux action
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // You can also handle error here, such as logging out if the token is invalid
        });
    }
  }, [isAuthenticated, usernameGlobal, dispatch, token]); // Dependency array

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/chat" element={<ChatPage />} />
      
      </Routes>
    </Router>
  );
};

export default App;
