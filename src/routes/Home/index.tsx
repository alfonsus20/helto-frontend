import { useState } from "react";
import classNames from "classnames";

import Header from "../../components/Header";
import WideCard from "../../components/WideCard";
import Carousel from "./components/Carousel";
import NewsModal from "../../components/NewsModal";
import ProgramCarousel from "./components/ProgramCarousel";
import { UserGroupIcon, ViewGridIcon } from "@heroicons/react/solid";

import LandingPageBg from "../../images/landing-page.webp";

import useEffectOnce from "../../hooks/useEffectOnce";
import useError from "../../hooks/useError";
import { useModalContext } from "../../context/ModalContext";

import { getNewsList } from "../../models/news";

import { NewsSingle } from "../../types/entities/news";

import { getImageURL } from "../../utils/helper";

const Home = () => {
  const [newsList, setNewsList] = useState<Array<NewsSingle>>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);

  const { handleError } = useError();
  const { openModal } = useModalContext();

  const fetchNewsList = async () => {
    try {
      setIsFetchingNews(true);
      const { data } = await getNewsList("?offset=0&limit=4");
      if (data.data) {
        setNewsList(data.data.news);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingNews(false);
    }
  };

  const handleViewNewsDetail = (newsId: number) => {
    const foundNews = newsList.find((news) => news.id === newsId)!;
    const modalDOM = (
      <NewsModal
        title={foundNews.title}
        content={foundNews.content}
        imageURL={getImageURL(foundNews.image)}
      />
    );
    openModal(modalDOM, "2xl");
  };

  useEffectOnce(() => {
    fetchNewsList();
  });

  return (
    <div>
      <section
        className="bg-cover bg-center min-h-screen flex px-8 overflow-x-hidden bg-pink-300"
        style={{ backgroundImage: `url("${LandingPageBg}")` }}
      >
        <div className="flex flex-col md:flex-row gap-x-6 py-28 max-w-7xl mx-auto w-full items-center">
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
        <h3 className="text-center my-4 max-w-xl mx-auto">
          Banyaknya fungsi kentang membuat bahan ini selalu diproduksi setiap
          waktu, sehingga mengetahui cara tanam kentang yang baik menjadi
          penting
        </h3>
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
              Teknik &amp;{" "}
              <span className="text-brown-700"> Cara Menanam </span>Kentang
              Untuk Hasil Berkualitas
            </h4>
            <div className="flex gap-x-4 items-start mb-4">
              <span className="p-3 rounded-full shadow-lg">
                <ViewGridIcon className="w-5 h-5 text-brown-600" />
              </span>
              <p className="text-gray">
                Bibit kentang yang sudah ditanam harus mendapatkan perawatan.
                Perawatan akan menghindarkan tanaman kentang dari masalah hama.
                Perawatan dilakukan dengan pemupukan dan penyiraman secara
                teratur.
              </p>
            </div>
            <div className="flex gap-x-4 items-start mb-4">
              <span className="p-3 rounded-full shadow-lg">
                <UserGroupIcon className="w-5 h-5 text-brown-600" />
              </span>
              <p className="text-gray">
                Pilih kentang yang paling besar untuk dipanen. Setelah itu,
                perbaiki lahan agar umbi kentang yang masih kecil bisa tumbuh
                dengan baik.
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
        <div className={classNames("mt-6 flex gap-x-10")}>
          {isFetchingNews || newsList.length === 0 ? (
            <div className="w-1/2 hidden md:block animate-pulse">
              <div className="rounded-lg w-full h-60 bg-slate-200"></div>
              <div className="h-4 bg-slate-200 w-[20%] my-2 rounded"></div>
              <div className="h-4 bg-slate-200 my-2 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 rounded bg-slate-200"></div>
                <div className="h-3 rounded bg-slate-200"></div>
                <div className="h-3 rounded bg-slate-200"></div>
              </div>
            </div>
          ) : (
            <div
              className="w-1/2 hidden md:block"
              onClick={() => handleViewNewsDetail(newsList[0].id)}
            >
              <div className="rounded-lg w-full h-60">
                <img
                  src={getImageURL(newsList[0].image)}
                  alt="berita"
                  className="object-cover mb-2 w-full h-full"
                />
              </div>
              <div className="bg-yellow-500 text-xs rounded-full px-3 py-1 my-2 max-w-min text-white">
                Terbaru
              </div>
              <h3 className="font-bold text-brown-700 mb-2 text-lg">
                {newsList[0].title}
              </h3>
              <p className="line-clamp-3">{newsList[0].content}</p>
            </div>
          )}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {isFetchingNews
              ? [...Array(3)].map((_, idx) => <WideCard loading key={idx} />)
              : newsList
                  .slice(1, 4)
                  .map((news) => (
                    <WideCard
                      imageUrl={getImageURL(news.image)}
                      title={news.title}
                      content={news.content}
                      key={news.id}
                      onClick={() => handleViewNewsDetail(news.id)}
                    />
                  ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
