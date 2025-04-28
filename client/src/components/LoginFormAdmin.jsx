import React, { useState } from "react";
import { loginAdmin } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginFormAdmin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginAdmin({ email, password });

      // Kiểm tra vai trò ADMIN
      if (data.role !== "ADMIN") {
        alert("Bạn không có quyền truy cập!");
        return;
      }
      // Lưu token vào localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminEmail", email);

      // Gọi hàm onLogin để chuyển hướng
      onLogin();
    } catch (error) {
      alert(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập Admin</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Đăng nhập
      </button>
    </form>
  );
};

export default LoginFormAdmin;