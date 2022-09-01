/** @format */

import React from "react";

import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";

import { NavLink, useNavigate } from "react-router-dom";

import "./nav.css";

function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="nav">
        <div className="profile_pic">
          <Avatar src="/broken-image.jpg"/>
          <h1>{localStorage.getItem("name")}</h1>
        </div>
        <Button
          variant="contained"
          endIcon={<LogoutIcon />}
          sx={{
            color: "black",
            background: "white",
            width: 150,
            height: 50,
            borderRadius: 50,
            boxShadow: "0 0 0 1px black",
            ":hover": {
              color: "white",
              background: "black",
            },
          }}
          onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Nav;
