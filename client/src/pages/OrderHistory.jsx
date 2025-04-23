import React, { useEffect, useState } from "react";
import { useUser } from "../provider/UserProvider";
import { Link } from "react-router-dom";
import { useCart } from "../provider/CartProvider";

const OrderHistory = () => {
  const { user, formatDate } = useUser();
  const { formatCurrency } = useCart();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/orders/get-orders?email=${user.email}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (data.orders != null) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.log("Xảy ra lỗi khi get order: ", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-bold mb-2">Lịch sử đơn hàng</h4>
      <p className="font-semibold text-gray-800 mb-4">
        Hiển thị thông tin các sản phẩm bạn đã mua tại Gamekey Shop
      </p>

      <form className="mb-4 grid grid-cols-12 md:grid-cols-6 gap-4">
        <input
          type="text"
          placeholder="Mã đơn hàng"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Số tiền từ"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Số tiền đến"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          placeholder="Từ ngày"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="date"
          placeholder="Đến ngày"
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="col-span-1 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Lọc
        </button>
      </form>

      <table className="w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Thời gian
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Mã đơn hàng
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Sản phẩm
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Tổng tiền
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((item) => (
              <tr key={item.orderId}>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(item.orderDate)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.orderId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.items.map((sp) => (
                    <div className="flex justify-between my-2" key={sp.productId}>
                      <p>{sp.productName}</p>
                      <p>x{sp.quantity}</p>
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatCurrency(item.totalAmount)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/user/order-history/order-detail/${item.orderId}`}>
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-700 py-4">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
