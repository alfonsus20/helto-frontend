import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Card from "../../components/Card";
import AgendaCard from "../../components/AgendaCard";
import useSnackbar from "../../hooks/useSnackbar";
import { AxiosError, AxiosPromise } from "axios";
import { getNewsList } from "../../models/news";
import { GetNewsResponse, NewsSingle } from "../../types/entities/news";
import { APIResponse } from "../../types/apiResponse";
import { getAgendaList } from "../../models/agenda";
import { getMediaList } from "../../models/media";
import { Agenda } from "../../types/entities/agenda";
import { GetMediaResponse, Media } from "../../types/entities/media";
import useEffectOnce from "../../hooks/useEffectOnce";
import { getEmbedYoutubeURL } from "../../utils/helper";

const News = () => {
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<Array<NewsSingle>>([]);
  const [mediaList, setMediaList] = useState<Array<Media>>([]);
  const [agendaList, setAgendaList] = useState<Array<Agenda>>([]);

  const snackbar = useSnackbar();

  const fetchNews = async () => {
    try {
      setIsFetchingNews(true);
      const query = "offset=0&limit=8";
      const promises = Promise.all<
        [
          AxiosPromise<APIResponse<GetNewsResponse>>,
          AxiosPromise<APIResponse<Agenda[]>>,
          AxiosPromise<APIResponse<GetMediaResponse>>
        ]
      >([getNewsList(query), getAgendaList(query), getMediaList(query)]);

      const res = await promises;

      setNewsList(res[0].data.data?.news!);
      setAgendaList(res[1].data.data!);
      setMediaList(res[2].data.data?.media!);
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingNews(false);
    }
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
            to="/berita/terkini"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-5">
          {newsList.map((news) => (
            <Card description={news.content} url={news.image} key={news.id} />
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
          {agendaList.map((agenda) => (
            <AgendaCard
              title={agenda.name}
              datetime={agenda.UpdatedAt}
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
          {mediaList.map((media) => (
            <Card
              description={media.description}
              url={getEmbedYoutubeURL(media.link)}
              key={media.id}
              media="video"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
