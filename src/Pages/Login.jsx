/** @format */

import React, { useState } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, SetFormData] = useState({
    username: "",
    password: "",
  });

  const InputEvent = (event) => {
    const { name, value } = event.target;
    SetFormData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  //let memberData = {};
  const [error, setError] = useState("");

  const getLogin = async () => {
    const response = await fetch("http://54.185.184.164:8008/authorization/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(formData),
    });
    const memberData = await response.json();
    if (memberData.status === 500) {
      setError("Incorrect Username or Password!");
    }else{
      localStorage.setItem("id", memberData.memberId);
      localStorage.setItem("name", memberData.username);
      localStorage.setItem("token", memberData.jwtAuthToken);
      navigate(`/profile/${memberData.memberId}/viewBills`);
    }
    console.log(memberData)
  };

  const handleSubmit = () => {
    getLogin();
  };

  return (
    <>
      <div className="container">
        <div className="login_container">
          <h1>Please Login to See your Dashboard</h1>

          <div className="form">
            <div className="input-group">
              <label for="username">Username</label>
              <input
                type="text"
                autoComplete="off"
                name="username"
                id="username"
                value={formData.username}
                onChange={InputEvent}
              />
            </div>
            <div className="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={InputEvent}
              />
            </div>
          </div>

          {error ? <Alert severity="error" sx={{backgroundColor: "rgba(255,255,255,0.4)", cursor: "pointer"}} >{error}</Alert> : null}

          <Button
            variant="contained"
            endIcon={<LoginIcon />}
            sx={{
              color: "white",
              background: "rgba(0,0,0,0.5)",
              width: 350,
              height: 50,
              borderRadius: 50,
              ":hover": {
                color: "white",
                background: "black",
              },
            }}
            onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
