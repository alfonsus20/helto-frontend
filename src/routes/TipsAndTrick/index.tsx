import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { AxiosError } from "axios";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import WideCard from "../../components/WideCard";
import useEffectOnce from "../../hooks/useEffectOnce";
import useSnackbar from "../../hooks/useSnackbar";
import { getTipsAndTrickList } from "../../models/tipsAndTrick";
import { TipsAndTrick as TipsAndTrickEntity } from "../../types/entities/tipsAndTrick";
import { getImageURL } from "../../utils/helper";

const TipsAndTrick = () => {
  const [tipsAndTrickList, setTipsAndTrickList] = useState<
    Array<TipsAndTrickEntity>
  >([]);
  const [isFetchingTipsAndTrick, setIsFetchingTipsAndTrick] =
    useState<boolean>(false);

  const { search } = useLocation();
  const snackbar = useSnackbar();

  const fetchTipsAndTrickList = async () => {
    try {
      setIsFetchingTipsAndTrick(true);
      const { data } = await getTipsAndTrickList("?offset=0&limit=9");
      if (data.data) {
        setTipsAndTrickList(data.data);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingTipsAndTrick(false);
    }
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
          <div className="col-span-12 sm:col-span-5 lg:col-span-4 relative">
            {tipsAndTrickList.length > 0 && (
              <>
                <img
                  src={getImageURL(tipsAndTrickList[0].image)}
                  alt="kentang"
                  className="w-full h-80 sm:h-full object-cover object-center"
                />
                <div className="bg-black bg-opacity-70 absolute bottom-0 w-full p-4 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {tipsAndTrickList[0].title}
                  </h3>
                  <p>{tipsAndTrickList[0].content}</p>
                </div>
              </>
            )}
          </div>
          <div className="col-span-12 sm:col-span-7 lg:col-span-4">
            {tipsAndTrickList.slice(1, 6).map((tipsAndTrick, idx) => (
              <WideCard
                title="Lorem ipsum"
                shadow="md"
                key={idx}
                className="mb-2"
                content={tipsAndTrick.content}
                imageUrl={getImageURL(tipsAndTrick.image)}
              />
            ))}
          </div>{" "}
          <div className="col-span-12 lg:col-span-4">
            {tipsAndTrickList.slice(6, 10).map((tipsAndTrick, idx) => (
              <WideCard
                title="Lorem ipsum"
                shadow="md"
                key={idx}
                className="mb-2"
                content={tipsAndTrick.content}
                imageUrl={getImageURL(tipsAndTrick.image)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TipsAndTrick;
