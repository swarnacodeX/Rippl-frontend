import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

import { useSelector, useDispatch } from "react-redux";
import {
  setUsernameGlobal,
  setEmailGlobal,
  reset,
} from "./redux/userSlice"; // adjust path if needed

function Register() {
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);
  const emailGlobal = useSelector((state) => state.user.emailGlobal);
  const dispatch = useDispatch();

  const passwordRef = useRef("");

  const nav = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        "http://localhost:2400/api/auth/register",
        {
          email: emailGlobal,
          password: passwordRef.current.value,
          username: usernameGlobal,
        }
      );
      console.log("User registered:", response.data);
      sessionStorage.setItem("token", response.data.accesstoken);
      nav("/home");
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      dispatch(reset());
    }
  }

  return (
    <div className="form_area">
      <p className="title">REGISTER</p>

      <div className="form_group">
        <label className="sub_title">Username</label>
        <input
          placeholder="Enter your username"
          className="form_style"
          type="text"
          value={usernameGlobal}
          onChange={(e) => dispatch(setUsernameGlobal(e.target.value))}
        />
      </div>

      <div className="form_group">
        <label className="sub_title">Email</label>
        <input
          placeholder="Enter your email"
          className="form_style"
          type="email"
          value={emailGlobal}
          onChange={(e) => dispatch(setEmailGlobal(e.target.value))}
        />
      </div>

      <div className="form_group">
        <label className="sub_title">Password</label>
        <input
          ref={passwordRef}
          placeholder="Enter your password"
          className="form_style"
          type="password"
        />
      </div>

      <div>
        <button className="btn" onClick={handleRegister}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Register;
