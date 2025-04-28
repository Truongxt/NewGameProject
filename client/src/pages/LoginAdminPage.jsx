// src/pages/LoginPage.jsx
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginFormAdmin from "../components/LoginFormAdmin";
import { toast } from "react-toastify";

const LoginAdminPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  console.log(token);

  
  if(token) {
    return <Navigate to="/admin" />;
  }
  const handleLogin = () => {

    toast.success("Đăng nhập thành công!");

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
      <h1 className="text-4xl text-white font-bold mb-8">GameStore Admin</h1>
      <LoginFormAdmin onLogin={handleLogin} />
    </div>
  );
};

export default LoginAdminPage;