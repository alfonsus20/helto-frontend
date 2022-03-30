import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import VideoModal from "../../components/VIdeoModal";
import { useModalContext } from "../../context/ModalContext";

const VideoList = () => {
  const { openModal } = useModalContext();

  const handleViewVideoDetail = (newsId: number) => {
    const modalDOM = (
      <VideoModal
        title="Test"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not
        only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s
        with the release of Letraset sheets containing Lorem Ipsum passages,
        and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum."
        videoURL="https://www.youtube.com/embed/tgbNymZ7vqY"
      />
    );
    openModal(modalDOM, "2xl");
  };
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
            onViewDetail={() => handleViewVideoDetail(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
