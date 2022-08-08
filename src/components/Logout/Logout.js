import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../Pages/Login";

const Logout = () => {
  const navigate = useNavigate();
  console.log("first");
  navigate("/");
  localStorage.clear();
  window.location.href = "/";
  return <Login />;
};

export default Logout;
