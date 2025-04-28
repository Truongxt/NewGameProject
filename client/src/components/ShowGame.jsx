import { Button, Card } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../provider/CartProvider";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { checkKeyGame } from "../api/api";
function ShowGame({ game }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [exist, setExist] = useState(0);

  const checkExistKeyGame = async () => {
    try {
      const respone = await checkKeyGame(game.id);
      setExist(respone);
      console.log(respone);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(game.id);
      checkExistKeyGame();
    }, []);

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  }
  return (
    // <NavLink to={`/game/${game.id}`} className="hover:no-underline">
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-red-600 font-bold">{formatPrice(game.price)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(game.original_price)} </span>
                        </div>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">-{game.discount}</span>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Mua Ngay
                    </button>
                </div> */}

      <Card
        hoverable
        cover={<img alt="Hot Game" src={game.thumbnail} />}
        onClick={() => navigate(`/game/${game.id}`)}
      >
        <Card.Meta title={game.title} description={game.short_description} />
        <Button
          type="primary"
          className="mt-4"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(game);
            setExist(exist - 1);
          }}
          disabled={!exist > 0}
        >
          {exist > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
        </Button>
      </Card>
    </div>
    // </NavLink>
  );
}

export default ShowGame;
