import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";
import Input from "../../components/Input";
import WideCard from "../../components/WideCard";

const TipsAndTrickList = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Tips dan"
        blackText="Trik"
        textAlign="left"
        className="mb-4"
      />
      <Input
        placeholder="Cari Tips dan Trik Terbaru Hari Ini"
        icon={<SearchIcon className="w-5 h-5" />}
        className="mb-6"
      />
      <div className="mt-4 grid grid-cols-12 gap-5">
        {[...Array(4)].map((_, idx) => (
          <WideCard
            title="Lorem ipsum"
            shadow="md"
            key={idx}
            className="mb-2 col-span-4"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            imageUrl="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/unsplash_FV_PxCqgtwc.png"
          />
        ))}
      </div>
    </div>
  );
};

export default TipsAndTrickList;
