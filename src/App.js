import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import DataTable from "./components/Datatable/UsersTable/DataTable";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Logout from "./components/Logout/Logout";
import EnhancedTable from "./components/Datatable/UsersTable/DataTable";
import UserRole from "./components/Datatable/UserRole/UserRole";
// const useStyles = makeStyles((theme) => ({}));

function App() {
  // const classes = useStyles;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <EnhancedTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-role"
          element={
            <ProtectedRoute>
              <UserRole />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/user-role"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        /> */}

        <Route path="*" element={<div> 404 Page Not Fount </div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
