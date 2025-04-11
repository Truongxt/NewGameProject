import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById } from '../api/api';
import { Row, Col, Image, Badge, Button, Alert, Typography, Divider, Space } from 'antd';
import GoBack from '../components/GoBack';
import { useCart } from '../provider/CartProvider';
const { Title, Text } = Typography;

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGameById(Number(id));
        setGame(data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchGame();
  }, [id]);

  return (
    <div style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
      <GoBack />
      <Row gutter={24} style={{ background: '#fff', padding: '16px', borderRadius: '8px' }}>
        <Col span={8}>
          <Image style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} src={game.thumbnail} />
        </Col>
        <Col span={16}>
          <Title level={2} color='red'>{game.title}</Title>
          <Divider />
          <Space direction="vertical" size="middle">
            <Text strong>Tình trạng: <Badge status="success" text="Còn hàng" style={{ marginLeft: "10px" }} /></Text>
            <Text strong>Thể loại: {game.genre}</Text>
            <Title level={3} style={{ margin: 0, }} color='yellow'>{formatPrice(game.price)}</Title>
            <Text delete>
              {formatPrice(game.original_price)}
              <Badge color="red" text={`-${game.discount}`} style={{ marginLeft: "20px" }} />
            </Text>
            <Space size="large">
              <Button type="primary" size="large">Mua ngay</Button>
              <Button size="large" onClick={()=>{addToCart(game)}}>Thêm vào giỏ hàng</Button>
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
            <li>Khi nhập code vào tài khoản Steam, tiền sẽ được quy đổi thành VNĐ theo tỉ giá ngày hôm đó.</li>
            <li>Tải game xong thì vẫn mở online mode để vào lần đầu, sau đó phải thoát ra và bật offline mode.</li>
            <li>Tham khảo hướng dẫn này để chuyển đổi giữa các tài khoản Steam.</li>
            <li>Vui lòng không đổi email và mật khẩu, Divine Shop không hỗ trợ bảo hành nếu bạn đổi email và mật khẩu.</li>
            <li>Chỉ hỗ trợ đăng nhập và sử dụng trên 1 thiết bị cá nhân.</li>
          </ul>
        }
      />
      <Divider />
      <Title level={4}>Chi tiết sản phẩm</Title>
      <Text>{game.short_description}</Text>
      <Title level={5}>Quy trình nhận hàng</Title>
      <ol>
        <li>Đây là Steam Wallet Code dùng để nạp tiền vào tài khoản Steam Wallet.</li>
        <li>Sau khi mua hàng thành công bạn sẽ nhận được ngay code Steam Wallet.</li>
        <li>Thời gian xử lý: Nhận code ngay sau khi mua hàng thành công.</li>
        <li>Hình thức nhận hàng: Code kích hoạt trong đơn hàng.</li>
        <li>Hướng dẫn nhập code Steam Wallet.</li>
      </ol>
      <Image src="https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/extras/SteamGIF_Scene.gif?t=1718690162" />
      <Divider />
      <Title level={4}>Cấu hình</Title>
      <Title level={5}>Yêu cầu hệ thống</Title>
    </div>
  );
}

export default GameDetail;