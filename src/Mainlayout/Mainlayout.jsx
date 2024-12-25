import { Outlet } from "react-router-dom";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";


const Mainlayout = () => {
    return (
        <div className="bg-[#1a103d]">
            <Navbar/>
            <div className="min-h-[calc(100vh-64px)]">
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Mainlayout;