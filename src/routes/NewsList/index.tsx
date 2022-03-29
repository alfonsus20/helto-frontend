import { SearchIcon } from "@heroicons/react/outline";
import React from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";

const NewsList = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Berita"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <Input
        placeholder="Cari Berita Terbaru Hari Ini"
        icon={<SearchIcon className="w-5 h-5" />}
        className='mb-6'
      />
      <div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {[...Array(4)].map((_, idx) => (
            <Card
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
              url="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/wp3229647.jpg"
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
