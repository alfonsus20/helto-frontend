import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../context/SidebarContext";
import Button from "../Button";

const MobileNavbar = () => {
  const { isOpened, toogleIsOpened } = useSidebarContext();

  return (
    <div
      className={classNames(
        "fixed top-0 bg-white h-full max-h-screen overflow-y-auto z-10 flex lg:hidden flex-col w-full 2xs:w-80 pt-[88px] transition-all ease-in duration-500",
        { "-right-full": !isOpened, "-right-0": isOpened }
      )}
    >
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Beranda
      </Link>
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Konsultasi
      </Link>
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Informasi Terkini
      </Link>
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Tips dan Trik
      </Link>
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Ketahui Penyakit
      </Link>
      <Link className="px-6 py-4" to="/" onClick={toogleIsOpened}>
        Komunitas
      </Link>
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
    </div>
  );
};

export default MobileNavbar;
