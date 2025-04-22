import Content from "./Content"
import NavBar from "./NavBar"

function LayoutDefault(){
    return (
        <>
            <div className="layout-default">
                <NavBar/>
                <Content/>
            </div>
        </>
    )
}

export default LayoutDefault