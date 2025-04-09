import { Button } from "antd"
import { useNavigate } from "react-router-dom"

function GoBack() {
    const navigate = useNavigate()

    return (
        <div>
            <Button type="primary" className="p-3 mt-2 mb-2" onClick={() => navigate(-1)}>Quay Lại</Button>
        </div>
    )
}

export default GoBack
