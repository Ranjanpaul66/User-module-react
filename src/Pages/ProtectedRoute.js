import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ children }) {
  const access = localStorage.getItem("access");
  console.log();
  return access !== null ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
