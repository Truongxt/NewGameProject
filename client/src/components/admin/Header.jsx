import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // Lấy thông tin admin từ localStorage
  const adminEmail = localStorage.getItem("adminEmail");

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Xóa token
    localStorage.removeItem("adminEmail"); // Xóa email
    navigate("/login-admin"); // Chuyển hướng về trang đăng nhập admin
  };

  return (
    <div className="header flex justify-between items-center p-4 bg-gray-100 shadow-md mb-5">
      <h3 className="title text-xl font-bold">GameStore</h3>
      <div className="search-area flex items-center gap-4"> 
       <div className="flex items-center gap-2">
          <img src="./Avatar 313.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium">{adminEmail || "Admin"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Header;