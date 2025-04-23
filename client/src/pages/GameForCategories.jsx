
import { useEffect, useState } from "react";
import { getGameByGenre } from "../api/api";
import ParentGame from "../components/ParentGame";
import { useParams } from "react-router-dom";

function GameForCategories() {
    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);
    const [page, setPage] = useState(1);
    const id = useParams().id;

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const { data, totalCount } = await getGameByGenre(id, page, 5);
                setGames(data);
                setTotalGames(totalCount);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchGame();
    }, [id, page]);
    return (
        <div className="p-6 max-w-7xl mx-auto px-4 py-8">
            <ParentGame games={games} totalGames={totalGames} page={page} setPage={setPage} setGames={setGames} setTotalGames={setTotalGames} type="category" />
        </div>
    )
}

export default GameForCategories
