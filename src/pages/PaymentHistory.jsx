import React from "react";

const PaymentHistory = () => {
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
            <th className="border border-gray-300 px-4 py-2 font-bold">Thời gian</th>
            <th className="border border-gray-300 px-4 py-2 font-bold">Mô tả</th>
            <th className="border border-gray-300 px-4 py-2 font-bold">Số tiền</th>
            <th className="border border-gray-300 px-4 py-2 font-bold">Số dư</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="text-center text-gray-700 py-4">
              Không có dữ liệu
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;