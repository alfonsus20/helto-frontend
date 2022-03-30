import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useModalContext } from "../../context/ModalContext";
import NewsModal from "../../components/NewsModal";

const NewsList = () => {
  const { openModal } = useModalContext();

  const handleViewNewsDetail = (newsId: number) => {
    const modalDOM = (
      <NewsModal
        title="Judul Berita"
        content="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum."
        imageURL="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/wp3229647.jpg"
      />
    );
    openModal(modalDOM, "2xl");
  };

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
        className="mb-6"
      />

      <div className="mt-4 grid grid-cols-12 gap-5">
        {[...Array(4)].map((_, idx) => (
          <Card
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
            url="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/wp3229647.jpg"
            key={idx}
            onViewDetail={() => handleViewNewsDetail(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
