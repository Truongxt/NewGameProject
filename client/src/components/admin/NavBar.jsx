import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <>
            <div className="navbar">
                <div className="menu">
                    <ul>
                        <li>
                            <NavLink to={"/admin"} end>
                                <img src="./Squares four 1.png" alt="" />
                                DashBoard
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to={"/admin/message"}>
                                <img src="./Pie chart.png" alt="" />
                                Messages
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar