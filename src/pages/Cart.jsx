import { useState } from "react";
import { useCart } from "../provider/CartProvider";
import CartList from "../components/Cart/CartList";
import PayAuth from "../components/Cart/PayAuth";
const Cart = () => {
  const { totalItems } = useCart(); // Fixed typo in 'removeFromCart'
  const [status, setStatus] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="w-100 flex items-center justify-center gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-[rgb(36,122,242)] rounded-full"></div>
          <p>Giỏ hàng</p>
        </div>
        <div
          className={
            (status == 1 || status == 2) ? "bg-[rgb(36,122,242)]" : "bg-[rgb(157,164,176)]"
          }
          style={{ width: "37%", height: 1 }}
        ></div>
        <div className="flex items-center space-x-2">
          <div
            className={
              (status == 1 || status == 2)
                ? "w-4 h-4 bg-[rgb(36,122,242)] rounded-full"
                : "w-4 h-4 bg-[rgb(157,164,176)]  rounded-full"
            }
          ></div>
          <p>Xác nhận</p>
        </div>
        <div
          className={
            status == 2 ? "bg-[rgb(36,122,242)]" : "bg-[rgb(157,164,176)]"
          }
          style={{ width: "37%", height: 1 }}
        ></div>
        <div className="flex items-center space-x-2">
          <div
            className={
              status == 2
                ? "w-4 h-4 bg-[rgb(36,122,242)] rounded-full"
                : "w-4 h-4 bg-[rgb(157,164,176)]  rounded-full"
            }
          ></div>
          <p>Thanh toán</p>
        </div>
      </div>
      {status == 2 ? (
        <PayAuth />
      ) : (
        <>
          {totalItems > 0 ? (
            <CartList status={status} setStatus={setStatus}></CartList>
          ) : (
            <div
              className="flex bg-white mt-8 justify-center p-4 rounded-lg shadow-md gap-4"
              style={{ height: "60vh" }}
            >
              <div className="flex flex-col space-y-4 items-center justify-center ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwOMCokhISLytLOTqrD7o2SG_MwMidXcFYNg&s" width={400} />
                <p>
                  Thêm sản phẩm vào giỏ và quay lại trang này để thanh toán nha
                  bạn !!
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
