import { useLocation } from "react-router-dom";
import SidebarMenu from "../components/User/SidebarMenu";
import Account from "./Account";
import OrderDetail from "./OrderDetail";
import OrderHistory from "./OrderHistory";
import PaymentHistory from "./PaymentHistory";
import Security from "./Security";

const UserProfile = () => {
  const location = useLocation();
  const renderContent = () => {
    if (location.pathname === "/user/profile") {
      return <Account />;
    }
    if (location.pathname === "/user/order-history") {
      return <OrderHistory />;
    }
    if (location.pathname === "/user/payment-history") {
      return <PaymentHistory />;
    }
    if (location.pathname.startsWith("/user/order-history/order-detail/")) {
      return <OrderDetail />;
    }
    if (location.pathname === "/user/security") {
      return <Security />;
    }
    return <Account />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <SidebarMenu />
        </div>
        <div className="col-span-12 md:col-span-9">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
