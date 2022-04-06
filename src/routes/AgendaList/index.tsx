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
import { SkeletonAgenda } from "../../components/Skeleton";

const skeletons = [...Array(9)].map((_, idx) => <SkeletonAgenda key={idx} />);

const AgendaList = () => {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const { search } = useLocation();
  const { handleError } = useError();

  const fetchAgendaList = async () => {
    try {
      setIsFetchingAgenda(true);
      const urlParams = qs.parse(search);
      const { data } = await getAgendaList(
        `?${qs.stringify({ offset: 0, limit: 9, ...urlParams })}`
      );
      if (data.data) {
        setAgendaList(data.data.agenda);
        setTotalData(data.data.totalData);
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
          ? skeletons
          : agendaList.map((agenda) => (
              <AgendaCard
                title={agenda.name}
                key={agenda.id}
                datetime={agenda.UpdatedAt}
              />
            ))}
      </div>
      <Pagination totalData={totalData} rowPerPage={9} />
    </div>
  );
};

export default AgendaList;
