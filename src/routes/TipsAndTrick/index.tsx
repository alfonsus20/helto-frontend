import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { ChevronRightIcon } from "@heroicons/react/outline";
import Header from "../../components/Header";
import WideCard from "../../components/WideCard";
import NewsModal from "../../components/NewsModal";

import useEffectOnce from "../../hooks/useEffectOnce";
import useError from "../../hooks/useError";
import { useModalContext } from "../../context/ModalContext";

import { getTipsAndTrickList } from "../../models/tipsAndTrick";

import { TipsAndTrick as TipsAndTrickEntity } from "../../types/entities/tipsAndTrick";

import { getImageURL } from "../../utils/helper";
import { SkeletonWideCard } from "../../components/Skeleton";

const wideCardSkeleton = [...Array(4)].map((_, idx) => (
  <SkeletonWideCard key={idx} />
));

const TipsAndTrick = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<
    Array<TipsAndTrickEntity>
  >([]);
  const [isFetchingTipsAndTrick, setIsFetchingTipsAndTrick] =
    useState<boolean>(false);

  const { openModal } = useModalContext();
  const { handleError } = useError();

  const fetchTipsAndTrickList = async () => {
    try {
      setIsFetchingTipsAndTrick(true);
      const { data } = await getTipsAndTrickList("?offset=0&limit=9");
      if (data.data) {
        setTipsAndTrickList(data.data.tipsAndTrick);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingTipsAndTrick(false);
    }
  };

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

  useEffectOnce(() => {
    fetchTipsAndTrickList();
  });

  return (
    <div className="py-28 max-w-7xl mx-auto w-full">
      <section className="px-8">
        <div className="flex justify-between mb-4">
          <Header brownText="Tips dan" blackText="Trik" textAlign="left" />
          <Link
            to="/tips-dan-trik/selengkapnya"
            className="flex items-center gap-x-4 text-green-600 font-bold"
          >
            <span> Lihat Semua</span> <ChevronRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-12 mx-auto max-w-7xl gap-4">
          <div
            className={classNames(
              "col-span-12 sm:col-span-5 lg:col-span-4 relative min-h-[15rem] sm:min-h-[30rem]",
              { "animate-pulse bg-slate-200": isFetchingTipsAndTrick }
            )}
          >
            {tipsAndTrickList.length > 0 && !isFetchingTipsAndTrick && (
              <>
                <img
                  src={getImageURL(tipsAndTrickList[0].image)}
                  alt="kentang"
                  className="w-full h-80 sm:h-full object-cover object-center cursor-pointer"
                  onClick={() => handleViewDetail(tipsAndTrickList[0].id)}
                />
                <div className="bg-black bg-opacity-70 absolute bottom-0 w-full p-4 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {tipsAndTrickList[0].title}
                  </h3>
                  <p className="line-clamp-3">{tipsAndTrickList[0].content}</p>
                </div>
              </>
            )}
          </div>
          <div className="col-span-12 sm:col-span-7 lg:col-span-4 space-y-2">
            {isFetchingTipsAndTrick
              ? wideCardSkeleton
              : tipsAndTrickList
                  .slice(1, 5)
                  .map((tipsAndTrick) => (
                    <WideCard
                      title={tipsAndTrick.title}
                      shadow="md"
                      key={tipsAndTrick.id}
                      content={tipsAndTrick.content}
                      imageUrl={getImageURL(tipsAndTrick.image)}
                      onClick={() => handleViewDetail(tipsAndTrick.id)}
                    />
                  ))}
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-2">
            {isFetchingTipsAndTrick
              ? wideCardSkeleton
              : tipsAndTrickList
                  .slice(5, 8)
                  .map((tipsAndTrick) => (
                    <WideCard
                      title={tipsAndTrick.title}
                      shadow="md"
                      key={tipsAndTrick.id}
                      content={tipsAndTrick.content}
                      imageUrl={getImageURL(tipsAndTrick.image)}
                      onClick={() => handleViewDetail(tipsAndTrick.id)}
                    />
                  ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipsAndTrick;
