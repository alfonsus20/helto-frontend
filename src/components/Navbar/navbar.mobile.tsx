import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import Button from "../Button";
import { useUserContext } from "../../context/UserContext";
import { UserIcon } from "@heroicons/react/outline";

const MobileNavbar = () => {
  const { isOpened, toogleIsOpened } = useSidebarContext();
  const { pathname } = useLocation();

  const { userInfo, isAuthenticated, logoutUser } = useUserContext();

  return (
    <div
      className={classNames(
        "fixed top-0 bg-white h-full max-h-screen overflow-y-auto z-10 flex lg:hidden flex-col items-center w-full xs:w-80 pt-[88px] transition-all ease-in duration-500",
        {
          "-right-full": !isOpened,
          "-right-0": isOpened,
          hidden: pathname.includes("admin"),
        }
      )}
    >
      {isAuthenticated && (
        <div className="font-bold px-6 py-2 flex gap-x-2 items-center">
          <UserIcon className="w-5 h-5" />
          {userInfo.name}
        </div>
      )}
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Beranda
      </Link>
      <Link className="px-6 py-4" to="/konsultasi" onClick={toogleIsOpened}>
        Konsultasi
      </Link>
      <Link className="px-6 py-4" to="/berita" onClick={toogleIsOpened}>
        Informasi Terkini
      </Link>
      <Link className="px-6 py-4" to="/tips-dan-trik" onClick={toogleIsOpened}>
        Tips dan Trik
      </Link>
      <Link
        className="px-6 py-4"
        to="/deteksi-penyakit"
        onClick={toogleIsOpened}
      >
        Ketahui Penyakit
      </Link>
      <Link className="px-6 py-4" to="/komunitas" onClick={toogleIsOpened}>
        Komunitas
      </Link>
      {isAuthenticated ? (
        <div className="px-6 py-4 items-center">
          <Button
            shape="pill"
            appearance="delete"
            onClick={() => {
              toogleIsOpened();
              logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <>
          <Link className="px-6 py-4" to="/login" onClick={toogleIsOpened}>
            Masuk
          </Link>
          <div className="px-6 py-4">
            <Button
              shape="pill"
              pathname="register"
              width="auto"
              onClick={toogleIsOpened}
            >
              Daftar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNavbar;
