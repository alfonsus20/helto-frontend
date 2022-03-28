import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext";
import Button from "../Button";

const MobileNavbar = () => {
  const { isOpened } = useSidebarContext();

  return (
    <div
      className={classNames(
        "fixed top-0 bg-white h-full max-h-screen overflow-y-auto z-10 flex lg:hidden flex-col w-full 2xs:w-80 pt-[88px] transition-all ease-in duration-500",
        { "-right-full": !isOpened, "-right-0": isOpened }
      )}
    >
      <Link className="px-6 py-4" to="/">
        Beranda
      </Link>
      <Link className="px-6 py-4" to="/">
        Konsultasi
      </Link>
      <Link className="px-6 py-4" to="/">
        Informasi Terkini
      </Link>
      <Link className="px-6 py-4" to="/">
        Tips dan Trik
      </Link>
      <Link className="px-6 py-4" to="/">
        Ketahui Penyakit
      </Link>
      <Link className="px-6 py-4" to="/">
        Komunitas
      </Link>
      <Link className="px-6 py-4" to="/">
        Masuk
      </Link>
      <div className="px-6 py-4">
        <Button shape="pill" pathname="register" width="auto">
          Daftar
        </Button>
      </div>
    </div>
  );
};

export default MobileNavbar;
