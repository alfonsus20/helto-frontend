import classNames from "classnames";
import dayjs from "dayjs";

import { DAYS_OF_THE_WEEK, MONTHS } from "../../utils/constants";

type AgendaCardProps = {
  title?: string;
  datetime?: string;
  loading?: boolean;
};

const AgendaCard = ({ title, datetime, loading }: AgendaCardProps) => {
  return (
    <div
      className={classNames(
        "col-span-12 xs:col-span-6 sm:col-span-4 flex flex-row items-center gap-x-4 p-4 rounded-md shadow-md",
        { "animate-pulse": loading }
      )}
    >
      <div
        className={classNames(
          "flex-shrink-0 text-center  px-6 py-3 rounded-xl",
          {
            "bg-[#E6D5C9]": !loading,
            "bg-slate-200": loading,
          }
        )}
      >
        {loading ? (
          <div className="w-12 h-16"></div>
        ) : (
          <>
            <div className="text-[#B09C8E] text-sm">
              {DAYS_OF_THE_WEEK[dayjs(datetime).day()]}
            </div>
            <div className="text-brown-500 text-2xl">
              {dayjs(datetime).date()}
            </div>
            <div className="text-brown-500 text-sm">
              {MONTHS[dayjs(datetime).month()]}
            </div>
          </>
        )}
      </div>
      <div className="flex-auto">
        {loading ? (
          <div className="space-y-2">
            <div className="bg-slate-200 h-4 rounded"></div>
            <div className="bg-slate-200 h-4 rounded"></div>
          </div>
        ) : (
          <p className="mb-2 font-semibold line-clamp-3">{title}</p>
        )}
      </div>
    </div>
  );
};

export default AgendaCard;
