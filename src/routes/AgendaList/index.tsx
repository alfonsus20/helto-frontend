import React, { useState } from "react";
import Header from "../../components/Header";
import AgendaCard from "../../components/AgendaCard";
import { useLocation, useNavigate } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { Agenda } from "../../types/entities/agenda";
import { AxiosError } from "axios";
import { getAgendaList } from "../../models/agenda";
import qs from "query-string";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const AgendaList = () => {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { search } = useLocation();

  const fetchAgendaList = async () => {
    try {
      setIsFetchingAgenda(true);
      const urlParams = qs.parse(search);
      const { data } = await getAgendaList(
        `?${qs.stringify({ offset: 0, limit: 10, ...urlParams })}`
      );
      if (data.data) {
        setAgendaList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingAgenda(false);
    }
  };

  return (
    <div className="pt-28 pb-12 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Agenda"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <Search
        placeholder="Cari Agenda Terbaru Hari Ini"
        fetchFunc={fetchAgendaList}
      />
      <div className="mt-4 mb-6 grid grid-cols-12 gap-5">
        {agendaList.map((agenda) => (
          <AgendaCard
            title={agenda.name}
            key={agenda.id}
            datetime={agenda.UpdatedAt}
          />
        ))}
      </div>
      <Pagination totalData={9} rowPerPage={10} />
    </div>
  );
};

export default AgendaList;
