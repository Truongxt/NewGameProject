import React from "react";
import { Link } from "react-router-dom";
import { FaAward } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className="relative bg-white px-6 py-4 flex gap-10">
        <div className="flex items-center mr-10">
          <Link to="/">
            <p className="text-2xl font-bold text-blue-600">GameStore</p>
          </Link>
        </div>
        <div className="text-[14px] flex flex-col gap-2 mx-10">
            <p className="font-medium mb-2">GIỚI THIỆU</p>
            <Link>Về chúng tôi</Link>
            <Link>Điều khoản, dịch vụ</Link>
            <Link>Chính sách bảo mật</Link>
        </div>
        <div className="text-[14px] flex flex-col gap-2 mx-10">
            <p className="font-medium mb-2">TÀI KHOẢN</p>
            <Link to="/register">Đăng ký</Link>
            <Link to="/login">Đăng nhập</Link>
        </div>
        <div className="text-[14px] flex flex-col gap-2 mx-10">
            <Link className="font-medium mb-2">LIÊN HỆ</Link>
            <Link>Liên hệ hỗ trợ</Link>
            <Link>Chat với CSKH</Link>
        </div>
        <FaAward className="absolute right-[100px] top-[10px] text-[130px] text-[rgb(0,133,204)]"/>
      </div>
      <div className="flex justify-center my-3">
        <p className="text-sm text-gray-600">© 2025 ShopGame Copyright. All Rights Reserved</p>
      </div>
    </div>
  );
}
