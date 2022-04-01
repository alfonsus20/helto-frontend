import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";
import Input from "../../components/Input";
import AgendaCard from "../../components/AgendaCard";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useLocation, useNavigate } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { Agenda } from "../../types/entities/agenda";
import { AxiosError } from "axios";
import { getAgendaList } from "../../models/agenda";
import qs from 'query-string'

const AgendaList = () => {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();

  const fetchAgendaList = async () => {
    try {
      setIsFetchingAgenda(true);
      const urlParams = qs.parse(search);
      const { data } = await getAgendaList(`?${qs.stringify({ offset: 0, limit: 10, ...urlParams })}`);
      if (data.data) {
        setAgendaList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingAgenda(false);
    }
  };

  const handleSearch = (evt: React.FormEvent) => {
    evt.preventDefault();
    navigate(`${pathname}?${qs.stringify({ keyword })}`);
  }


  useEffectOnce(() => {
    const keywordFromURL = qs.parse(search)['keyword']?.toString();
    if (keywordFromURL) {
      setKeyword(keywordFromURL);
    }
  })

  useEffect(() => {
    fetchAgendaList();
  }, [search]);

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Agenda"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Cari Agenda Terbaru Hari Ini"
          icon={<SearchIcon className="w-5 h-5" />}
          className="mb-6"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </form>
      <div className="mt-4 grid grid-cols-12 gap-5">
        {agendaList.map((agenda) => (
          <AgendaCard
            title={agenda.name}
            key={agenda.id}
            datetime={agenda.UpdatedAt}
          />
        ))}
      </div>
    </div>
  );
};

export default AgendaList;
