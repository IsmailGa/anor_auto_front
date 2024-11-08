import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import Dashboard from "./Dashboard/Dashboard";
import AdminProduct from "./Products/AdminProduct";
import AdminProducts from "./Products/AdminProducts";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="admin">
      {token && <Dashboard handleLogOut={handleLogout} />}
      <Routes>
        <Route
          path="panel"
          element={token ? <AdminPanel /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="login"
          element={
            token ? (
              <Navigate to="/admin/panel" replace />
            ) : (
              <AdminLogin setToken={setToken} />
            )
          }
        />
        <Route
          path="products"
          element={
            token ? <AdminProducts /> : <Navigate to="/404" replace />
          }
        />
        <Route
          path="category/:category"
          element={
            token ? <AdminProducts /> : <Navigate to="/404" replace />
          }
        />
        <Route
          path="products/:id"
          element={token ? <AdminProduct /> : <Navigate to="/404" replace />}
        />
      </Routes>
    </div>
  );
}
