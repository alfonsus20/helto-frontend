import React from "react";
import {
  CalendarIcon,
  NewspaperIcon,
  SearchIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";

const SidebarAdmin = () => {
  return (
    <div className="flex-none w-80 h-full max-h-screen overflow-y-auto sticky top-0">
      <div className="flex justify-center p-4">
        <img src={Logo} alt="logo" className="w-24 h-20" />
      </div>
      <div className="px-4">
        <Link
          to="/admin/tips-dan-trik"
          className="flex p-4 gap-x-4 items-center  rounded-lg hover:bg-brown-500 hover:text-white "
        >
          <div className="flex-none">
            <SearchIcon className="w-5 h-5" />
          </div>
          <div className="flex-auto">Tips &amp; Trik</div>
        </Link>
        <Link
          to="/admin/berita"
          className="flex p-4 gap-x-4 items-center  rounded-lg hover:bg-brown-500 hover:text-white "
        >
          <div className="flex-none">
            <NewspaperIcon className="w-5 h-5" />
          </div>
          <div className="flex-auto">Berita Terkini</div>
        </Link>
        <Link
          to="/admin/agenda"
          className="flex p-4 gap-x-4 items-center  rounded-lg hover:bg-brown-500 hover:text-white "
        >
          <div className="flex-none">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div className="flex-auto">Agenda</div>
        </Link>
        <Link
          to="/admin/media"
          className="flex p-4 gap-x-4 items-center  rounded-lg hover:bg-brown-500 hover:text-white "
        >
          <div className="flex-none">
            <VideoCameraIcon className="w-5 h-5" />
          </div>
          <div className="flex-auto">Media</div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarAdmin;
