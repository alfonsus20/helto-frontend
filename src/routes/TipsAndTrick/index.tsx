import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import WideCard from "../../components/WideCard";

const TipsAndTrick = () => {
  return (
    <div className="py-28 max-w-7xl mx-auto w-full">
      <section className="px-8">
        <div className="flex justify-between mb-4">
          <Header brownText="Tips dan" blackText="Trik" textAlign="left" />
          <Link
            to="/berita/daftar-berita"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-12 mx-auto max-w-7xl gap-4">
          <div className="col-span-12 sm:col-span-5 lg:col-span-4 relative">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/image 106.jpg"
              alt="kentang"
              className="w-full h-80 sm:h-full object-cover object-center"
            />
            <div className="bg-black bg-opacity-70 absolute bottom-0 w-full p-4 text-white">
              <h3 className="text-xl font-bold mb-2">Menanam Kentang</h3>
              <p>
                Kentang harus ditanam di tanah yang asam, serta mendapat banyak
                sinar matahari dan air. - wikiHow
              </p>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-7 lg:col-span-4">
            {[...Array(4)].map((_, idx) => (
              <WideCard
                title="Lorem ipsum"
                shadow="md"
                key={idx}
                className="mb-2"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                imageUrl="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/unsplash_FV_PxCqgtwc.png"
              />
            ))}
          </div>{" "}
          <div className="col-span-12 lg:col-span-4">
            {[...Array(4)].map((_, idx) => (
              <WideCard
                title="Lorem ipsum"
                shadow="md"
                key={idx}
                className="mb-2"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                imageUrl="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/unsplash_FV_PxCqgtwc.png"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipsAndTrick;
