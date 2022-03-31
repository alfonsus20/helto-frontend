import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { deleteNews } from "../../../models/news";
import { Media } from "../../../types/entities/media";
import { deleteMedia, getMediaList } from "../../../models/media";

const AdminNews = () => {
  const [newsList, setMediaList] = useState<Array<Media>>([]);
  const [isFetchingAgenda, setIsFetchingMedia] = useState<boolean>(false);

  const { search } = useLocation();
  const snackbar = useSnackbar();

  const fetchAgendaList = async () => {
    try {
      setIsFetchingMedia(true);
      const { data } = await getMediaList(search);
      if (data.data) {
        setMediaList(data.data.media);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingMedia(false);
    }
  };

  useEffect(() => {
    fetchAgendaList();
  }, [search]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Media Terkini</h1>
      <div className="bg-white p-5">
        <Table
          fetchFunc={fetchAgendaList}
          deleteFunc={deleteMedia}
          body={{
            id: { type: "text" },
            link: { type: "text", title: "Judul" },
            description: { type: "text", title: "Deskripsi", wrapped: true },
            updatedAt: { type: "date", title: "Tanggal" },
            createdAt: { type: "date" },
          }}
          data={newsList}
        />
      </div>
    </div>
  );
};
export default AdminNews;
