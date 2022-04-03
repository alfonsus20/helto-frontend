import { useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import Header from "../../components/Header";
import WideCard from "../../components/WideCard";
import NewsModal from "../../components/NewsModal";
import Search from "../../components/Search";

import useError from "../../hooks/useError";
import { useModalContext } from "../../context/ModalContext";

import { getTipsAndTrickList } from "../../models/tipsAndTrick";

import { TipsAndTrick } from "../../types/entities/tipsAndTrick";

import { getImageURL } from "../../utils/helper";

const wideCardSkeleton = [...Array(6)].map((_, idx) => (
  <WideCard
    loading
    key={idx}
    className="col-span-12 xs:col-span-6 lg:col-span-4"
  />
));

const TipsAndTrickList = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<Array<TipsAndTrick>>(
    []
  );
  const [isFetchingTipsAndTrick, setIsFetchingTipsAndTrick] =
    useState<boolean>(false);

  const { openModal } = useModalContext();
  const { search } = useLocation();
  const { handleError } = useError();

  const handleViewDetail = (tipsAndTrickId: number) => {
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
        setTipsAndTrickList(data.data.tipsAndTrick);
      }
    } catch (error) {
      handleError(error);
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
        {isFetchingTipsAndTrick
          ? wideCardSkeleton
          : tipsAndTrickList.map((tipsAndTrick) => (
              <WideCard
                title={tipsAndTrick.title}
                shadow="md"
                key={tipsAndTrick.id}
                className="col-span-12 xs:col-span-6 lg:col-span-4"
                content={tipsAndTrick.content}
                imageUrl={getImageURL(tipsAndTrick.image)}
                onClick={() => handleViewDetail(tipsAndTrick.id)}
              />
            ))}
      </div>
    </div>
  );
};

export default TipsAndTrickList;
