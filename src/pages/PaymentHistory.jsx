import React, { useEffect, useState } from "react";
import { useUser } from "../provider/UserProvider";
import { useCart } from "../provider/CartProvider";

const PaymentHistory = () => {
  const { user, formatDate } = useUser();
  const { formatCurrency } = useCart();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/trans/get-trans-by-email?email=${user.email}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (data.transactions != null) {
          setTransaction(data.transactions);
        }
      } catch (err) {
        console.log("Xảy ra lỗi khi get transaction: ", err);
      }
    };
    fetchTrans();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h4 className="text-lg font-bold mb-2">Lịch sử giao dịch</h4>
      <p className="font-semibold text-gray-800 mb-4">
        Hiển thị tất cả các giao dịch bạn đã thực hiện tại Gamekey Shop
      </p>

      <form className="mb-4 grid grid-cols-1 md:grid-cols-6 gap-4">
        <input
          type="text"
          placeholder="Mô tả"
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
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
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
              Mô tả
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Số tiền
            </th>
            <th className="border border-gray-300 px-4 py-2 font-bold">
              Số dư
            </th>
          </tr>
        </thead>
        <tbody>
          {transaction.length > 0 ? (
            transaction.map((item) => (
              <tr key={item.transId}>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(item.transDate)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatCurrency(item.amount)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatCurrency(item.balance)}
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

export default PaymentHistory;
