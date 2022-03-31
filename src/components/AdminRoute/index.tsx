import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SidebarAdmin from "../SidebarAdmin";

const AdminRoute = () => {
  const { isAuthenticated } = useUserContext();

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <div className="flex-auto p-8 bg-[#F5F5F5]">
          <nav className="flex justify-end mb-4">Shawn Mendes</nav>
          <Outlet />
        </div>
      </div>
    );
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
