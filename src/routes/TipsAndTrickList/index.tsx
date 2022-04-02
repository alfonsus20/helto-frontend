import React, { useState } from "react";
import Header from "../../components/Header";
import WideCard from "../../components/WideCard";
import useSnackbar from "../../hooks/useSnackbar";
import { TipsAndTrick } from "../../types/entities/tipsAndTrick";
import { AxiosError } from "axios";
import { getTipsAndTrickList } from "../../models/tipsAndTrick";
import { getImageURL } from "../../utils/helper";
import { useModalContext } from "../../context/ModalContext";
import NewsModal from "../../components/NewsModal";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import Search from "../../components/Search";

const TipsAndTrickList = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<Array<TipsAndTrick>>(
    []
  );
  const [isFetchingTipsAndTrick, setIsFetchingTipsAndTrick] =
    useState<boolean>(false);

  const snackbar = useSnackbar();
  const { openModal } = useModalContext();
  const { search } = useLocation();

  const handleViewNewsDetail = (tipsAndTrickId: number) => {
    const foundTipsAndTrick = tipsAndTrickList.find(
      (tipsAndTrick) => tipsAndTrick.id === tipsAndTrickId
    )!;
    const modalDOM = (
      <NewsModal
        title={foundTipsAndTrick.title}
        content={foundTipsAndTrick.content}
        imageURL={getImageURL(foundTipsAndTrick.image)}
      />
    );
    openModal(modalDOM, "2xl");
  };

  const fetchTipsAndTrickList = async () => {
    try {
      setIsFetchingTipsAndTrick(true);
      const urlParams = qs.parse(search);
      const { data } = await getTipsAndTrickList(
        `?${qs.stringify({ offset: 0, limit: 9, ...urlParams })}`
      );
      if (data.data) {
        setTipsAndTrickList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingTipsAndTrick(false);
    }
  };

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Tips dan"
        blackText="Trik"
        textAlign="left"
        className="mb-4"
      />
      <Search
        placeholder="Cari Tips dan Trik Terbaru Hari Ini"
        fetchFunc={fetchTipsAndTrickList}
      />
      <div className="mt-4 grid grid-cols-12 gap-5">
        {tipsAndTrickList.map((tipsAndTrick) => (
          <WideCard
            title={tipsAndTrick.title}
            shadow="md"
            key={tipsAndTrick.id}
            className="mb-2 col-span-12 xs:col-span-6 lg:col-span-4"
            content={tipsAndTrick.content}
            imageUrl={getImageURL(tipsAndTrick.image)}
            onClick={() => handleViewNewsDetail(tipsAndTrick.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TipsAndTrickList;
