import React, { useState } from "react";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import {
  deleteTipsAndTrick,
  getTipsAndTrickList,
} from "../../../models/tipsAndTrick";
import { TipsAndTrick } from "../../../types/entities/tipsAndTrick";
import { useLoader } from "../../../context/LoaderContext";

const AdminTipsAndTrick = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<Array<TipsAndTrick>>(
    []
  );

  const { search } = useLocation();
  const snackbar = useSnackbar();
  const { setLoading } = useLoader();

  const fetchTipsAndTrickList = async () => {
    try {
      setLoading(true);
      const { data } = await getTipsAndTrickList(search);
      if (data.data) {
        setTipsAndTrickList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
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
