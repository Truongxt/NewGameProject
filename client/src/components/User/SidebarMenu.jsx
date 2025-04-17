import React from "react";
import { FaUser, FaShoppingCart, FaCreditCard, FaLock } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  return (
    <div className="shadow-sm bg-white rounded-lg">
      <NavLink
        to="/user/profile"
        className={({ isActive }) =>
          `hover:bg-gray-100 border-b cursor-pointer ${
            isActive ? "bg-blue-100 text-blue-600 font-bold" : "text-gray-700"
          }`
        }
      >
        <div className="flex items-center px-4 py-3">
          <FaUser className="icon mr-2" />
          <span className="text">Tài khoản</span>
        </div>
      </NavLink>
      <NavLink
        to="/user/order-history"
        className={({ isActive }) =>
          `hover:bg-gray-100 border-b cursor-pointer ${
            isActive ? "bg-blue-100 text-blue-600 font-bold" : "text-gray-700"
          }`
        }
      >
        <div className="flex items-center px-4 py-3">
          <FaShoppingCart className="icon mr-2" />
          <span className="text">Lịch sử đơn hàng</span>
        </div>
      </NavLink>
      <NavLink
        to="/user/payment-history"
        className={({ isActive }) =>
          `hover:bg-gray-100 border-b cursor-pointer ${
            isActive ? "bg-blue-100 text-blue-600 font-bold" : "text-gray-700"
          }`
        }
      >
        <div className="flex items-center px-4 py-3">
          <FaCreditCard className="icon mr-2" />
          <span className="text">Lịch sử giao dịch</span>
        </div>
      </NavLink>
      <NavLink
        to="/user/security"
        className={({ isActive }) =>
          `hover:bg-gray-100 cursor-pointer ${
            isActive ? "bg-blue-100 text-blue-600 font-bold" : "text-gray-700"
          }`
        }
      >
        <div className="flex items-center px-4 py-3">
          <FaLock className="icon mr-2" />
          <span className="text">Mật khẩu và bảo mật</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarMenu;