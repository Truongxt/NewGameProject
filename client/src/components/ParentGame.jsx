import { Button, Col, InputNumber, Pagination, Row, Select } from "antd"
import GoBack from "./GoBack";
import ShowGame from "./ShowGame";
import { useEffect, useState } from "react";
import { getGameByParams, getGameLimit } from "../api/api";
import { useParams } from "react-router-dom";

function ParentGame({ games, totalGames, page, setPage, setGames, setTotalGames, type }) {
    const [platform, setPlatform] = useState("Tất cả");
    const [genre, setGenre] = useState("Tất cả");
    const [priceFrom, setPriceFrom] = useState(null);
    const [priceTo, setPriceTo] = useState(null);
    const [sort, setSort] = useState("Mới cập nhật");


    console.log(priceFrom, priceTo)

    const fetchGames = async () => {
        try {
            const params = {
                page,
                limit: 5, // Matches your pageSize in Pagination
                platform: platform !== "Tất cả" ? platform : undefined,
                genre: genre !== "Tất cả" ? genre : undefined,
                priceFrom,
                priceTo,
                sort: sort === "Từ A-Z" ? "title_asc" : sort === "Giá tăng" ? "price_asc" : "price_desc",
            };
            const response = await getGameByParams(params);

            setGames(response.games);
            setTotalGames(response.total);
        } catch (error) {
            console.error("Error fetching games:", error);

        }
    };

    // Fetch games whenever filters, sorting, or page changes
    useEffect(() => {
        fetchGames();
    }, [page, platform, genre, priceFrom, priceTo, sort]);

    const resetFilters = () => {
        setPlatform("Tất cả");
        setGenre("Tất cả");
        setPriceFrom(null);
        setPriceTo(null);
        setSort("Mới cập nhật");
        setPage(1);
    };

    return (
        <>
            <GoBack />

            <Row className="m-6">
                <Col span={24} c>
                    <h2 className="text-2xl font-bold">Tìm kiếm game</h2>
                </Col>
            </Row>
            {/* Filter and Sort Section */}
            <Row className="m-6" gutter={[16, 16]} align="middle">
                <Col span={4}>
                    <Select
                        value={platform}
                        onChange={setPlatform}
                        style={{ width: "100%" }}
                    >
                        <Option value="Tất cả">Nền tảng: Tất cả</Option>
                        <Option value="PC">PC (Windows)</Option>
                        <Option value="Web Browser">Web Browser</Option>
                        {/* Add more categories as needed */}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select
                        value={genre}
                        onChange={setGenre}
                        style={{ width: "100%" }}
                    >
                        <Option value="Tất cả">Thể loại: Tất cả</Option>
                        <Option value="MMORPG">MMORPG</Option>
                        <Option value="Shooter">Shooter</Option>
                        <Option value="MOBA">MOBA</Option>
                        <Option value="Strategy">Strategy</Option>
                        {/* Add more genres as needed */}
                    </Select>
                </Col>
                <Col span={4}>
                    <InputNumber
                        placeholder="Mức giá từ"
                        value={priceFrom}
                        onChange={setPriceFrom}
                        style={{ width: "100%" }}
                        min={0}
                    />
                </Col>
                <Col span={4}>
                    <InputNumber
                        placeholder="Mức giá đến"
                        value={priceTo}
                        onChange={setPriceTo}
                        style={{ width: "100%" }}
                        min={0}
                    />
                </Col>
                <Col span={4}>
                    <Select
                        value={sort}
                        onChange={setSort}
                        style={{ width: "100%" }}
                    >
                        <Option value="Mới cập nhật">Sắp xếp: Mới cập nhật</Option>
                        <Option value="Từ A-Z">Từ A-Z</Option>
                        <Option value="Giá tăng">Giá tăng</Option>
                        <Option value="Giá giảm">Giá giảm</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Button
                        type="primary"
                        onClick={fetchGames}
                        style={{ marginRight: 8 }}
                    >
                        Lọc
                    </Button>
                </Col>
                <Col span={4}>
                    <Button danger onClick={resetFilters}>Khôi phục bộ lọc</Button>
                </Col>
            </Row>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map(game => (
                    <ShowGame game={game} key={game.id} />
                ))}
            </div>

            <Pagination
                current={page}
                onChange={(page) => setPage(page)}
                total={totalGames}
                pageSize={5}
                style={{ marginTop: 20, textAlign: "center", display: "block" }}
            />
        </>
    )
}

export default ParentGame
