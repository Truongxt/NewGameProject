import { NavLink } from "react-router-dom";
import { getGameLimit } from "../api/api";
import { useEffect, useState } from "react";
import { Card, Pagination, Typography, Button, Row, Col } from "antd";
import ParentGame from "../components/ParentGame";

const { Title, Text } = Typography;

function Game() {
    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data, totalCount } = await getGameLimit(page, 6);
                setGames(data);
                setTotalGames(totalCount);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchGame();
    }, []);
    return (
        <>
            <div className="p-6 max-w-7xl mx-auto px-4 py-8">
                <ParentGame games={games} totalGames={totalGames} page={page} setPage={setPage} setGames={setGames} setTotalGames={setTotalGames} />
            </div>
        </>
    );
}

export default Game;
