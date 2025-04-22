import {
  CloseOutlined,
  OpenAIOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Layout, Space, Typography } from "antd";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";
import { useCart } from "../provider/CartProvider.jsx";
import UserBox from "../components/User/UserBox"; // Import UserBox component

const { Header } = Layout;
const { Text } = Typography;

function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    //dẫn tới trang tìm kiếm
    if (inputRef.current.input.value === "") return;

    navigate(`/game-title/${inputRef.current.input.value}`);
  };

  return (
    <Layout>
      <Header className="bg-white shadow-sm fixed w-full z-50 flex items-center justify-between px-6">
        <Link to="/">
          <Text className="text-2xl font-bold text-blue-600">GameStore</Text>
        </Link>

        <Form layout="inline" onFinish={handleSubmit}>
          <Form.Item>
            <Input
              placeholder="Tìm kiếm game..."
              prefix={<SearchOutlined className="text-gray-400 " />}
              style={{ width: 500 }}
              ref={inputRef}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>

        <Space>
          <Link to="/cart">
            <Button type="text" icon={<ShoppingCartOutlined />}>
              Giỏ hàng ({totalItems})
            </Button>
          </Link>
          <Button type="text" icon={<UserOutlined />}>
            <UserBox/>
          </Button>
          <Button type="text" icon={<OpenAIOutlined />} onClick={showDrawer}>
            Trợ lý AI
          </Button>
        </Space>
      </Header>

      <Drawer
        title={
          <Space>
            <OpenAIOutlined /> Trợ lý AI
          </Space>
        }
        width={520}
        onClose={onClose}
        open={open}
        closeIcon={<CloseOutlined />}
      >
        <ChatBot />
      </Drawer>
    </Layout>
  );
}

export default Navbar;
