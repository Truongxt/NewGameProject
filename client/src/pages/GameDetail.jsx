import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkKeyGame, comment, getComment, getGameById } from "../api/api";
import { IoIosSend } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import {
  Row,
  Col,
  Image,
  Badge,
  Button,
  Alert,
  Typography,
  Divider,
  Space,
} from "antd";
import GoBack from "../components/GoBack";
import { useCart } from "../provider/CartProvider";
import { toast } from "react-toastify";
import { useUser } from "../provider/UserProvider";
import { CommentItem } from "../components/SmallComment";
const { Title, Text } = Typography;

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function GameDetail() {
  const { id } = useParams();
  const { user, formatDate } = useUser();
  const [game, setGame] = useState({});
  const { addToCart } = useCart();
  const [cmts, setCmts] = useState([]); // các cmt mà user đã bình luận trước đó được fetch về
  const [cmt, setCmt] = useState(""); //cmt trên ô nhập bình luận
  const [replyCmt, setReplyCmt] = useState("");
  const [currentShow, setCurrentShow] = useState("");
  const [errors, setErrors] = useState({});
  const [isCmtFocus, setCmtFocus] = useState(false);
  const [replySuccess, setStatusReply] = useState(false);
  const [exist, setExist] = useState(0);
  
  const validate = () => {
    let newErr = {};
    if (isCmtFocus && cmt == "") {
      newErr.cmt = "Hãy nhập bình luận trước khi gửi.";
    }
    if (currentShow && replyCmt == "") {
      newErr.reply = "Hãy nhập bình luận trước khi gửi.";
    }
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const checkExistKeyGame = async () => {
    try {
      const respone = await checkKeyGame(id);
      setExist(respone);
      console.log(respone);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCmt = async () => {
    try {
      const respone = await getComment({ gameId: id });
      const data = await respone.json();
      setCmts(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGameById(Number(id));
        setGame(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    checkExistKeyGame();
    fetchGame();
    fetchCmt();
  }, [id]);

  const handleOnSendComment = async (e) => {
    e.preventDefault();
    if (user == null) {
      toast.warn("Bạn cần đăng nhập để bình luận.");
      return;
    }
    if (validate()) {
      try {
        const response = await comment({
          gameId: id,
          userEmail: user.email,
          content: cmt,
        });
        const data = await response.json();
        if (!response.ok) {
          toast.warn(data.message);
          return;
        }
        toast.success(data.message);
        fetchCmt();
        setCmt("");
      } catch (err) {
        toast.warn(err);
      }
    }
  };

  const handleOnRepCmt = async () => {
    if (user == null) {
      toast.warn("Bạn cần đăng nhập để bình luận.");
      return;
    }
    if (validate()) {
      try {
        const response = await comment({
          gameId: id,
          userEmail: user.email,
          content: replyCmt,
          responseFor: currentShow,
        });
        const data = await response.json();
        if (!response.ok) {
          toast.warn(data.message);
          return;
        }
        toast.success(data.message);
        setStatusReply(!replySuccess);
        setReplyCmt("");
      } catch (err) {
        toast.warn(err);
      }
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "24px" }}>
      <GoBack />
      <Row
        gutter={24}
        style={{ background: "#fff", padding: "16px", borderRadius: "8px" }}
      >
        <Col span={8}>
          <Image
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            src={game.thumbnail}
          />
        </Col>
        <Col span={16}>
          <Title level={2} color="red">
            {game.title}
          </Title>
          <Divider />
          <Space direction="vertical" size="middle">
            <Text strong>
              Tình trạng:{" "}
              {exist ? (
                <Badge
                  status="success"
                  text="Còn hàng"
                  style={{ marginLeft: "10px" }}
                />
              ) : (
                <Badge
                  status="warning"
                  text="Hết hàng"
                  style={{ marginLeft: "10px" }}
                />
              )}
            </Text>
            <Text strong>Thể loại: {game.genre}</Text>
            <Title level={3} style={{ margin: 0 }} color="yellow">
              {formatPrice(game.price)}
            </Title>
            <Text delete>
              {formatPrice(game.original_price)}
              <Badge
                color="red"
                text={`-${game.discount}`}
                style={{ marginLeft: "20px" }}
              />
            </Text>
            <Space size="large">
              <Button type="primary" size="large">
                Mua ngay
              </Button>
              <Button
                size="large"
                onClick={() => {
                  addToCart(game);
                  setExist(exist - 1);
                }}
                disabled={!exist > 0}
                style={{width: "170px"}}
              >
                {exist > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Alert
        message="Lưu ý"
        type="info"
        description={
          <ul>
            <li>
              Khi nhập code vào tài khoản Steam, tiền sẽ được quy đổi thành VNĐ
              theo tỉ giá ngày hôm đó.
            </li>
            <li>
              Tải game xong thì vẫn mở online mode để vào lần đầu, sau đó phải
              thoát ra và bật offline mode.
            </li>
            <li>
              Tham khảo hướng dẫn này để chuyển đổi giữa các tài khoản Steam.
            </li>
            <li>
              Vui lòng không đổi email và mật khẩu, Divine Shop không hỗ trợ bảo
              hành nếu bạn đổi email và mật khẩu.
            </li>
            <li>Chỉ hỗ trợ đăng nhập và sử dụng trên 1 thiết bị cá nhân.</li>
          </ul>
        }
      />
      <Divider />
      <Title level={4}>Chi tiết sản phẩm</Title>
      <Text>{game.short_description}</Text>
      <Title level={5}>Quy trình nhận hàng</Title>
      <ol>
        <li>
          Đây là Steam Wallet Code dùng để nạp tiền vào tài khoản Steam Wallet.
        </li>
        <li>
          Sau khi mua hàng thành công bạn sẽ nhận được ngay code Steam Wallet.
        </li>
        <li>Thời gian xử lý: Nhận code ngay sau khi mua hàng thành công.</li>
        <li>Hình thức nhận hàng: Code kích hoạt trong đơn hàng.</li>
        <li>Hướng dẫn nhập code Steam Wallet.</li>
      </ol>
      <Image src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/extras/SteamGIF_Scene.gif?t=1718690162" />
      <Divider />
      <Title level={4}>Cấu hình</Title>
      <Title level={5}>Yêu cầu hệ thống</Title>
      <Divider />
      <div className="flex flex-col gap-3">
        <Title level={4}>Bình luận</Title>
        <Text>Thời gian phản hồi trung bình: 5 phút</Text>
        <form className="flex flex-col gap-2" style={{ width: "80%" }}>
          <textarea
            value={cmt}
            onFocus={() => setCmtFocus(true)}
            onBlur={() => setCmtFocus(false)}
            className="border border-gray-300 rounded p-3 hover:outline-none hover:ring-1 hover:ring-[rgb(36,122,242)] focus:outline-none focus:ring-1 focus:ring-[rgb(36,122,242)]"
            placeholder="Nhập nội dung bình luận"
            onChange={(e) => setCmt(e.target.value)}
            style={{ width: "100%", height: "120px" }}
          />
          {errors.cmt && <p className="text-red-500 text-sm">{errors.cmt}</p>}
          <button
            onClick={(e) => handleOnSendComment(e)}
            type="submit"
            className="flex items-center gap-2 self-end bottom-0 right-0 bg-[rgb(36,122,242)] rounded text-white font-medium p-[9px]"
            style={{ width: "150px" }}
          >
            <IoIosSend className="text-lg" />
            Gửi bình luận
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-5">
        {cmts.map((cmt) => (
          <div className="flex gap-5" key={cmt.commentId}>
            <FaRegUserCircle className="text-[50px] text-[rgb(50,187,237)]" />
            <div className="flex flex-col gap-1">
              <p className="font-medium">{cmt.userName}</p>
              <p className="text-[14px] text-gray-500 font-[500]">
                Bình luận vào {formatDate(cmt.commentDate)}
              </p>
              <p>{cmt.content}</p>
              <p
                onClick={() => {
                  setCurrentShow(currentShow ? "" : cmt.commentId);
                }}
                className="font-medium text-[rgb(36,122,242)] hover:cursor-pointer"
              >
                Trả lời
              </p>
              <div>
                <CommentItem
                  parentId={cmt.commentId}
                  gameId={id}
                  setCurrentShow={setCurrentShow}
                  currentShow={currentShow}
                  handleOnRepCmt={handleOnRepCmt}
                  setReplyCmt={setReplyCmt}
                  replyCmt={replyCmt}
                  errors={errors}
                  replySuccess={replySuccess}
                  setStatusReply={setStatusReply}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameDetail;
