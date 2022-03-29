import React from "react";
import { Link } from "react-router-dom";

const AgendaCard = () => {
  return (
    <div
      className="col-span-12 xs:col-span-6 sm:col-span-4 
      flex flex-row items-center gap-x-4 p-4 rounded-md shadow-md"
    >
      <div className="flex-shrink-0 text-center bg-[#E6D5C9] px-6 py-3 rounded-xl">
        <div className="text-[#B09C8E] text-sm">Sabtu</div>
        <div className="text-brown-500 text-2xl">13</div>
        <div className="text-brown-500 text-sm">Juli</div>
      </div>
      <div className="flex-auto">
        <p className="mb-2 font-semibold line-clamp-3">
          Hari Nasional Kentang Goreng (National French Fry Day)
        </p>
        <Link to="/" className="text-sm text-gray-400">
          Baca lebih lanjut
        </Link>
      </div>
    </div>
  );
};

export default AgendaCard;
