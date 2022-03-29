import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";
import Input from "../../components/Input";
import AgendaCard from "../../components/AgendaCard";

const AgendaList = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Agenda"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <Input
        placeholder="Cari Agenda Terbaru Hari Ini"
        icon={<SearchIcon className="w-5 h-5" />}
        className="mb-6"
      />
      <div className="mt-4 grid grid-cols-12 gap-5">
        {[...Array(4)].map((_, idx) => (
          <AgendaCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default AgendaList;
