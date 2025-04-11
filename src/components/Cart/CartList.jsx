import { useUser } from "../../provider/UserProvider.jsx";
import { useCart } from "../../provider/CartProvider.jsx";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiGift, CiCreditCard1 } from "react-icons/ci";
import { LuScanLine } from "react-icons/lu";
import { useEffect, useState } from "react";
import PayBtn from "./PayBtn";
const CartList = (props) => {
  const { status, setStatus } = props;
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, formatCurrency } = useCart(); 
  const { user} = useUser();
  const navigate = useNavigate();
  const [myUser, setMyUser] = useState(user ? user : { soDu: 0 });

  return (
    <div className="flex bg-white w-100 mt-8 p-4 rounded-lg shadow-md gap-4">
      <div style={{ width: "68%" }}>
        <div className="flex items-center mb-4 space-x-2">
          <p className="text-3xl ">Giỏ hàng</p>
          <p className="text-center">({totalItems} sản phẩm)</p>
        </div>
        {cart.map((product) => (
          <div
            className="grid grid-cols-12 gap-3 rounded border border-gray-200 p-3 mb-3"
            key={product.id}
          >
            <Link to={`/game/${product.id}`} className="col-span-4">
              <img
                className="rounded"
                src={product.thumbnail}
                alt={product.title}
              />
            </Link>
            <div className="col-span-8 grid grid-rows-10 ">
              <div className="flex justify-between items-start row-span-7 border-b-2">
                <div style={{ width: "35%" }}>
                  <Link to={`/game/${product.id}`}>
                    <p className="text-lg font-bold">{product.title}</p>{" "}
                    {/* Larger font size for title */}
                  </Link>
                  <p className="text-sm text-gray-500">{product.genre}</p>{" "}
                  {/* Smaller font size for genre */}
                </div>
                <div
                  className="flex items-center space-x-4"
                  style={{ marginTop: 0 }}
                >
                  <div
                    className="flex items-center border rounded-lg "
                    style={{ width: "fit-content" }}
                  >
                    <button
                      className="px-3 py-1 text-sm  text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        updateQuantity(
                          product.id,
                          Math.max(1, product.quantity - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm text-indigo-500 font-bold border-x">
                      {product.quantity}
                    </span>{" "}
                    <button
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
              <div className="row-span-2 p-1">
                <button
                  className="text-red-500 flex items-center space-x-3"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FaTrashAlt /> <p>Xóa</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2" style={{ width: "32%" }}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Bạn muốn tặng cho bạn bè?</p>
            <CiGift className="text-2xl"></CiGift>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="p-2 rounded border border-gray-300 hover:ring-1 hover:ring-blue-700 focus:ring-1 focus:ring-blue-700 focus:outline-none"
              style={{ width: "70%" }}
              placeholder="Email người nhận"
            />
            <button className="rounded border border-gray-300 px-3 py-1 text-blue-600 hover:ring-1 hover:ring-blue-700">
              Áp dụng
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">Thanh toán</p>
            <div className="flex justify-between items-center border-b-2">
              <p>Tổng giá trị sản phẩm</p>
              <p>{formatCurrency(totalPrice)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Tổng giá trị phải thanh toán </p>
              <p>{formatCurrency(totalPrice)} </p>
            </div>
            <div className="flex justify-between items-center">
              <p>Số dư hiện tại </p>
              <p>{formatCurrency(myUser.soDu)}</p>
            </div>
            <div className="flex justify-between items-center">
              {myUser.soDu < totalPrice ? (
                <>
                  <p>Số tiền cần nạp thêm</p>
                  <p>{Math.abs(formatCurrency(myUser.soDu - totalPrice))}</p>
                </>
              ) : (
                <>
                  <p>Số dư sau khi thanh toán</p>
                  <p>{formatCurrency(myUser.soDu - totalPrice)}</p>
                </>
              )}
            </div>
          </div>
          {status == 1 ? (
            <>
              <PayBtn
                className="bg-[rgb(43,181,119)] py-2 rounded text-white font-bold flex justify-center gap-2 items-center"
                setStatus={setStatus}
                status={2}
                icon={<CiCreditCard1 className="text-2xl" />}
                content="Xác nhận thanh toán"
              />{" "}
              <p
                onClick={() => setStatus(0)}
                className="text-end text-[rgb(36,122,242)] font-medium hover:underline hover:cursor-pointer "
              >
                &lt; Trở về giỏ hàng
              </p>
            </>
          ) : (
            <>
              {user ? (
                user.soDu > totalPrice ? (
                  <PayBtn
                    content="Thanh toán dùng số dư"
                    setStatus={setStatus}
                    status={1}
                    className="bg-blue-600 py-2 rounded text-white font-bold"
                  />
                ) : (
                  <PayBtn
                    content="Nạp thêm vào tài khoản"
                    className="bg-blue-600 py-2 rounded text-white font-bold"
                  />
                )
              ) : (
                <PayBtn
                  path="/login"
                  className="bg-blue-600 py-2 rounded text-white font-bold"
                  content="Đăng nhập để thanh toán"
                />
              )}
              {user ? (
                <div className="flex flex-col gap-2">
                  <p className="text-center text-sm text-gray-600">
                    Quét mã thanh toán. Không cần nạp tiền
                  </p>
                  <PayBtn
                    className="bg-[rgb(173,31,112)] py-2 rounded text-white font-bold flex justify-center gap-2 items-center"
                    icon={<LuScanLine className="text-2xl" />}
                    content="Mua siêu tốc với MoMo"
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartList;
