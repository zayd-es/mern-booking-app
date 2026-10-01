import { Outlet } from "react-router-dom";
import Navbar from "../pages/hotelOwner/_components/Navbar";
import SideBar from "../pages/hotelOwner/_components/SideBar,";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <SideBar />

        <div className="flex-1 p-4 md:p-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
