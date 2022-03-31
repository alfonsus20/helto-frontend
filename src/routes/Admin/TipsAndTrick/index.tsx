import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import { deleteNews } from "../../../models/news";
import { getTipsAndTrickList } from "../../../models/tipsAndTrick";
import { TipsAndTrick } from "../../../types/entities/tipsAndTrick";

const AdminTipsAndTrick = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<Array<TipsAndTrick>>([]);
  const [isFetchingTipsAndTrick, setIsFetchingTipsAndTrick] =
    useState<boolean>(false);

  const { search } = useLocation();
  const snackbar = useSnackbar();

  const fetchTipsAndTrickList = async () => {
    try {
      setIsFetchingTipsAndTrick(true);
      const { data } = await getTipsAndTrickList(search);
      if (data.data) {
        setTipsAndTrickList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingTipsAndTrick(false);
    }
  };

  useEffect(() => {
    fetchTipsAndTrickList();
  }, [search]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Tips And Trik</h1>
      <div className="bg-white p-5">
        <Table
          editURL=""
          deleteFunc={deleteNews}
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
