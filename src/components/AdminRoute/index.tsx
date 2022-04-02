import { Navigate, Outlet } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";

import SidebarAdmin from "../SidebarAdmin";

import { useUserContext } from "../../context/UserContext";
import { useSidebarContext } from "../../context/SidebarContext";
import { LoaderWrapper } from "../../context/LoaderContext";

const AdminRoute = () => {
  const { userInfo, isAuthenticated } = useUserContext();
  const { isOpened, toogleIsOpened } = useSidebarContext();

  if (userInfo.isAdmin && isAuthenticated) {
    return (
      <LoaderWrapper>
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
            <nav className="flex justify-end mb-4 items-center gap-x-2">
              <div>
                <img
                  src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="font-bold">{userInfo.name}</div>
            </nav>
            <Outlet />
          </div>
        </div>
      </LoaderWrapper>
    );
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;
