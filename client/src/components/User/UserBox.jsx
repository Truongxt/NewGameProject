import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../provider/UserProvider";
import { RiProfileLine } from "react-icons/ri";
import { CgLogOut } from "react-icons/cg";
import { useCart } from "../../provider/CartProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineHistory } from "react-icons/md";
import { toast } from "react-toastify";
const UserBox = () => {
  const { user, getFirstName, setUser } = useUser(); // Lấy thông tin user từ context
  const { formatCurrency } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State để điều khiển dropdown
  const navigate = useNavigate();
  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  if (!user) {
    return (
      <div className="flex items-center text-gray-700 hover:text-blue-600">
        <Link to="/login">
          <span className="ml-1 text-sm">Tài khoản</span>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="relative p-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center text-gray-700 hover:text-blue-600">
        <span className="ml-1 text-sm font-medium">
          {user != null ? "Hi." + getFirstName(user.name) : ""}
        </span>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-[-40px] mt-2 w-[175px] bg-white border rounded-lg shadow-lg">
          <div className=" px-4 py-4 text-gray-700 hover:bg-gray-100 flex gap-4 flex-col items-start">
            <p className="leading-none">Số dư tài khoản:</p>
            <div className="flex items-center gap-4">
              <p className="font-[20px] font-bold leading-none">
                {formatCurrency(user.soDu)}
              </p>
              <Link to="/deposit" className="leading-none">
                <IoMdAddCircleOutline className="text-xl text-[rgb(23,120,255)]" />
              </Link>
            </div>
          </div>
          <Link
            to="/user"
            className=" px-4 py-4 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <RiProfileLine className="text-lg" />{" "}
            <p className="leading-none">Quản lý tài khoản</p>
          </Link>
          <Link
            to="/user/order-history"
            className=" px-4 py-4 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <MdOutlineHistory className="text-lg" />{" "}
            <p className="leading-none">Lịch sử mua hàng</p>
          </Link>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
              toast.success("Đã đăng xuất!")
            }}
            className="px-4 py-4 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <CgLogOut className="text-lg" />
            <p className="leading-none">Đăng xuất</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserBox;
