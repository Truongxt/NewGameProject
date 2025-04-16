import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgetPassword, verifyResetCode } from "../api/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false); //status false là nhập thông tin, status true là nhập auth code để xác nhận
  const [authCode, setAuthCode] = useState();

  const validateForm = () => {
    const newErrors = {};

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        newPassword
      )
    ) {
      newErrors.newPassword =
        "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt, 1 chữ số và 1 ký tự viết hoa.";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnComfirm = async (e) => {
    e.preventDefault();
    try{
      const response = await verifyResetCode({email, code: authCode});
      const data = await response.json();
      if (!response.ok) {
        toast.warn(data.message);
        return;
      }
      toast.success(data.message);
      setStatus(false);
      navigate("/login");
    }catch(err){
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau. "+ err);
    }
  }

  const handleOnDatLaiMatKhau = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const response = await forgetPassword({ email, newPassword });
        const data = await response.json();
        if (!response.ok) {
          toast.warn(data.message);
          return;
        }
        toast.success(data.message);
        setStatus(true);
      }
    } catch (err) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau. " + err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 flex items-center justify-center gap-2">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative custom-register-container">
          <div className="flex flex-col md:flex-row items-center ">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => navigate("/")}
            ></button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {status ? (
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Nhập mã xác thực</h2>
                  <p className="text-gray-600 mb-6">
                  Vui lòng nhập mã OTP được gửi tới email của bạn để xác thực
                  </p>
                  <form>
                  <div className="mb-4">
                      <input
                        type="text"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mã xác thực"
                      />
                    </div>
                    <button
                      onClick={(e) => handleOnComfirm(e)}
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      Xác nhận
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Đặt lại mật khẩu</h2>
                  <p className="text-gray-600 mb-6">
                    Vui lòng hoàn tất các thông tin xác thực bên dưới để đặt lại
                    mật khẩu cho tài khoản của bạn.
                  </p>
                  <form>
                    <div className="mb-4">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email hoặc tên đăng nhập"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Mật khẩu mới"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleOnDatLaiMatKhau(e)}
                      type="submit"
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                      Đặt lại mật khẩu
                    </button>
                  </form>
                  <p className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Quay lại trang đăng nhập
                    </Link>
                  </p>
                </div>
              )}
              <div className="flex justify-center items-center">
                <img
                  src="https://cdn.divineshop.vn/static/c92dc142033ca6a66cda62bc0aec491b.svg"
                  alt="Illustration"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
