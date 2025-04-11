import React, { useState, useEffect } from "react";
import { useUser } from "../provider/UserProvider";
import { useCart } from "../provider/CartProvider";
const Account = () => {
  const { user, formatDate } = useUser();
  const {formatCurrency} = useCart();
  const [fullName, setFullName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [cccd, setCccd] = useState(user.cccd);
  const [sex, setSex] =useState(user.sex);

  const inputClass =
    "w-full md:w-1/2 border border-gray-300 rounded px-4 pt-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none peerplaceholder-transparent";
  const labelClass =
    "absolute left-0 -top-[2px] px-4 text-[13px] text-gray-600 transition-allpeer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus: -top-[2px] peer-focus: text-gray-600";

  return (
    <div className="mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="mb-3 text-xl font-bold">Tổng quan</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-4">
            <div className="space-y-2">
              <p>Tên đăng nhập</p>
              <p className="font-bold text-sm">{user.username}</p>
            </div>
            <div className="space-y-2">
              <p>Email</p>
              <p className="text-sm font-bold">{user.email}</p>
            </div>
            <div className="space-y-2">
              <p>Họ và tên</p>
              <p className="font-bold text-sm">{user.name}</p>
            </div>
            <div className="space-y-2">
              <p>Nhóm khách hàng</p>
              <p className="font-bold text-sm">Member</p>
            </div>
          </div>

          <div className="grid grid-cols-4">
            <div className="space-y-2">
              <p>Số dư</p>
              <p className="font-bold text-sm">{formatCurrency(user.soDu)}</p>
            </div>
            <div className="space-y-2">
              <p>Đã tích lũy</p>
              <p className="font-bold text-sm">{formatCurrency(user.soTienDaNap)}</p>
            </div>
            <div className="space-y-2">
              <p>Ngày tham gia</p>
              <p className="font-bold text-sm">{formatDate(user.createDate)}</p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex md:grid-cols-2 gap-10 items-center">
          <div className="flex gap-3 items-center">
            <img
              src="https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269"
              alt="Avatar"
              className="rounded-full w-40 h-40"
            />
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
              Sửa ảnh đại diện
            </button>
          </div>
          <div
            className="text-sm text-gray-700 border-l-[2px] p-2"
            style={{ height: "100%" }}
          >
            <p className="mb-3">Vui lòng chọn ảnh nhỏ hơn 5MB</p>
            <p>Chọn hình ảnh phù hợp, không phản cảm</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full">
        <h4 className="mb-3 font-bold">Cá nhân</h4>
        <form>
          <div className="mb-3 relative">
            <input
              id="fullname"
              type="text"
              className={inputClass}
              placeholder=""
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label
              htmlFor="fullname"
              className={labelClass}
            >
              Họ và tên
            </label>
          </div>
          <div className="mb-3 relative">
            <input
              id="phone"
              type="text"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              htmlFor="phone"
              className={labelClass}
            >
              Số điện thoại
            </label>
          </div>
          <div className="mb-3 relative">
            <input
              id="cccd"
              type="text"
              className={inputClass}
              value={cccd}
              onChange={(e) => setCccd(e.target.value)}
            />
            <label
              htmlFor="cccd"
              className={labelClass}
            >
              Căn cước công dân
            </label>
          </div>
          <div className="mb-3">
            <select className="w-full md:w-1/2 border border-gray-300 rounded px-4 py-2"
            value={sex}
            onChange={() => setSex(e.target.value)}
            >
              <option>Giới tính</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          <div className="flex items-center mb-3">
            <input className="mr-2" type="checkbox" id="showName" />
            <label className="text-sm text-gray-600" htmlFor="showName">
              Cho phép hiển thị tên của bạn trên các hoạt động
            </label>
          </div>
          <button
            type="submit"
            className="w-full md:w-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
