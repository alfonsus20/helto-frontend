import React from "react";
import Header from "../../components/Header";
import LandingPageBg from "../../images/landing-page.png";
import { UserGroupIcon, ViewGridIcon } from "@heroicons/react/solid";
import { PROGRAMS } from "../../utils/constants";
import ProgramCard from "./components/ProgramCard";
import NewsCard from "./components/NewsCard";

const Home = () => {
  return (
    <div>
      <section
        className={`bg-cover bg-center min-h-screen flex items-center`}
        style={{ backgroundImage: `url("${LandingPageBg}")` }}
      >
        <div className="flex gap-x-6 py-32 max-w-7xl mx-auto w-full">
          <div className="text-brown-600 w-1/3">
            <h1 className="text-4xl font-bold leading-snug mb-4">
              Majunya petani Indonesia, Jayalah Indonesia
            </h1>
            <h2>
              Rawat dan jaga kentang Anda, ketahui penyakitnya, tips dan trik
              merawat, serta berkumpul dan berkonsultasi langsung dengan
              ahlinya.
            </h2>
          </div>
          <div className="w-2/3">CAROUSEL LATER</div>
        </div>
      </section>
      <section className="py-14 max-w-7xl mx-auto">
        <Header brownText="Tips &amp;" blackText="Trik" />
        <h4 className="text-center my-4 max-w-md mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </h4>
        <div className="flex">
          <div className="w-[70%]">IMAGE</div>
          <div className="w-[30%]">
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
        <div className="mt-12 grid grid-cols-3 gap-4 place-items-center">
          {PROGRAMS.map((program) => (
            <ProgramCard {...program} />
          ))}
        </div>
      </section>
      <section className="py-14 max-w-7xl mx-auto">
        <Header brownText="Berita" blackText="Terkini" />
        <div className="mt-4 flex">
          <div className="w-1/2">adas</div>
          <div className="w-1/2">
            <NewsCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
