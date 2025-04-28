import { useNavigate } from "react-router-dom";
import { useCart } from "../../provider/CartProvider";
import { useUser } from "../../provider/UserProvider";
import { useState } from "react";
import { verifyPayment } from "../../api/api";
import { toast } from "react-toastify";

const PayBtn = (props) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { path } = props;
  const { content } = props;
  const { setStatus } = props;
  const { status } = props;
  const { className } = props;
  const { icon } = props;
  const [isSending, setIsSending] = useState(false);
  const handleOnPayConfirm = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      const response = await verifyPayment({
        email: user.email,
        subject: "Xác thực trước khi mua hàng",
        content: "Mã xác thực thanh toán",
      });
      toast.success(response.message);  
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <button
      className={className ? className : ""}
      onClick={() => {
        handleOnPayConfirm();
        if (setStatus) setStatus(status);
        if (path) navigate(path);
      }}
    >
      {icon ? icon : ""}
      {content}
    </button>
  );
};

export default PayBtn;
