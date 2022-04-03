import { useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import AgendaCard from "../../components/AgendaCard";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

import useError from "../../hooks/useError";

import { getAgendaList } from "../../models/agenda";

import { Agenda } from "../../types/entities/agenda";

const AgendaList = () => {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);

  const { search } = useLocation();
  const {handleError} = useError();

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
      handleError(error);
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
        {isFetchingAgenda
          ? [...Array(6)].map((_, idx) => <AgendaCard loading key={idx} />)
          : agendaList.map((agenda) => (
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
