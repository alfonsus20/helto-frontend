import React, { useState } from "react";
import qs from "query-string";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { useModalContext } from "../../context/ModalContext";
import NewsModal from "../../components/NewsModal";
import { getNewsList } from "../../models/news";
import { useLocation } from "react-router-dom";
import { NewsSingle } from "../../types/entities/news";
import { AxiosError } from "axios";
import useSnackbar from "../../hooks/useSnackbar";
import { getImageURL } from "../../utils/helper";
import Search from "../../components/Search";

const NewsList = () => {
  const [newsList, setNewsList] = useState<NewsSingle[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const snackbar = useSnackbar();
  const { openModal } = useModalContext();
  const { search } = useLocation();

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

  const fetchNewsList = async () => {
    try {
      setIsFetchingNews(true);
      const urlParams = qs.parse(search);
      const { data } = await getNewsList(
        `?${qs.stringify({ ...urlParams, offset: 0, limit: 10 })}`
      );
      if (data.data) {
        setNewsList(data.data.news);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingNews(false);
    }
  };

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Berita"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <Search
        placeholder="Cari Berita Terbaru Hari Ini"
        fetchFunc={fetchNewsList}
      />
      <div className="mt-4 grid grid-cols-12 gap-5">
        {newsList.map((news) => (
          <Card
            description={news.title}
            url={getImageURL(news.image)}
            key={news.id}
            onViewDetail={() => handleViewNewsDetail(news.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
