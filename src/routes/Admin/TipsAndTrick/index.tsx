import { useState } from "react";
import { useLocation } from "react-router-dom";

import Table from "../../../components/Table";

import { useLoader } from "../../../context/LoaderContext";
import useError from "../../../hooks/useError";

import {
  deleteTipsAndTrick,
  getTipsAndTrickList,
} from "../../../models/tipsAndTrick";

import { TipsAndTrick } from "../../../types/entities/tipsAndTrick";

const AdminTipsAndTrick = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<Array<TipsAndTrick>>(
    []
  );

  const { search } = useLocation();
  const { setLoading } = useLoader();
  const { handleError } = useError();

  const fetchTipsAndTrickList = async () => {
    try {
      setLoading(true);
      const { data } = await getTipsAndTrickList(search);
      if (data.data) {
        setTipsAndTrickList(data.data.tipsAndTrick);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Tips And Trik</h1>
      <div className="bg-white p-5">
        <Table
          fetchFunc={fetchTipsAndTrickList}
          deleteFunc={deleteTipsAndTrick}
          searchPlaceholder="Cari Tips dan Trik"
          body={{
            id: { type: "text" },
            title: { type: "text", title: "Judul" },
            content: { type: "text", title: "Konten", wrapped: true },
            image: { type: "image", title: "Image" },
            updatedAt: { type: "date", title: "Tanggal" },
            createdAt: { type: "date" },
          }}
          data={tipsAndTrickList}
        />
      </div>
    </div>
  );
};

export default AdminTipsAndTrick;
