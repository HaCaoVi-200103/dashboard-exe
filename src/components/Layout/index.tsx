import DashboardContent from "./content"
import DashboardFooter from "./footer"
import DashboardHeader from "./header"
import DashboardSideBar from "./sidebar"
import { Outlet } from "react-router"


const LayoutDashboard = () => {
    return (
        <div style={{ display: "flex" }}>
            <div className='left-side' style={{ minWidth: 80 }}>
                <DashboardSideBar />
            </div>
            <div className='right-side' style={{ flex: 1 }}>
                <DashboardHeader />
                <DashboardContent>
                    <Outlet />
                </DashboardContent>
                <DashboardFooter />
            </div>
        </div>
    )
}

export default LayoutDashboard