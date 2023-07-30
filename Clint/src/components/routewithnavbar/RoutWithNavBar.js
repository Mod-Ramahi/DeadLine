import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"

const RouteWithNavBar = () => {
    return(
        <>
            <Navbar/> <Outlet/>
        </>
    )
}

export default RouteWithNavBar;