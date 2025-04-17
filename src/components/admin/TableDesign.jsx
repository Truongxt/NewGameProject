
import { Outlet } from "react-router";
function TableDesign() {

    return (
        <div className="table-design">
            <div className="overview" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <img src="./Squares four 1.png" alt="" width={25} height={25} style={{ marginRight: 5 }} />
                <h2>Overview</h2>
            </div>

            <div className="list-card">
                <div className="card">
                    <div className="analyst">
                        <h3>Turnover</h3>
                        <h1>$92,405</h1>
                        <p><span style={{ color: "red" }}>🔺5.39%</span> period of change</p>
                    </div>
                    <div className="cart-icon">
                        <img src="./Button 1509.png" alt="" style={{ cursor: "pointer" }} />
                    </div>
                </div>
                <div className="card" style={{ backgroundColor: "#EFF6FF" }}>
                    <div className="analyst">
                        <h3>Profit</h3>
                        <h1>$32,218</h1>
                        <p><span style={{ color: "red" }}>🔺 5.39%</span> period of change</p>
                    </div>
                    <div className="cart-icon">
                        <img src="./Button 1529.png" alt="" style={{ cursor: "pointer" }} />
                    </div>
                </div>
                <div className="card" style={{ backgroundColor: "#EFF6FF" }}>
                    <div className="analyst">
                        <h3>New customer</h3>
                        <h1>298</h1>
                        <p><span style={{ color: "red" }}>🔺 5.39%</span> period of change</p>
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
                        <h2>Detailed report</h2>
                    </div>
                    <div className="report-button">
                        <button>Import</button>
                        <button>Export</button>
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
