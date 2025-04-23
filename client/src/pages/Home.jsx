import { TowerControl as GameController, Zap, Trophy, Gift } from 'lucide-react';
import { getGameLimit, getGames } from '../api/api';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Carousel, Col, Row, Card } from 'antd';
import ShowGame from '../components/ShowGame';

const categories = [
  { icon: <GameController className="h-6 w-6" />, name: "MMORPG" },
  { icon: <Zap className="h-6 w-6" />, name: "Shooter" },
  { icon: <Trophy className="h-6 w-6" />, name: "Strategy" },
  { icon: <Gift className="h-6 w-6" />, name: "MOBA" },
];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function Home() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalGames, setTotalGames] = useState(0);

  const navigate = useNavigate();

  const contentStyle = {
    margin: 0,
    height: '240px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%',
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, totalCount } = await getGameLimit(page, 5);
        setGames(data);
        setTotalGames(totalCount);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchGame();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Carousel */}
      <Carousel arrows autoplay style={{ width: "100%", height: "360px" }}>
        <div className="carousel-container relative">
          <img
            src={"https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg"}
            alt="Game Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="text-white text-3xl font-bold">Khám phá thế giới game đỉnh cao!</h2>
          </div>
        </div>
        <div className="carousel-container relative">
          <img
            src={"https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"}
            alt="Game Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <h2 className="text-white text-3xl font-bold">Sự kiện đặc biệt tháng 3!</h2>
          </div>
        </div>
      </Carousel>

      {/* Categories */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Thể Loại Game</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.map((category, index) => (
          <NavLink to={`/genre/${category.name}`} key={index}>
            <div
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="text-blue-600">{category.icon}</div>
                <span className="font-medium">{category.name}</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Featured Games */}
      <h2 className="text-2xl font-bold mb-6">Game Nổi Bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <ShowGame key={game.id} game={game} />
        ))}
      </div>

      {/* Hot Games Section */}
      <h2 className="text-2xl font-bold mb-6 mt-8">Top Game Tuần Này</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          hoverable
          cover={<img alt="Hot Game" src="https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg" />}
          onClick={() => navigate("/games")}
        >
          <Card.Meta title="Game Hot 1" description="Trải nghiệm ngay tựa game đang dẫn đầu bảng xếp hạng!" />
          <Button type="primary" className="mt-4">Khám phá</Button>
        </Card>
        <Card
          hoverable
          cover={<img alt="Hot Game" src="https://www.freetogame.com/g/540/thumbnail.jpg" />}
          onClick={() => navigate("/games")}
        >
          <Card.Meta title="Game Hot 2" description="Tham gia cùng hàng triệu người chơi khác!" />
          <Button type="primary" className="mt-4">Khám phá</Button>
        </Card>
        <Card
          hoverable
          cover={<img alt="Hot Game" src="https://www.freetogame.com/g/516/thumbnail.jpg" />}
          onClick={() => navigate("/games")}
        >
          <Card.Meta title="Game Hot 3" description="Game mới nhất vừa ra mắt!" />
          <Button type="primary" className="mt-4">Khám phá</Button>
        </Card>
      </div>

      {/* CTA Button */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24} align={"middle"} justify={"center"}>
          <NavLink to={"/games"}>
            <Button type="primary" size={"large"} className="bg-blue-600 hover:bg-blue-700">
              Khám Phá Thêm Game
            </Button>
          </NavLink>
        </Col>
      </Row>

      {/* Testimonials */}
      <h2 className="text-2xl font-bold mb-6 mt-8">Người Chơi Nói Gì</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="italic">"Trang web này có giao diện đẹp và dễ sử dụng, tôi tìm thấy rất nhiều game hay!"</p>
          <p className="mt-2 font-semibold">- Nguyễn Văn A</p>
        </Card>
        <Card>
          <p className="italic">"Các sự kiện game ở đây rất thú vị, tôi đã nhận được nhiều phần thưởng!"</p>
          <p className="mt-2 font-semibold">- Trần Thị B</p>
        </Card>
      </div>
    </div>
  );
}

export default Home;