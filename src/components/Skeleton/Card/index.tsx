const Card = () => {
  return (
    <div className="col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3 shadow-md rounded-sm flex flex-row xs:flex-col animate-pulse">
      <div className="flex-shrink-0 xs:flex-shrink w-40 xs:w-full h-40 xs:h-44 bg-slate-200"></div>
      <div className="px-4 flex-auto flex flex-col">
        <div className="bg-slate-200 w-1/3 h-3 my-2 rounded"></div>
        <div className="skeleton space-y-2 my-auto xs:my-0">
          <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
          <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
          <div className="h-3 xs:h-2 bg-slate-200 rounded"></div>
        </div>
        <div className="flex justify-between py-3 mt-auto">
          <div className="w-[40%] bg-slate-200 h-3 rounded"></div>
          <div className="w-[15%] bg-slate-200 h-3 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
