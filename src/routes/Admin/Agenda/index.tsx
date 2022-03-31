import React, { useEffect, useState } from "react";
import Table from "../../../components/Table";
import useSnackbar from "../../../hooks/useSnackbar";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { deleteAgenda, getAgendaList } from "../../../models/agenda";
import { Agenda } from "../../../types/entities/agenda";

const AdminNews = () => {
  const [agendaList, setAgendaList] = useState<Array<Agenda>>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);

  const { search } = useLocation();
  const snackbar = useSnackbar();

  const fetchAgendaList = async () => {
    try {
      setIsFetchingAgenda(true);
      const { data } = await getAgendaList(search);
      if (data.data) {
        setAgendaList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingAgenda(false);
    }
  };

  useEffect(() => {
    fetchAgendaList();
  }, [search]);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Agenda Terkini</h1>
      <div className="bg-white p-5">
        <Table
          fetchFunc={fetchAgendaList}
          deleteFunc={deleteAgenda}
          body={{
            id: { type: "text" },
            name: { type: "text", title: "Judul" },
            date: { type: "date", title: "Tanggal" },
            UpdatedAt: { type: "date" },
            createdAt: { type: "date" },
          }}
          data={agendaList}
          searchPlaceholder="Cari Agenda Terkini"
        />
      </div>
    </div>
  );
};
export default AdminNews;
