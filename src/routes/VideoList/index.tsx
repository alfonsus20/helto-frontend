import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";

const VideoList = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Media"
        blackText=""
        textAlign="left"
        className="mb-4"
      />
      <Input
        placeholder="Cari Video Terbaru Hari Ini"
        icon={<SearchIcon className="w-5 h-5" />}
        className="mb-6"
      />

      <div className="mt-4 grid grid-cols-12 gap-5">
        {[...Array(4)].map((_, idx) => (
          <Card
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
            url="https://www.youtube.com/embed/tgbNymZ7vqY"
            key={idx}
            media="video"
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
