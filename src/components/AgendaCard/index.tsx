import dayjs from "dayjs";
import React from "react";
import { DAYS_OF_THE_WEEK, MONTHS } from "../../utils/constants";

type AgendaCardProps = {
  title: string;
  datetime: string;
};

const AgendaCard = ({ title, datetime }: AgendaCardProps) => {
  return (
    <div
      className="col-span-12 xs:col-span-6 sm:col-span-4 
      flex flex-row items-center gap-x-4 p-4 rounded-md shadow-md"
    >
      <div className="flex-shrink-0 text-center bg-[#E6D5C9] px-6 py-3 rounded-xl">
        <div className="text-[#B09C8E] text-sm">
          {DAYS_OF_THE_WEEK[dayjs(datetime).day()]}
        </div>
        <div className="text-brown-500 text-2xl">
          {dayjs(datetime).date()}
        </div>
        <div className="text-brown-500 text-sm">
          {MONTHS[dayjs(datetime).month()]}
        </div>
      </div>
      <div className="flex-auto">
        <p className="mb-2 font-semibold line-clamp-3">{title}</p>
      </div>
    </div>
  );
};

export default AgendaCard;
