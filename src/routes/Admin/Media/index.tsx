import { useState } from "react";
import { useLocation } from "react-router-dom";

import Table from "../../../components/Table";

import useError from "../../../hooks/useError";
import { useLoader } from "../../../context/LoaderContext";

import { deleteMedia, getMediaList } from "../../../models/media";

import { Media } from "../../../types/entities/media";

const AdminNews = () => {
  const [newsList, setMediaList] = useState<Array<Media>>([]);
  const [totalData, setTotalData] = useState<number>(0);

  const { search } = useLocation();
  const { setLoading } = useLoader();
  const { handleError } = useError();

  const fetchMediaList = async () => {
    try {
      setLoading(true);
      const { data } = await getMediaList(search);
      if (data.data) {
        setMediaList(data.data.media);
        setTotalData(data.data.totalData);
      }
    } catch (error) {
      handleError(error);
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
          totalData={totalData}
        />
      </div>
    </div>
  );
};
export default AdminNews;
