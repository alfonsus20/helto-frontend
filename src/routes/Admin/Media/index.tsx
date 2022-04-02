import React, { useState } from "react";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { Media } from "../../../types/entities/media";
import { deleteMedia, getMediaList } from "../../../models/media";
import { useLoader } from "../../../context/LoaderContext";

const AdminNews = () => {
  const [newsList, setMediaList] = useState<Array<Media>>([]);

  const { search } = useLocation();
  const snackbar = useSnackbar();
  const { setLoading } = useLoader();

  const fetchMediaList = async () => {
    try {
      setLoading(true);
      const { data } = await getMediaList(search);
      if (data.data) {
        setMediaList(data.data.media);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Media Terkini</h1>
      <div className="bg-white p-5">
        <Table
          fetchFunc={fetchMediaList}
          deleteFunc={deleteMedia}
          searchPlaceholder="Cari Media Terkini"
          body={{
            id: { type: "text" },
            link: { type: "text", title: "Link" },
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
