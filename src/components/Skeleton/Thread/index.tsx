const Thread = () => {
  return (
    <div className="py-2 lg:px-8 flex gap-x-4 lg:gap-x-2 mx-auto max-w-3xl animate-pulse">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 w-[30%] bg-slate-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded-full"></div>
          <div className="h-3 bg-slate-200 rounded-full"></div>
        </div>
        <div className="flex gap-x-2">
          <div className="flex gap-x-1">
            <div className="bg-slate-200 rounded-full h-5 w-5"></div>
            <div className="bg-slate-200 rounded-full h-5 w-5"></div>
          </div>
          <div className="flex gap-x-1">
            <div className="bg-slate-200 rounded-full h-5 w-5"></div>
            <div className="bg-slate-200 rounded-full h-5 w-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
