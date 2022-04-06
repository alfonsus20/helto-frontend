import { ArrowRightIcon } from "@heroicons/react/outline";

type CardProps = {
  url?: string;
  media?: "image" | "video";
  description?: string;
  onViewDetail?: () => void;
};

const Card = ({
  url,
  media = "image",
  description,
  onViewDetail,
}: CardProps) => {
  return (
    <div className="col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-3 shadow-md rounded-sm flex flex-row xs:flex-col">
      <div className="flex-shrink-0 xs:flex-shrink w-40 xs:w-full h-40 xs:h-44">
        {media === "video" ? (
          <iframe
            className="rounded-t-sm w-full h-full"
            title="video"
            src={url}
          ></iframe>
        ) : (
          <img
            src={url}
            alt="berita"
            className="object-cover rounded-t-sm w-full h-full"
          />
        )}
      </div>
      <div className="px-4 flex-auto flex flex-col">
        <h4 className="text-[#FE0000] py-2 text-sm font-bold">
          {media === "video" ? "Video" : "Berita"}
        </h4>
        <p className="mb-2 line-clamp-3 sm:line-clamp-4">{description}</p>
        <button
          onClick={onViewDetail}
          className="flex justify-between text-green-400 text-sm pb-4 items-center mt-auto"
        >
          <span className="font-semibold">Lihat Detail</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Card;
