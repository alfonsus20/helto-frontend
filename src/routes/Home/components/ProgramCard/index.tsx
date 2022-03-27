import classNames from "classnames";
import React from "react";

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
    <div className="text-center shadow-lg px-6 py-4 flex flex-col items-center max-w-[18rem] relative pt-24">
      <div
        className={classNames("mb-6 rounded-full p-4 absolute -top-4 shadow-md", {
          "bg-pink-500": iconBgColor === "pink",
          "bg-yellow-500": iconBgColor === "yellow",
          "bg-brown-500": iconBgColor === "brown",
        })}
      >
        {icon}
      </div>
      <h4 className="text-brown-700 font-bold text-xl mb-5">{title}</h4>
      <p className="">{content}</p>
    </div>
  );
};

export default ProgramCard;
