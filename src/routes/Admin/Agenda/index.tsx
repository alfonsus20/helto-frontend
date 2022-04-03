import { useState } from "react";

import Table from "../../../components/Table";

import useError from "../../../hooks/useError";
import { useLocation } from "react-router-dom";
import { useLoader } from "../../../context/LoaderContext";

import { deleteAgenda, getAgendaList } from "../../../models/agenda";

import { Agenda } from "../../../types/entities/agenda";

const AdminNews = () => {
  const [agendaList, setAgendaList] = useState<Array<Agenda>>([]);
  const { setLoading } = useLoader();

  const { search } = useLocation();
  const { handleError } = useError();

  const fetchAgendaList = async () => {
    try {
      setLoading(true);
      const { data } = await getAgendaList(search);
      if (data.data) {
        setAgendaList(data.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

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
