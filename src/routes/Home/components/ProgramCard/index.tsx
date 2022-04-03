import React from "react";
import classNames from "classnames";

type ProgramCardProps = {
  icon: React.ReactNode;
  iconBgColor: "pink" | "yellow" | "brown";
  title: string;
  content: string;
};

const ProgramCard = ({
  icon,
  title,
  content,
  iconBgColor,
}: ProgramCardProps) => {
  return (
    <div className="relative pt-6 pb-3">
      <div className="text-center shadow-lg px-6 py-4 flex flex-col items-center max-w-[18rem] mx-auto relative pt-24">
        <div
          className={classNames(
            "mb-6 rounded-full p-4 absolute -top-6 shadow-md",
            {
              "bg-pink-500": iconBgColor === "pink",
              "bg-yellow-500": iconBgColor === "yellow",
              "bg-brown-500": iconBgColor === "brown",
            }
          )}
        >
          {icon}
        </div>
        <h3 className="text-brown-700 font-bold text-xl mb-5">{title}</h3>
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default ProgramCard;
