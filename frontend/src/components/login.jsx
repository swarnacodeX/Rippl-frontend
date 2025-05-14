import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

// Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import {
  setUsernameGlobal,
  setEmailGlobal,
  reset,
} from "./redux/userSlice"; // adjust path if needed

function Login() {
  const dispatch = useDispatch();
  const usernameGlobal = useSelector((state) => state.user.usernameGlobal);
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const gotoregister = () => {
    nav("/register");
  };

  const handleLogin = async () => {
    try {
      const response1 = await axios.post("http://localhost:2400/api/auth/login", {
        username: usernameGlobal,
        password: password,
      });

      const response2 = await axios.post("http://localhost:2400/api/auth/fetchdata", {
        username: usernameGlobal,
      });

      dispatch(setEmailGlobal(response2.data.email));
      sessionStorage.setItem("token", response1.data.accesstoken);
      nav("/home");
    } catch (error) {
      dispatch(reset());
      console.error("Login failed");
    }
  };

  return (
    <div className="form_area">
      <p className="title">LOGIN</p>

      <div className="form_group">
        <label className="sub_title">Username</label>
        <input
          placeholder="Enter your username"
          className="form_style"
          value={usernameGlobal}
          onChange={(e) => dispatch(setUsernameGlobal(e.target.value))}
        />
      </div>

      <div className="form_group">
        <label className="sub_title">Password</label>
        <input
          placeholder="Enter your password"
          className="form_style"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an Account?{" "}
          <button className="button1" onClick={gotoregister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
