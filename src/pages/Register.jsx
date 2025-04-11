import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Register.css";
import { createUser } from "../api/api";
const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
  
    // 1. Họ tên: Viết hoa chữ đầu và có dấu cách giữa các từ
    if (!/^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)+$/.test(name)) {
      newErrors.name = "Họ và tên phải viết hoa chữ đầu và có dấu cách giữa các từ.";
    }
  
    // 2. Email: Phải có đuôi @gmail.com và không bắt đầu bằng ký tự đặc biệt hoặc số
    if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/.test(email)) {
      newErrors.email = "Email phải có đuôi @gmail.com và không được bắt đầu bằng ký tự đặc biệt hoặc số.";
    }
  
    // 3. Tên đăng nhập: Viết liền không dấu
    if (!/^[a-zA-Z0-9]+$/.test(userName)) {
      newErrors.userName = "Tên đăng nhập phải viết liền không dấu.";
    }
  
    // 4. Mật khẩu: Ít nhất 1 ký tự đặc biệt, 1 chữ số và 1 ký tự viết hoa
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt, 1 chữ số và 1 ký tự viết hoa.";
    }
  
    // 5. Số điện thoại: Phải bắt đầu bằng số 0 (chỉ kiểm tra nếu người dùng nhập)
    if (phone && !/^0\d{9,10}$/.test(phone)) {
      newErrors.phone = "Số điện thoại phải bắt đầu bằng số 0 và có 10-11 chữ số.";
    }
  
    // 6. Xác nhận mật khẩu: Phải khớp với mật khẩu
    if (password !== rePassword) {
      newErrors.rePassword = "Mật khẩu xác nhận không khớp.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createUser(name, email, password, userName, phone);
      alert("Đăng ký thành công!");
      // Thực hiện logic đăng ký ở đây (ví dụ: gọi API)
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 flex items-center justify-center gap-2">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative custom-register-container">
          <div className="flex flex-col md:flex-row items-center custom-register-content">
            {/* Form Section */}
            <div className="flex-1 md:pr-6 custom-form-section">
              <h2 className="text-2xl font-bold mb-4 custom-register-title">
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-blue-500 hover-underline"
                >
                  Đăng nhập
                </Link>
                <span className="text-black ml-4 hover-underline">Đăng ký</span>
              </h2>

              <form className="custom-register-form" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tên đăng nhập"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập lại mật khẩu"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                  {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword}</p>}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Số điện thoại (không bắt buộc)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition custom-register-button"
                >
                  Tạo tài khoản
                </button>
              </form>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex justify-center items-center flex-1 custom-image-section">
              <img
                src="https://cdn.divineshop.vn/static/235dccb09069e3d4eebc6227236f9dc2.svg"
                alt="Illustration"
                className="w-full max-w-xs custom-register-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;