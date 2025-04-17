import { Routes, Route } from "react-router-dom";
import "./app.css"
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
import Footer from "./components/Footer";
import Security from "./pages/Security";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/admin/Dashboard";
import LayoutDefault from "./components/admin/LayoutDefault";
import Analyst from "./pages/admin/Analyst";
import Message from "./pages/admin/Message";

function App() {
  return (
    <div className="min-h-screen bg-[rgb(242,243,245)]">
      <CartProvider>
        <UserProvider>
          <Navbar />
          <ToastContainer position="bottom-right" />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/:id" element={<GameDetail />} />
              <Route path="/games" element={<Game />} />
              <Route path="/genre/:id" element={<GameForCategories />} />
              <Route path="/game-title/:id" element={<GameByTitle />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/register" element={<Admin />} /> */}
              <Route path="/user" element={<UserProfile />}>
                <Route path="/user/profile" element={<Account />} />
                <Route
                  path="/user/order-history"
                  element={<OrderHistory />}
                />
                <Route
                  path="/user/payment-history"
                  element={<PaymentHistory />}
                />
                <Route
                  path="/user/order-history/order-detail/:id"
                  element={<OrderDetail />}
                />
                <Route path="/user/security" element={<Security />} />
              </Route>
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />}
              />
              <Route path='/admin' element={<LayoutDefault />}>
                <Route index element={<Dashboard />} />
                <Route path="/admin/analyst" element={<Analyst />} />
              </Route>

            </Routes>
          </main>
          <Footer />
          {/* <Footer/> */}
        </UserProvider>
      </CartProvider>
    </div>
  );
}

export default App;
