import React from "react";
import classNames from "classnames";

type WideCardProps = {
  imageUrl?: string;
  title?: string;
  content?: string;
  className?: string;
  shadow?: "none" | "md";
  loading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const WideCard = ({
  imageUrl,
  title,
  content,
  className,
  shadow = "none",
  loading,
  onClick,
}: WideCardProps) => {
  return (
    <div
      className={classNames("flex items-center cursor-pointer", className, {
        "shadow-none": shadow === "none",
        "shadow-md": shadow === "md",
      })}
      onClick={onClick}
    >
      <div
        className={classNames(
          "flex-shrink-0 w-24 xs:w-28 md:w-32 h-24 xs:h-28 md:h-32 rounded-md",
          {
            "animate-pulse bg-slate-200": loading,
          }
        )}
      >
        {!loading && (
          <img
            src={imageUrl}
            alt="berita"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
      <div className="text-sm md:text-base flex-1 px-2">
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="w-full h-3 bg-slate-200 rounded"></div>
            <div className="w-full h-3 bg-slate-200 rounded"></div>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-brown-700 xs:mb-2">{title}</h3>
            <p className="hidden xs:line-clamp-3">{content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default WideCard;
