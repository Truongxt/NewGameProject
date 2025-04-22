
import { Outlet } from "react-router";
import { useUser } from "../../provider/UserProvider";
import { getAllUsers, getAverageRevenueByMonth, getGames } from "../../api/api";
import { useEffect, useState } from "react";
import { VscLaw } from "react-icons/vsc";
function TableDesign() {

    const [users, setUsers] = useState([]);

    const [games, setGames] = useState([]);
    

    const [averageRevenue, setAverageRevenue] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        const fetchGames = async () => {
            try {
                const data = await getGames();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        const fetchAverageRevenue = async () => {
            try {
              const revenue = await getAverageRevenueByMonth();
              setAverageRevenue(revenue);
            } catch (error) {
              console.error("Lỗi khi lấy trung bình doanh thu:", error);
            }
        };

        fetchGames();
        fetchAverageRevenue();
        fetchUsers();
    }
    , []);

    console.log(averageRevenue)
    
    return (
        <div className="table-design">
            <div className="overview" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <img src="./Squares four 1.png" alt="" width={25} height={25} style={{ marginRight: 5 }} />
            <h2>Tổng quan</h2>
            </div>

            <div className="list-card">
            <div className="card">
                <div className="analyst">
                <h3>Số lượng trò chơi</h3>
                <h1>{games.length}</h1>
                <p><span style={{ color: "red" }}>🔺5.39%</span> thay đổi theo kỳ</p>
                </div>
                <div className="cart-icon">
                <img src="./Button 1509.png" alt="" style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className="card" style={{ backgroundColor: "#EFF6FF" }}>
                <div className="analyst">
                <h3>Doanh thu trung bình</h3>
                <h1>{averageRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h1>
                <p><span style={{ color: "red" }}>🔺 5.39%</span> thay đổi theo kỳ</p>
                </div>
                <div className="cart-icon">
                <img src="./Button 1529.png" alt="" style={{ cursor: "pointer" }} />
                </div>
            </div>
            <div className="card" style={{ backgroundColor: "#EFF6FF" }}>
                <div className="analyst">
                <h3>Số lượng khách hàng</h3>
                <h1>{users.length}</h1>
                <p><span style={{ color: "red" }}>🔺 5.39%</span> thay đổi theo kỳ</p>
                </div>
                <div className="cart-icon">
                <img src="./Button 1530.png" alt="" style={{ cursor: "pointer" }} />
                </div>
            </div>
            </div>

            <div className="report">
            <div className="report-info">
                <div className="overview" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <img src="./File text 1.png" alt="" width={25} height={25} style={{ marginRight: 5 }} />
                <h2>Báo cáo chi tiết</h2>
                </div>
            </div>

            <div className="report-content">
                <Outlet/>
            </div>
             
            </div>
        </div>
        );
}

export default TableDesign;
