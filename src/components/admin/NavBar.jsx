import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <>
            <div className="navbar">
                <img src="./Image 1858.png" alt="" width={100} height={30} />
                <div className="menu">
                    <ul>
                        <li>
                            <NavLink to={"/admin"}   end>
                                <img src="./Squares four 1.png" alt="" />
                                DashBoard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/analyst"}>
                                <img src="./Pie chart.png" alt="" />
                                Analytics
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to={"/admin/message"}>
                                <img src="./Pie chart.png" alt="" />
                                Messages
                            </NavLink>
                        </li> */}
                        <li style={{ textAlign: "center" }}>
                            <img src="./Group.png" alt="" />

                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavBar