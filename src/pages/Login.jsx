import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useUser } from "../provider/UserProvider";
import { login } from "../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const data = await response.json();
      if (!response.ok) {
        toast.warn(data.message);
        return;
      }
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      toast.warn(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 flex items-center justify-center gap-2">
        <div
          className="bg-white p-6 rounded-lg shadow-lg relative custom-login-container"
          style={{ maxWidth: "900px" }}
        >
          <div className="flex flex-col md:flex-row items-center custom-login-content">
            {/* Form Section */}
            <div className="flex-1 p-4 custom-form-section">
              <h2 className="text-2xl font-bold mb-4 custom-login-title">
                <span className="text-blue-500 hover-underline">Đăng nhập</span>
                <Link
                  to="/register"
                  className="text-gray-500 hover:text-blue-500 ml-4 hover-underline"
                >
                  Đăng ký
                </Link>
              </h2>
              <p className="text-gray-600 mb-6 custom-login-description">
                Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích
                và nhận nhiều ưu đãi hấp dẫn.
              </p>

              <form onSubmit={handleSubmit} className="custom-login-form">
                <div className="mb-4">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email hoặc tên đăng nhập"
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 custom-input"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    required
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 custom-input"
                  />
                </div>
                <div className="text-right mb-4">
                  <Link
                    to="/forgot-password"
                    className="text-blue-500 hover:underline custom-forgot-password"
                  >
                    Bạn quên mật khẩu?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition custom-login-button"
                >
                  Đăng nhập
                </button>
              </form>

              <div className="text-center my-6 text-gray-500 custom-login-divider">
                Hoặc đăng nhập bằng
              </div>

              <div className="flex justify-center gap-4 custom-social-login">
                <button className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded py-2 px-4 hover:bg-gray-200 custom-google-login">
                  <img
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="Google"
                    className="w-6 h-6 mr-2"
                  />
                  Google
                </button>
                <button className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded py-2 px-4 hover:bg-gray-200 custom-facebook-login">
                  <img
                    src="https://img.icons8.com/color/48/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6 mr-2"
                  />
                  Facebook
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:flex justify-center items-center flex-1 custom-image-section">
              <img
                src="https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg"
                alt="Illustration"
                className="w-full h-auto custom-login-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
