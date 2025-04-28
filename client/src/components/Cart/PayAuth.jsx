import { useState } from "react";
import { useCart } from "../../provider/CartProvider";
import { useUser } from "../../provider/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser, sendOrderMail } from "../../api/api";

const PayAuth = () => {
  const { user, setUser } = useUser();
  const { cart, clearCart, totalPrice } = useCart();
  const [authCodeInput, setAuthCodeInput] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setAuthCodeInput(e.target.value);
  };

  const handleOnConfirm = async () => {
    try {
      const authCodeResponse = await fetch(
        `http://localhost:5000/users/get-authCode?email=${user.email}`,
        {
          method: "GET",
        }
      );

      const authCodeData = await authCodeResponse.json();
      console.log(authCodeData.authCode);
      if (authCodeData.authCode !== parseInt(authCodeInput)) {
        alert("Mã xác thực không đúng. Vui lòng kiểm tra lại.");
        return;
      }

      const payBillResponse = await fetch(
        "http://localhost:5000/orders/pay-bill",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            authCode: authCodeInput,
            items: cart.map((item) => ({
              productID: item.id,
              image: item.thumbnail,
              productName: item.title,
              quantity: item.quantity,
              totalPrice: item.price * item.quantity,
            })),
            receiver: user.email,
            totalAmount: totalPrice,
          }),
        }
      );

      console.log(payBillResponse);
      if(!payBillResponse.ok) {
        const errorData = await payBillResponse.json();

        alert(errorData.message);
        navigate("/user/order-history");
        return;
      }
    
      
      const data = await payBillResponse.json();
      console.log(data);
      clearCart();
      toast.success(data.message);
      const token = localStorage.getItem("token");
      const user2 = await getCurrentUser(token);
      setUser(user2);
      navigate(`/user/order-history/order-detail/${data.order.orderId}`);

      const response3 =  await sendOrderMail({receiver: data.order.receiver, orderId: data.order.orderId});
      console.log(response3.message)
      
      await fetch("http://localhost:5000/users/reset-authCode", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div
      className="flex bg-white w-100 mt-8 p-4 rounded-lg shadow-md gap-4"
      style={{ height: "400px" }}
    >
      <div
        className="flex flex-col gap-6 mx-auto mt-10 text-center"
        style={{ width: "30%" }}
      >
        <h3 className="text-3xl font-medium">Nhập mã xác thực</h3>
        <input
          type="text"
          placeholder="Mã xác thực"
          className="border rounded py-2 px-3"
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="bg-blue-600 py-2 px-4 rounded text-white"
          onClick={() => {
            handleOnConfirm();
          }}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};
export default PayAuth;
