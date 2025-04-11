import { useNavigate } from "react-router-dom";
import { useCart } from "../../provider/CartProvider";
import { useUser } from "../../provider/UserProvider";
import { useState } from "react";

const PayBtn = (props) => {
  const {user} = useUser();
  const navigate = useNavigate();
  const { path } = props;
  const { content } = props;
  const { setStatus } = props;
  const { status } = props;
  const { className } = props;
  const { icon } = props;
  const [isSending, setIsSending] = useState(false);
  const handleOnPayConfirm = async () =>{
    if(isSending) return;
    setIsSending(true)
    try{
      const response = await fetch("http://localhost:5000/users/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: user.email, subject: "Xác thực trước khi mua hàng", content: "Mã xác thực thanh toán"})
      });
      console.log(response)
    }catch(error){
      console.log(error);
    }finally{
      setIsSending(false);
    }
  }

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
