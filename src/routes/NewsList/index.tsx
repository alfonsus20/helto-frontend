import { useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import Card from "../../components/Card";
import Header from "../../components/Header";
import Search from "../../components/Search";
import NewsModal from "../../components/NewsModal";

import useError from "../../hooks/useError";
import { useModalContext } from "../../context/ModalContext";

import { getNewsList } from "../../models/news";

import { NewsSingle } from "../../types/entities/news";
import { getImageURL } from "../../utils/helper";
import Pagination from "../../components/Pagination";

const NewsList = () => {
  const [newsList, setNewsList] = useState<NewsSingle[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const { openModal } = useModalContext();
  const { search } = useLocation();
  const { handleError } = useError();

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
        `?${qs.stringify({ offset: 0, limit: 8, ...urlParams })}`
      );
      if (data.data) {
        setNewsList(data.data.news);
        setTotalData(data.data.totalData);
      }
    } catch (error) {
      handleError(error);
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
      <div className="mt-4 grid grid-cols-12 gap-5 mb-6">
        {isFetchingNews
          ? [...Array(8)].map((_, idx) => <Card loading key={idx} />)
          : newsList.map((news) => (
              <Card
                description={news.title}
                url={getImageURL(news.image)}
                key={news.id}
                onViewDetail={() => handleViewNewsDetail(news.id)}
              />
            ))}
      </div>
      <Pagination totalData={totalData} rowPerPage={8} />
    </div>
  );
};

export default NewsList;
