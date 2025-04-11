import SidebarMenu from "../components/User/SidebarMenu";
import Account from "./Account";
import OrderHistory from "./OrderHistory";
import PaymentHistory from "./PaymentHistory";
import { useNavigate, useLocation } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const renderContent = () => {
    switch (location.pathname) {
      case "/user/profile":
        return <Account />;
      case "/user/orderhistory":
        return <OrderHistory />;
      case "/user/paymenthistory":
        return <PaymentHistory />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <SidebarMenu/>
        </div>
        <div className="col-span-12 md:col-span-9">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
