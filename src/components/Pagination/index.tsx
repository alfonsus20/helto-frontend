import  { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import useEffectOnce from "../../hooks/useEffectOnce";

type PaginationProps = {
  totalData: number;
  rowPerPage: number;
};

const Pagination = ({ totalData, rowPerPage }: PaginationProps) => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const ref = useRef(false);

  const totalPage = useMemo(() => {
    return Math.ceil(totalData / rowPerPage);
  }, [totalData, rowPerPage]);

  const goPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goNext = () => {
    if (page < Math.ceil(totalPage)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const currParams = qs.parse(search);
      const nextParams = { ...currParams, offset: (page - 1) * rowPerPage };
      navigate(`${pathname}?${qs.stringify(nextParams)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffectOnce(() => {
    ref.current = true;
    const currOffset = qs.parse(search)["offset"];
    if (currOffset) {
      setPage(+currOffset / rowPerPage + 1);
    }
    return () => {
      ref.current = false;
    };
  });

  return (
    <div
      className={`${
        totalData === 0 ? "hidden" : "flex"
      } justify-around max-w-[220px] mx-auto items-center`}
    >
      <button
        onClick={goPrev}
        className="rounded-full p-1 bg-brown-500 text-white"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      <div>
        Hal <span className="font-bold">{page}</span> dari{" "}
        <span className="font-bold">{totalPage}</span>
      </div>
      <button
        onClick={goNext}
        className="rounded-full p-1 bg-brown-500 text-white"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
