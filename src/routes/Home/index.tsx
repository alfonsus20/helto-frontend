import React from "react";
import Header from "../../components/Header";
import LandingPageBg from "../../images/landing-page.png";
import { UserGroupIcon, ViewGridIcon } from "@heroicons/react/solid";
import NewsCard from "./components/NewsCard";
import Carousel from "./components/Carousel";
import ProgramCarousel from "./components/ProgramCarousel";

const Home = () => {
  return (
    <div>
      <section
        className="bg-cover bg-center min-h-screen flex px-8 overflow-x-hidden"
        style={{ backgroundImage: `url("${LandingPageBg}")` }}
      >
        <div className="flex flex-col md:flex-row gap-x-6 py-32 max-w-7xl mx-auto w-full items-center">
          <div className="text-brown-600 w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-4xl font-bold leading-snug mb-4">
              Majunya petani Indonesia, Jayalah Indonesia
            </h1>
            <h2>
              Rawat dan jaga kentang Anda, ketahui penyakitnya, tips dan trik
              merawat, serta berkumpul dan berkonsultasi langsung dengan
              ahlinya.
            </h2>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3">
            <Carousel />
          </div>
        </div>
      </section>
      <section className="px-8 py-14 max-w-5xl mx-auto">
        <Header brownText="Tips &amp;" blackText="Trik" />
        <h4 className="text-center my-4 max-w-md mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </h4>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="sm:w-[60%]">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/tips-trik.webp"
              alt="tips n trik"
              className="w-[80%] sm:w-[90%] mx-auto"
            />
          </div>
          <div className="sm:w-[40%]">
            <h4 className="text-xl font-bold mb-4">
              Lorem <span className="text-brown-700">Ipsum lala lili </span>{" "}
              abcdefg hijklmn
            </h4>
            <div className="flex gap-x-4 items-start mb-4">
              <span className="p-3 rounded-full shadow-lg">
                <ViewGridIcon className="w-5 h-5 text-brown-600" />
              </span>
              <p className="text-gray">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
            <div className="flex gap-x-4 items-start mb-4">
              <span className="p-3 rounded-full shadow-lg">
                <UserGroupIcon className="w-5 h-5 text-brown-600" />
              </span>
              <p className="text-gray">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 max-w-6xl mx-auto">
        <Header brownText="Program" blackText="Kami" />
        <ProgramCarousel />
      </section>
      <section className="px-8 py-14 max-w-5xl mx-auto">
        <Header brownText="Berita" blackText="Terkini" />
        <div className="mt-6 flex gap-x-10">
          <div className="w-1/2 hidden md:block">
            <img
              src="https://tmqbylesuwxzdqaxmdlm.supabase.co/storage/v1/object/public/images/02c3bb65-27e5-41d1-906e-326cc339c2cc.jpg"
              alt="berita"
              className="rounded-lg w-full h-60 object-cover mb-2"
            />
            <div className="bg-yellow-500 text-xs rounded-full px-3 py-1 mb-2 max-w-min text-white">
              Terbaru
            </div>
            <h5 className="font-bold text-brown-700 mb-2 text-lg">
              Dampak Suhu Dingin bagi Petani Kentang di Bandung
            </h5>
            <p className="line-clamp-3">
              Suhu dingin membuat kabut tebal masih menyelimuti sejumlah wilayah
              di Kabupaten Bandung, Jawa Barat. Suhu dingin, ...
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <NewsCard
              imageUrl="https://tmqbylesuwxzdqaxmdlm.supabase.co/storage/v1/object/public/images/87d0bade-11bc-4235-a9ca-967faaf9177e.webp"
              title="Lorem ipsum?"
              content="Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years old."
            />
            <NewsCard
              imageUrl="https://tmqbylesuwxzdqaxmdlm.supabase.co/storage/v1/object/public/images/87d0bade-11bc-4235-a9ca-967faaf9177e.webp"
              title="Lorem ipsum?"
              content="Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years old."
            />
            <NewsCard
              imageUrl="https://tmqbylesuwxzdqaxmdlm.supabase.co/storage/v1/object/public/images/87d0bade-11bc-4235-a9ca-967faaf9177e.webp"
              title="Lorem ipsum?"
              content="Lorem Ipsum is not simply random text. It has roots in a piece of
              classical Latin literature from 45 BC, making it over 2000 years old."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
