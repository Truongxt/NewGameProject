import { Routes, Route, useLocation } from "react-router-dom";
import "./app.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Game from "./pages/Game";
import GameForCategories from "./pages/GameForCategories";
import GameByTitle from "./pages/GameByTitle";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Account from "./pages/Account";
import OrderHistory from "./pages/OrderHistory";
import PaymentHistory from "./pages/PaymentHistory";
import { CartProvider } from "./provider/CartProvider";
import { UserProvider } from "./provider/UserProvider";
import OrderDetail from "./pages/OrderDetail";
import DepositPage from "./pages/DepositPage";
import ForgotPassword from "./pages/ForgotPassword";
import Security from "./pages/Security";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/admin/Dashboard";
import LayoutDefault from "./components/admin/LayoutDefault";
import Analyst from "./pages/admin/Analyst";
import Message from "./pages/admin/Message";
import LoginAdminPage from "./pages/LoginAdminPage";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/login");
  console.log(isAdminRoute);

  return (
    <div className={`min-h-screen ${isAdminRoute ? "bg-white" : "bg-[rgb(242,243,245)]"}`}>
      <CartProvider>
        <UserProvider>
          {!isAdminRoute && <Navbar />}
          <ToastContainer position="bottom-right" />
          <main className={`${isAdminRoute ? "pt-0" : "pt-16"} ${isAdminRoute ? "w-full h-full" : ""}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/games" element={<Game />} />
              <Route path="/genre/:id" element={<GameForCategories />} />
              <Route path="/game-title/:id" element={<GameByTitle />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute><LayoutDefault /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="analyst" element={<Analyst />} />
                <Route path="message" element={<Message />} />
              </Route>
              <Route path="/login-admin" element={<LoginAdminPage />} />

              {/* User Routes */}
              <Route path="/user" element={<UserProfile />}>
                <Route path="profile" element={<Account />} />
                <Route path="order-history" element={<OrderHistory />} />
                <Route path="payment-history" element={<PaymentHistory />} />
                <Route path="order-history/order-detail/:id" element={<OrderDetail />} />
                <Route path="security" element={<Security />} />
              </Route>

              {/* Other Routes */}
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>
        </UserProvider>
      </CartProvider>
    </div>
  );
}

export default App;
