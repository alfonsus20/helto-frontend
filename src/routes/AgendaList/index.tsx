import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";
import Input from "../../components/Input";
import AgendaCard from "../../components/AgendaCard";
import useEffectOnce from "../../hooks/useEffectOnce";
import { useModalContext } from "../../context/ModalContext";
import { useLocation } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { Agenda } from "../../types/entities/agenda";
import { AxiosError } from "axios";
import { getAgendaList } from "../../models/agenda";

const AgendaList = () => {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [isFetchingAgenda, setIsFetchingAgenda] = useState<boolean>(false);

  const { openModal } = useModalContext();
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

  useEffectOnce(() => {
    fetchAgendaList();
  });

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Agenda"
        blackText="Terkini"
        textAlign="left"
        className="mb-4"
      />
      <Input
        placeholder="Cari Agenda Terbaru Hari Ini"
        icon={<SearchIcon className="w-5 h-5" />}
        className="mb-6"
      />
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
