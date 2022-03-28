import React from "react";
import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import classNames from "classnames";

type ThreadProps = {
  imageUrl: string;
  userName: string;
  content: string;
  datetime: string;
  likeCount: number;
  commentCount: number;
  handleLike: () => void;
  handleComment: () => void;
  className: string;
};

const Thread = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        "py-6 lg:px-8 flex gap-x-4 lg:gap-x-2 mx-auto max-w-3xl",
        className
      )}
    >
      <div className="flex-shrink-0">
        <img
          src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex gap-x-2">
          <h4 className="font-semibold">Alfons</h4>
          <span className="text-gray-400">• 12h</span>
        </div>
        <div className="mb-2">
          Saya petani kentang yang berasal dari kota Malang. Saya ingin
          bertanya, pada beberapa bulan ini hasil panen saya mengalami penurunan
          yang disebabkan oleh curah hujan yang tinggi. Kira - kira apakah ada
          saran agar tanaman kentang saya yang masi berusia 1 bulan ini bisa
          tetap tumbuh meskipun terkena air yang cukup banyak? #DaerahMalang
        </div>
        <div className="flex gap-x-6">
          <button className="flex gap-x-1 items-center">
            <ChatIcon className="w-5 h-5" /> 28
          </button>
          <button className="flex gap-x-1 items-center">
            <HeartIcon className="w-5 h-5" /> 21
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thread;
