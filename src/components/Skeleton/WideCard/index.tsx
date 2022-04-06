import classNames from "classnames";

type WideCardProps = {
  className?: string;
};

const WideCard = ({ className }: WideCardProps) => {
  return (
    <div
      className={classNames(
        "flex items-center cursor-pointer gap-x-2",
        className
      )}
    >
      <div className="flex-shrink-0 w-24 xs:w-28 md:w-32 h-24 xs:h-28 md:h-32 rounded-md animate-pulse bg-slate-200"></div>
      <div className="text-sm md:text-base flex-1 px-2">
        <div className="animate-pulse space-y-2">
          <div className="w-full h-3 bg-slate-200 rounded"></div>
          <div className="w-full h-3 bg-slate-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default WideCard;
