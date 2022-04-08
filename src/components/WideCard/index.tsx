import React from "react";
import classNames from "classnames";

type WideCardProps = {
  imageUrl?: string;
  title?: string;
  content?: string;
  className?: string;
  shadow?: "none" | "md";
  onClick?: (event: React.MouseEvent) => void;
};

const WideCard = ({
  imageUrl,
  title,
  content,
  className,
  shadow = "none",
  onClick,
}: WideCardProps) => {
  return (
    <div
      className={classNames(
        "flex items-center cursor-pointer gap-x-2",
        className,
        {
          "shadow-none": shadow === "none",
          "shadow-md": shadow === "md",
        }
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-24 xs:w-28 md:w-32 h-24 xs:h-28 md:h-32 rounded-md">
        <img
          src={imageUrl}
          alt="berita"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="text-sm md:text-base flex-1 px-2">
        <h3 className="font-bold text-brown-700 text-sm xs:mb-2">{title}</h3>
        <p className="hidden xs:line-clamp-3 text-sm">{content}</p>
      </div>
    </div>
  );
};

export default WideCard;
