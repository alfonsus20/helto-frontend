import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import { deleteNews, getNewsList } from "../../../models/news";
import { NewsSingle } from "../../../types/entities/news";

const AdminNews = () => {
  const [newsList, setNewsList] = useState<Array<NewsSingle>>([]);
  const [isFetchingNews, setIsFetchingNews] = useState<boolean>(false);

  const { search } = useLocation();
  const snackbar = useSnackbar();

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

  useEffect(() => {
    fetchNewsList();
  }, [search]);

  return (
    <div className="w-full overflow-x-hidden">
      <h1 className="font-bold text-2xl mb-4">Daftar Berita Terkini</h1>
      <div className="bg-white p-5 max-w-full overflow-x-hidden">
        <Table
          editURL=""
          deleteFunc={deleteNews}
          body={{
            id: { type: "text" },
            title: { type: "text", title: "Judul" },
            content: { type: "text", title: "Konten" },
            image: { type: "image", title: "Image" },
            UpdatedAt: { type: "date", title: "Tanggal" },
            createdAt: { type: "date" },
            authorId: { type: "date" },
          }}
          data={newsList}
        />
      </div>
    </div>
  );
};

// id: number;
// title: string;
// content: string;
// image: string;
// UpdatedAt: string;

export default AdminNews;
