import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../provider/UserProvider";
import { useCart } from "../provider/CartProvider";

export default function OrderDetail() {
  const { formatDate } = useUser();
  const { formatCurrency } = useCart();
  const { id } = useParams();
  const [order, setOrder] = useState({ items: [] });
  useEffect(() => {
    const fechtOrder = async () => {
      const response = await fetch(
        `http://localhost:5000/orders/get-order?orderId=${id}`,
        { method: "GET" }
      );
      const data = await response.json();
      if (data.order != null) {
        setOrder(data.order);
      }
    };
    fechtOrder();
  }, []);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="border-b pb-3">
        <h3 className="text-lg font-bold mb-3">
          Chi tiết đơn hàng #{order.orderId}
        </h3>
        <p className="text-[15px]">
          Hiển thị thông tin các sản phẩm bạn đã mua tại GameShop
        </p>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <h5 className="font-bold mb-3">Thông tin đơn hàng</h5>
          <p className="mb-1 text-[15px]">Mã đơn hàng: #{order.orderId}</p>
          <p className="mb-1 text-[15px]">
            Ngày tạo: {formatDate(order.orderDate)}
          </p>
          <p className="mb-1 text-[15px]">Người nhận: {order.receiver}</p>
        </div>
        <div className="col-span-6">
          <p className="font-bold mb-3">Giá trị đơn hàng</p>
          <div className="flex gap-10 mb-1 text-[15px]">
            <p>Tổng giá trị sản phẩm: </p>
            <p>{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>
      </div>
      <div className="border-t mt-3 pt-3">
        {order.items.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-5 mb-4 border rounded p-2">
            <img src={item.image} className="col-span-3 rounded"/>
            <p className="font-medium col-span-3">{item.productName}</p>
            <p className="font-medium col-span-3">Số lượng: {item.quantity}</p>
            <p className="font-medium col-span-3">{formatCurrency(item.totalPrice)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
