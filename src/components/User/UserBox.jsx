import { User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../provider/UserProvider';
import { RiProfileLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
const UserBox = () => {
  const { user, getFirstName, setUser } = useUser(); // Lấy thông tin user từ context
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
        <span className="ml-1 text-sm font-medium">Hi. {getFirstName(user.name)}</span>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute right-[-40px] mt-2 w-[140px] bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <Link
            to="/user" 
            className="block px-4 text-gray-700 hover:bg-gray-100 flex justifty-center items-center gap-2"
          >
           <RiProfileLine className='text-lg'/> <p>Hồ sơ</p>
          </Link>
          <Link
            to="/settings"
            className="block px-4 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
             <IoSettingsOutline className='text-lg'/><p>Cài đặt</p>
          </Link>
          <Link
            onClick={() => {
              localStorage.removeItem('auth'); 
              localStorage.removeItem('user');
              setUser(null);
              navigate("/");
            }}
            className="block text-center text-left px-4 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <CgLogOut className='text-lg'/><p>Đăng xuất</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserBox;