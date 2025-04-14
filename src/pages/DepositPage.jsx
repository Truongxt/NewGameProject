import React, { useState } from "react";
import { useUser } from "../provider/UserProvider";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../provider/CartProvider";
export default function DepositPage() {
  const navigate = useNavigate();
  const { formatCurrency } = useCart();
  const { user } = useUser();
  const [transactionId, setTransactionId] = useState("");
  const [isOpen, setIsOpen] = useState(-1);
  const [isOpenModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountlt1000, setStatusAmount] = useState(false);
  const [dataQR, setDataQR] = useState("");
  const phuongThuc = [
    {
      id: 0,
      title: "Chuyển Khoản Ngân Hàng 24/7",
      sub: "Chuyển khoản ngân hàng online hoặc tại quầy giao dịch",
      image:
        "https://res.cloudinary.com/dzcwbvlk4/image/upload/v1744473707/phuongThucThanhToan/e88frchnot9rqxnktpl6.png",
    },
    {
      id: 1,
      title: "Thanh toán VNPAY-QR",
      sub: "Quét mã QR PAY trên ứng dụng Mobile Banking, phí giao dịch 2%",
      image:
        "https://res.cloudinary.com/dzcwbvlk4/image/upload/v1744473707/phuongThucThanhToan/gxo5lcnczirzaclpbrxj.png",
      phi: 0.02,
    },
    {
      id: 2,
      title: "Nạp tiền qua thẻ cào Viettel",
      sub: "Nạp tiền qua thẻ cào Viettel, phí giao dịch 30%",
      image:
        "https://res.cloudinary.com/dzcwbvlk4/image/upload/v1744473707/phuongThucThanhToan/ih25rpziy0kzuhadzr8u.png",
      phi: 0.3,
    },
    {
      id: 3,
      title: "Nạp số dư trực tiếp bằng Momo Payment",
      sub: "Nạp Dcoin tự động liên kết với Momo, hoàn thành tức thì. Phí 5%",
      image:
        "https://res.cloudinary.com/dzcwbvlk4/image/upload/v1744473707/phuongThucThanhToan/go5ocfxnb51v2pyuv7qb.png",
      phi: 0.05,
    },
  ];

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleonSubmit = async () => {
    if (amount < 1000) {
      setStatusAmount(true);
    } else {
      try {
        const response = await fetch(`http://localhost:5000/trans/deposit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount: amount,
            description: phuongThuc[isOpen].title,
            subject: "Xác thực trước khi mua hàng",
            content: "Mã xác thực thanh toán",
          }),
        });
        const transId = await response.json().then((data) => data.transId);
        setTransactionId(transId);
        const rs2 = await fetch(
          `http://localhost:5000/trans/get-confirm?transId=${transId}`,
          { method: "GET" }
        );
        const qrData = await rs2.json().then((data) => data.dataQr);
        console.log(qrData);
        setDataQR(qrData);
        setStatusAmount(false);
        setOpenModal(true);
        startPolling(transId);
      } catch (err) {
        console.error("Lỗi khi gửi yêu cầu:", err);
      }
    }
  };
  const startPolling = (transId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/trans/status?transId=${transId}`
        );
  
        if (response.status === 404) {
          clearInterval(interval); // Dừng polling nếu giao dịch không tồn tại
          setOpenModal(false); // Đóng modal nếu đang mở
          return;
        }
  
        const data = await response.json();
  
        if (data.status === true) {
          clearInterval(interval); // Dừng polling
          setOpenModal(false); // Đóng modal
          navigate("/user/payment-history"); // Chuyển sang trang lịch sử giao dịch
        }
      } catch (err) {
        console.error("Lỗi khi kiểm tra trạng thái giao dịch:", err);
      }
    }, 3000);
  };

  const deleteTrans = async (transId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/trans/delete?transId=${transId}`,
        { method: "DELETE" }
      );
      console.log(await response.json().message);
    } catch (err) {
      console.error("Lỗi khi xóa giao dịch:", err);
    }
  };
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-8 rounded shadow bg-white mt-7">
      <div>
        <div>
          <h2 className="text-xl font-medium mb-2">Nạp tiền vào tài khoản</h2>
          <p className="text-[15px]">
            Bạn có thể chọn các phương thức thanh toán khả dụng bên dưới
          </p>
        </div>
        <div className="border rounded-[7px] shadown mt-4">
          {phuongThuc.map((item) => (
            <div key={item.id}>
              <div
                className={
                  item.id != isOpen && isOpen != -1
                    ? "flex gap-4 border-t p-3 items-center hover:cursor-pointer opacity-30"
                    : "flex gap-4 border-t p-3 items-center hover:cursor-pointer"
                }
                onClick={() => {
                  setIsOpen(item.id == isOpen ? -1 : item.id),
                    setStatusAmount(false),
                    setAmount("");
                }}
              >
                <img
                  src={item.image}
                  style={{ width: "50px", height: "50px" }}
                  alt={item.title}
                />
                <div>
                  <p className="text-[16px] font-medium">{item.title}</p>
                  <p className="text-[12px] mt-1">{item.sub}</p>
                </div>
              </div>
              {isOpen === item.id ? (
                <div className="py-5 px-10 border-t border-b flex flex-col gap-4">
                  <p className="text-[15px]">
                    Mở App ngân hàng trên điện thoại, chọn phần QR Pay và nhập
                    số tiền bạn muốn nạp vào khung bên dưới.
                  </p>
                  <div>
                    <div className="flex gap-4">
                      <input
                        placeholder="Nhập số tiền"
                        type="text"
                        value={amount} // Hiển thị giá trị đã định dạng
                        onChange={handleAmountChange} // Gọi hàm xử lý khi nhập
                        onKeyDown={(e) => {
                          // Chỉ cho phép nhập số, Backspace, Delete, và các phím điều khiển
                          if (
                            !/[0-9]/.test(e.key) && // Không phải số
                            e.key !== "Backspace" && // Không phải Backspace
                            e.key !== "Delete" && // Không phải Delete
                            e.key !== "ArrowLeft" && // Không phải mũi tên trái
                            e.key !== "ArrowRight" && // Không phải mũi tên phải
                            e.key !== "Tab" // Không phải Tab
                          ) {
                            e.preventDefault(); // Chặn hành động mặc định
                          }
                        }}
                        className="border border-gray-300 rounded py-[8px] px-3 focus:bring focus:bring-[rgb(23,120,255)]"
                        style={{ width: "350px" }}
                      />
                      <button
                        className="bg-[rgb(23,120,255)] px-4 rounded text-white font-medium text-[14px]"
                        onClick={() => handleonSubmit()}
                      >
                        Nạp Coin
                      </button>
                    </div>
                    {amountlt1000 ? (
                      <p className="mt-3 text-[rgb(219,53,69)]">
                        Giá trị tối thiếu bạn có thể nhập là 1000
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {isOpenModal ? (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
          style={{ zIndex: 1000 }}
        >
          <div
            className="bg-white p-6 rounded shadow-lg"
            style={{ width: "700px" }}
          >
            <div className="relative flex justify-between">
              <div className="flex gap-4">
                <img
                  src={phuongThuc[isOpen].image}
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <p className="font-medium text-lg mb-2">
                    {phuongThuc[isOpen].title}
                  </p>
                  <p>{phuongThuc[isOpen].sub}</p>
                </div>
              </div>
              <p
                onClick={() => {setOpenModal(false), deleteTrans(transactionId)}}
                className="absolute right-[-5px] top-[-10px] text-xl hover:border hover:cursor-pointer px-2 flex items-center"
              >
                X
              </p>
            </div>
            <div className="flex mt-2 mx-2 py-6 border-b border-t justify-between font-medium">
              <p>Số tiền: {formatCurrency(amount)}</p>
              <p>
                Phí giao dịch: {formatCurrency(amount * phuongThuc[isOpen].phi)}{" "}
                ({phuongThuc[isOpen].phi * 100}%)
              </p>
              <p>
                Tổng tiền:{" "}
                {formatCurrency(amount + phuongThuc[isOpen].phi * 100)}
              </p>
            </div>
            <div className="mt-2 flex gap-5 items-center">
              <QRCodeSVG value={dataQR} width={200} height={200} />
              <p className="font-medium">
                Sử dụng phương tiện thanh toán (App) tương ứng để quét QR thanh
                toán
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
