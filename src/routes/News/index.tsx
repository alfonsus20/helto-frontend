import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Card from "../../components/Card";
import AgendaCard from "../../components/AgendaCard";
import NewsModal from "../../components/NewsModal";
import VideoModal from "../../components/VideoModal";
import { SkeletonAgenda, SkeletonCard } from "../../components/Skeleton";
import { ChevronRightIcon } from "@heroicons/react/outline";

import { getNewsList } from "../../models/news";
import { getAgendaList } from "../../models/agenda";
import { getMediaList } from "../../models/media";

import { APIResponse } from "../../types/apiResponse";
import { GetNewsResponse, NewsSingle } from "../../types/entities/news";
import { GetMediaResponse, Media } from "../../types/entities/media";
import { Agenda, GetAgendaList } from "../../types/entities/agenda";

import useEffectOnce from "../../hooks/useEffectOnce";
import { useModalContext } from "../../context/ModalContext";

import { getEmbedYoutubeURL, getImageURL } from "../../utils/helper";
import useError from "../../hooks/useError";

import { AxiosPromise } from "axios";

const News = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<Array<NewsSingle>>([]);
  const [mediaList, setMediaList] = useState<Array<Media>>([]);
  const [agendaList, setAgendaList] = useState<Array<Agenda>>([]);

  const { openModal } = useModalContext();
  const { handleError } = useError();

  const fetchNews = async () => {
    try {
      setIsFetching(true);
      const query = "?offset=0&limit=4";
      const promises = Promise.all<
        [
          AxiosPromise<APIResponse<GetNewsResponse>>,
          AxiosPromise<APIResponse<GetAgendaList>>,
          AxiosPromise<APIResponse<GetMediaResponse>>
        ]
      >([getNewsList(query), getAgendaList(query), getMediaList(query)]);
      const res = await promises;
      setNewsList(res[0].data.data?.news!);
      setAgendaList(res[1].data.data?.agenda!);
      setMediaList(res[2].data.data?.media!);
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetching(false);
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

  const handleViewVideoDetail = (videoId: number) => {
    const foundVideo = mediaList.find((video) => video.id === videoId)!;
    const modalDOM = (
      <VideoModal
        content={foundVideo.description}
        videoURL={getEmbedYoutubeURL(foundVideo.link)}
      />
    );
    openModal(modalDOM, "2xl");
  };

  useEffectOnce(() => {
    fetchNews();
  });

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <section className="mb-12">
        <div className="flex justify-between">
          <Header brownText="Berita" blackText="Terkini" textAlign="left" />
          <Link
            to="/berita/selengkapnya"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {isFetching
            ? [...Array(4)].map((_, idx) => <SkeletonCard key={idx} />)
            : newsList.map((news) => (
                <Card
                  description={news.content}
                  url={getImageURL(news.image)}
                  key={news.id}
                  onViewDetail={() => handleViewNewsDetail(news.id)}
                />
              ))}
        </div>
      </section>
      <section className="mb-12">
        <div className="flex justify-between">
          <Header brownText="Agenda" blackText="Terkini" textAlign="left" />
          <Link
            to="/berita/agenda"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {isFetching
            ? [...Array(3)].map((_, idx) => <SkeletonAgenda key={idx} />)
            : agendaList.map((agenda) => (
                <AgendaCard
                  title={agenda.name}
                  datetime={agenda.date}
                  key={agenda.id}
                />
              ))}
        </div>
      </section>
      <section className="mb-12">
        <div className="flex justify-between">
          <Header brownText="Media" blackText="" textAlign="left" />
          <Link
            to="/berita/media"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {isFetching
            ? [...Array(4)].map((_, idx) => <SkeletonCard key={idx} />)
            : mediaList.map((media) => (
                <Card
                  description={media.description}
                  url={getEmbedYoutubeURL(media.link)}
                  key={media.id}
                  media="video"
                  onViewDetail={() => handleViewVideoDetail(media.id)}
                />
              ))}
        </div>
      </section>
    </div>
  );
};

export default News;
