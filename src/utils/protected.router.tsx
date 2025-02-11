import Cookies from "js-cookie"
import { Navigate } from "react-router"
import { Outlet } from "react-router"
const ProtectedRoute = () => {
    const token = Cookies.get('token')
    return !token ? <Navigate to={"login"} /> : <Outlet />
}

export default ProtectedRoute