import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { useModalContext } from "../../context/ModalContext";
import NewsModal from "../../components/NewsModal";
import useEffectOnce from "../../hooks/useEffectOnce";
import { getNewsList } from "../../models/news";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { NewsSingle } from "../../types/entities/news";
import { AxiosError } from "axios";
import useSnackbar from "../../hooks/useSnackbar";
import { IMAGE_URL } from "../../utils/constants";

const NewsList = () => {
  const [newsList, setNewsList] = useState<NewsSingle[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);

  const { openModal } = useModalContext();
  const { search } = useLocation();
  const snackbar = useSnackbar();

  const handleViewNewsDetail = (newsId: number) => {
    const foundNews = newsList.find((news) => news.id === newsId)!;
    const modalDOM = (
      <NewsModal
        title={foundNews.title}
        content={foundNews.content}
        imageURL={`${IMAGE_URL}/${foundNews.image}`}
      />
    );
    openModal(modalDOM, "2xl");
  };

  const fetchNewsList = async () => {
    try {
      setIsFetchingNews(true);
      const { data } = await getNewsList(search);
      if (data.data) {
        setNewsList(data.data.news);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingNews(false);
    }
  };

  useEffectOnce(() => {
    fetchNewsList();
  });

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
        {newsList.map((news) => (
          <Card
            description={news.content}
            url={`${IMAGE_URL}/${news.image}`}
            key={news.id}
            onViewDetail={() => handleViewNewsDetail(news.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
