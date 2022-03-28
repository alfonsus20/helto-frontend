import { ChevronDownIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-6 items-center max-w-7xl mx-auto fixed top-0 left-0 right-0 w-full z-10">
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
        <Link to="/" className="px-2 flex items-center gap-x-1 group relative">
          Pelajari Tanamanmu <ChevronDownIcon className="w-3 h-3" />
          <div
            className="hidden group-hover:block absolute top-[150%] -left-1/2 -right-1/2 mx-auto max-w-[18rem] bg-white px-4 py-2 rounded-md before:content-[''] 
            before:absolute before:border-[12px] before:border-b-white before:border-t-transparent before:border-l-transparent 
            before:border-r-transparent before:w-5 before:h-5 before:bottom-full before:left-0 before:right-0 before:mx-auto"
          >
            <Link to="/">
              <div className="flex gap-x-4 py-2">
                <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                  <SearchIcon className="w-5 h-5 text-[#FF784C]" />
                </div>
                <div>
                  <h4 className="font-bold">Informasi Terkini</h4>
                  <p className="text-sm text-gray-400">Tentang Kentang</p>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="flex gap-x-4 py-2">
                <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                  <SearchIcon className="w-5 h-5 text-[#FF784C]" />
                </div>
                <div>
                  <h4 className="font-bold">Informasi Terkini</h4>
                  <p className="text-sm text-gray-400">Tentang Kentang</p>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="flex gap-x-4 py-2">
                <div className="flex-shrink-0 p-3 rounded-full bg-[#FFF4F0]">
                  <SearchIcon className="w-5 h-5 text-[#FF784C]" />
                </div>
                <div>
                  <h4 className="font-bold">Informasi Terkini</h4>
                  <p className="text-sm text-gray-400">Tentang Kentang</p>
                </div>
              </div>
            </Link>
          </div>
        </Link>
        <Link to="/" className="px-2">
          Komunitas
        </Link>
      </dl>
      <div className="flex gap-x-4 items-center text-brown-600">
        <Link to="/login" className="px-6">
          Masuk
        </Link>
        <Button shape="pill" pathname="register">
          Daftar
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
