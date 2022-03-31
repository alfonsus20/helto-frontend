import React from "react";
import classNames from "classnames";

type WideCardProps = {
  imageUrl: string;
  title: string;
  content: string;
  className?: string;
  shadow?: "none" | "md";
  onClick?: (event: React.MouseEvent) => void;
};

const WideCard = ({
  imageUrl,
  title,
  content,
  className,
  onClick,
  shadow = "none",
}: WideCardProps) => {
  return (
    <div
      className={classNames(
        "flex gap-2 xs:gap-4 items-center cursor-pointer",
        className,
        {
          "shadow-none": shadow === "none",
          "shadow-md": shadow === "md",
        }
      )}
      onClick={onClick ? onClick : () => {}}
    >
      <img
        src={imageUrl}
        alt="berita"
        className="flex-shrink-0 w-24 xs:w-28 md:w-32 h-24 xs:h-28 md:h-32 rounded-md object-cover object-center"
      />
      <div className="text-sm md:text-base">
        <h5 className="font-bold text-brown-700 xs:mb-2">{title}</h5>
        <p className="line-clamp-3">{content}</p>
      </div>
    </div>
  );
};

export default WideCard;
