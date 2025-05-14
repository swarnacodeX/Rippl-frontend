import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsernameGlobal,
  setEmailGlobal,
  reset,
} from "./redux/userSlice";
import "../styles/profile.css";
import IconUser from "../images/icons8-user-100.png";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import IconLogout from "../images/icons8-logout-100.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");
  const newEmailRef = useRef("");
  const newUsernameRef = useRef("");

  const dispatch = useDispatch();
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);
  const emailGlobal = useSelector((state) => state.user.emailGlobal);
  const navigate = useNavigate();

  async function fetchUserPosts() {
    try {
      const response = await axios.post("http://localhost:2400/api/posts/userPosts", {
        probsusername: usernameGlobal,
      });
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, []);

  function handleEdit(postId, currentText) {
    setEditingPostId(postId);
    setEditText(currentText);
  }

  async function handleUpdate() {
    try {
      await axios.post("http://localhost:3001/updatepost", {
        id: editingPostId,
        probs: editText,
      });
      fetchUserPosts();
      setEditingPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  function handleCancel() {
    setEditingPostId(null);
    setEditText("");
  }

  async function handleDelete(postId) {
    try {
      await axios.post("http://localhost:3001/deletepost", { id: postId });
      setUserPosts(userPosts.filter((post) => post.idprobs !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  async function updateEmail(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/updateemail", {
        newemail: newEmailRef.current.value,
        username: usernameGlobal,
        email: emailGlobal,
      });
      dispatch(setEmailGlobal(newEmailRef.current.value));
    } catch (error) {
      console.error("Error updating email:", error);
    }
  }

  async function updateUsername(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/updateusername", {
        newusername: newUsernameRef.current.value,
        username: usernameGlobal,
        email: emailGlobal,
      });
      dispatch(setUsernameGlobal(newUsernameRef.current.value));
    } catch (error) {
      console.error("Error updating username:", error);
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/logout", {
        username: usernameGlobal,
      });
      sessionStorage.removeItem("token");
      dispatch(reset());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  }

  return (
    <div>
      <header className="header-style">{usernameGlobal}'s Profile</header>
      <img className="user-img" src={IconUser} alt="user" />
      <p className="namepos">{usernameGlobal}</p>
      <p className="namepos2">{emailGlobal}</p>

      <input
        ref={newEmailRef}
        className="inputfield"
        placeholder="Enter new email"
      />
      <button className="updatebutton" onClick={updateEmail}>
        Change email
      </button>

      <input
        ref={newUsernameRef}
        className="inputfield2"
        placeholder="Enter new username"
      />
      <button className="updatebutton2" onClick={updateUsername}>
        Change username
      </button>

      <h1>Posts</h1>
      <ul>
        {userPosts.map((post) => (
          <li className="post-card" key={post.idprobs}>
            {editingPostId === post.idprobs ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  placeholder="Edit text"
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <p>{post.probstxt}</p>
            )}
            <button onClick={() => handleEdit(post.idprobs, post.probstxt)}>
              <CiEdit />
            </button>
            <button onClick={() => handleDelete(post.idprobs)}>
              <MdDeleteForever />
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>
        <img className="logout-button" src={IconLogout} alt="logout" />
      </button>
    </div>
  );
}

export default Profile;
