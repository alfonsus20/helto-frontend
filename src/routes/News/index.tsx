import React from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Card from "../../components/Card";

const News = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <section className="mb-12">
        <div className="flex justify-between">
          <Header brownText="Berita" blackText="Terkini" textAlign="left" />
          <Link
            to="/"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {[...Array(8)].map((_, idx) => (
            <Card
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
              url="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/wp3229647.jpg"
              key={idx}
            />
          ))}
        </div>
      </section>
      <section className="mb-12">
        <div className="flex justify-between">
          <Header brownText="Media" blackText="" textAlign="left" />
          <Link
            to="/"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {[...Array(8)].map((_, idx) => (
            <Card
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been "
              url="https://www.youtube.com/embed/tgbNymZ7vqY"
              key={idx}
              media="video"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
