import React, { useState } from "react";
import { changePassword } from "../api/api";
import { useUser } from "../provider/UserProvider";
import { toast } from "react-toastify";

export default function Security() {
  // State để lưu dữ liệu từ các input
  const { user } = useUser();
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({}); // State để lưu lỗi
  const [status, setStatus] = useState(false); //status false là nhập thông tin, status true là nhập auth code để xác nhận
  const [authCode, setAuthCode] = useState();

  const inputClass =
    "w-full border border-gray-300 rounded px-4 pt-[14px] focus:ring-2 focus:ring-blue-500 focus:outline-none peer placeholder-transparent";
  const labelClass =
    "absolute left-0 -top-[2px] px-4 text-[13px] text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-[2px] peer-focus:text-gray-600";

  // Hàm kiểm tra mật khẩu mới
  const validateForm = () => {
    const newErrors = {};

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        newPass
      )
    ) {
      newErrors.newPass =
        "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt, 1 chữ số và 1 ký tự viết hoa.";
    }

    if (newPass !== confirmPass) {
      newErrors.confirmPass = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnComfirm = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyResetCode({ email, code: authCode });
      const data = await response.json();
      if (!response.ok) {
        toast.warn(data.message);
        return;
      }
      toast.success(data.message);
      setStatus(false);
      setAuthCode("");
    } catch (err) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau. " + err);
    }
  };
  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        const response = await changePassword({
          email: user.email,
          currentPass,
          newPass,
        });
        const data = await response.json();
        if (!response.ok) {
          toast.warn(data.message);
          return;
        }
        toast.success(data.message);
        setStatus(true);
        setCurrentPass("");
        setNewPass("");
        setConfirmPass("");
      }
    } catch (err) {
      toast.warn(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="border-b">
        <h4 className="text-lg font-bold mb-2">Mật khẩu</h4>
        <p className="font-semibold text-gray-800 mb-4">
          Đổi mật khẩu của bạn tại đây
        </p>
      </div>
      <div className="grid grid-cols-12 mt-4">
        <div className="col-span-6 border-r pr-3">
          <p className="text-[18px] font-medium mb-3">
            {" "}
            {status ? "Nhập mã xác thực" : "Đổi mật khẩu"}
          </p>
          {status ? (
            <p className="text-[14px] mb-3">
              Vui lòng nhập mã OTP được gửi tới email của bạn để xác thực
            </p>
          ) : (
            ""
          )}
          {status ? (
            <form>
              <div className="mb-3 relative">
                <input
                  id="currentPass"
                  type="password"
                  className={inputClass}
                  placeholder=""
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                />
                <label htmlFor="currentPass" className={labelClass}>
                  Mã xác thực
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Xác nhận
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3 relative">
                <input
                  id="currentPass"
                  type="password"
                  className={inputClass}
                  placeholder=" "
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)} // Cập nhật state
                />
                <label htmlFor="currentPass" className={labelClass}>
                  Mật khẩu hiện tại
                </label>
              </div>
              <div className="mb-3 relative">
                <input
                  id="newPass"
                  type="password"
                  className={inputClass}
                  placeholder=" "
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)} // Cập nhật state
                />
                <label htmlFor="newPass" className={labelClass}>
                  Mật khẩu mới
                </label>
                {errors.newPass && (
                  <p className="text-red-500 text-sm">{errors.newPass}</p>
                )}
              </div>
              <div className="mb-3 relative">
                <input
                  id="confirmPass"
                  type="password"
                  className={inputClass}
                  placeholder=" "
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)} // Cập nhật state
                />
                <label htmlFor="confirmPass" className={labelClass}>
                  Nhập lại mật khẩu mới
                </label>
                {errors.confirmPass && (
                  <p className="text-red-500 text-sm">{errors.confirmPass}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Lưu thay đổi
              </button>
            </form>
          )}
        </div>
        {status ? (
          ""
        ) : (
          <div className="text-[15px] text-gray-600 col-span-6 flex items-center">
            <div className="ml-10">
              <p className="text-[17px] text-black font-medium mb-2">
                Mật khẩu của bạn
              </p>
              <p className="mb-1">Phải từ 8 ký tự trở lên</p>
              <p className="mb-1">Nên có ít nhất 1 số hoặc 1 ký tự đặc biệt</p>
              <p className="mb-1">
                Không nên giống với mật khẩu được sử dụng gần đây
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
