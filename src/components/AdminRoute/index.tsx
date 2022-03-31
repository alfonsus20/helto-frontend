import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SidebarAdmin from "../SidebarAdmin";
import HamburgerMenu from "react-hamburger-menu";
import { useSidebarContext } from "../../context/SidebarContext";

const AdminRoute = () => {
  const { isAuthenticated } = useUserContext();
  const { isOpened, toogleIsOpened } = useSidebarContext();

  if (isAuthenticated) {
    return (
      <div className="flex max-w-screen relative">
        <SidebarAdmin />
        <div className="block md:hidden absolute left-8 top-8">
          <HamburgerMenu
            isOpen={isOpened}
            menuClicked={toogleIsOpened}
            width={18}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={2}
            animationDuration={0.5}
          />
        </div>
        <div className="flex-auto px-8 py-10 bg-[#F5F5F5] overflow-hidden min-h-screen">
          <nav className="flex justify-end mb-4">Shawn Mendes</nav>
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
