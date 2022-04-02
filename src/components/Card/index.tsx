import React from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import classNames from "classnames";

type CardProps = {
  url?: string;
  media?: "image" | "video";
  description?: string;
  onViewDetail?: () => void;
  loading?: boolean;
};

const Card = ({
  url,
  media = "image",
  description,
  onViewDetail,
  loading,
}: CardProps) => {
  return (
    <div
      className={classNames(
        "col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3 shadow-md rounded-sm flex flex-row xs:flex-col",
        { "animate-pulse": loading }
      )}
    >
      <div
        className={classNames(
          "flex-shrink-0 xs:flex-shrink w-40 xs:w-full h-40 xs:h-44",
          { "bg-slate-200": loading }
        )}
      >
        {!loading &&
          (media === "video" ? (
            <iframe
              className="rounded-t-sm w-full h-full"
              title="video"
              src={url}
            ></iframe>
          ) : (
            <img
              src={url}
              alt="berita"
              className="object-cover rounded-t-sm w-full h-full"
            />
          ))}
      </div>
      <div className="px-4 flex-auto flex flex-col">
        {loading ? (
          <div className="bg-slate-200 w-1/3 h-3 my-2 rounded"></div>
        ) : (
          <h4 className="text-[#FE0000] py-2 text-sm font-bold">
            {media === "video" ? "Video" : "Berita"}
          </h4>
        )}
        {loading ? (
          <div className="skeleton space-y-2 my-auto xs:my-0">
            <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
            <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
            <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
          </div>
        ) : (
          <p className="mb-2 line-clamp-3 sm:line-clamp-4">{description}</p>
        )}
        {loading ? (
          <div className="flex justify-between py-3 mt-auto">
            <div className="w-[40%] bg-slate-200 h-3 rounded"></div>
            <div className="w-[15%] bg-slate-200 h-3 rounded"></div>
          </div>
        ) : (
          <button
            onClick={onViewDetail}
            className="flex justify-between text-green-400 text-sm pb-4 items-center mt-auto"
          >
            <span className="font-semibold">Lihat Detail</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
