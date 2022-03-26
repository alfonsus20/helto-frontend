import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-6 items-center max-w-7xl mx-auto fixed top-0 left-0 right-0 w-full">
      <div className="px-6 py-3 bg-brown-200">
        <Link to="/">Logo</Link>
      </div>
      <dl className="flex gap-x-5 text-brown-600">
        <Link to="/" className="px-2">
          Beranda
        </Link>
        <Link to="/" className="px-2">
          Konsultasi
        </Link>
        <Link to="/" className="px-2">
          Pelajari Tanamanmu
        </Link>
        <Link to="/" className="px-2">
          Komunitas
        </Link>
      </dl>
      <div className="flex gap-x-4 items-center text-brown-600">
        <Link to="/login" className="px-6">
          Masuk
        </Link>
        <Button shape="pill">Daftar</Button>
      </div>
    </nav>
  );
};

export default Navbar;
