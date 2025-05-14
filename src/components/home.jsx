import React, { useState, useEffect, useRef } from "react";
import "../styles/home.css";
import Image from "../images/icons8-name-96.png";
import MessageImage from "../images/icons8-messages-50.png";
import PlusImage from "../images/icons8-plus-120.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  setUsernameGlobal,
  setEmailGlobal,
} from "./redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);
  const emailGlobal = useSelector((state) => state.user.emailGlobal);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const dropdownRef = useRef(null);
  const textRef = useRef();
  const [posts, setPosts] = useState([]);
  const token = sessionStorage.getItem("token");
  const nav = useNavigate();

  const dropDownPost = () => {
    setIsOpen(!isOpen);
  };

  const handleUsernameClick = (e, username, index) => {
    e.preventDefault();
    setSelectedUsername(username);
    setSelectedPostIndex(index);

    const rect = e.target.getBoundingClientRect();
    setDropdownPosition({
      x: rect.right,
      y: rect.top + window.scrollY,
    });

    setIsDropdownOpen(true);
  };

  const postItem = async () => {
    setIsOpen(false);
    await axios.post("http://localhost:3001/newpost", {
      probs: textRef.current.value,
      username: usernameGlobal,
      email: emailGlobal,
    });
    fetchPosts();
  };

  const handleChat = async (username) => {
    await axios.post("http://localhost:3001/createChatRoom", {
      user1: usernameGlobal,
      user2: username,
    });
    nav("/chat");
    setIsDropdownOpen(false);
  };

  const handleReport = () => {
    console.log("Report option selected");
    setIsDropdownOpen(false);
  };

  const gotoprofile = () => nav("/profile");
  const gotomessage = () => nav("/chat");
  const gotoNews = () => nav("/news");

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout", {
        username: usernameGlobal,
      });
      sessionStorage.removeItem("token");
      dispatch(reset());
      nav("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/fetchposts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    document.addEventListener("mousedown", handleClickOutside);
    const intervalId = setInterval(fetchPosts, 10000);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="home-container">
      <header className="header-style">Welcome, {usernameGlobal}</header>

      <img
        src={Image}
        className="profile-image-button"
        onClick={gotoprofile}
        alt="Profile"
      />
      <img
        src={MessageImage}
        className="message-image-button"
        onClick={gotomessage}
        alt="Messages"
      />
      <button onClick={gotoNews} style={{ position: "fixed", top: 25, left: 40 }}>
        News
      </button>
      <button onClick={dropDownPost}>
        <img src={PlusImage} className="plus-image-button" alt="Add Post" />
      </button>

      {isOpen && (
        <div className="container-card">
          <input
            ref={textRef}
            type="text"
            placeholder="What's on your mind?"
            className="card-input"
          />
          <button className="post" onClick={postItem}>
            Post
          </button>
        </div>
      )}

      <h1>Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li className="post-card" key={index}>
            <strong
              onClick={(e) => handleUsernameClick(e, post.probsusername, index)}
            >
              {post.probsusername}:
            </strong>
            <p>{post.probstxt}</p>

            {isDropdownOpen &&
              selectedUsername === post.probsusername &&
              selectedPostIndex === index && (
                <div
                  ref={dropdownRef}
                  className="dropdown-menu"
                  style={{
                    top: dropdownPosition.y,
                    left: dropdownPosition.x,
                  }}
                >
                  <button onClick={() => handleChat(post.probsusername)}>
                    Chat
                  </button>
                  <button onClick={() => handleReport(post.idprobs)}>
                    Report
                  </button>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
