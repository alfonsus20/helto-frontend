const Agenda = () => {
  return (
    <div className="col-span-12 xs:col-span-6 sm:col-span-4 flex flex-row items-center gap-x-4 p-4 rounded-md shadow-md animate-pulse">
      <div className="flex-shrink-0 rounded-xl bg-slate-200">
        <div className="w-20 h-20"></div>
      </div>
      <div className="flex-auto">
        <div className="space-y-2">
          <div className="bg-slate-200 h-4 rounded"></div>
          <div className="bg-slate-200 h-4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
