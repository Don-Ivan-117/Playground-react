import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

export default function Layout() {
    return (
        <div className="flex">
            <Menu/>
            
            <main className="container">
                <Outlet/>
            </main>
        </div>
    )
}
