import React from "react";
import CardCollapse from "../../components/CardCollapse";
import Input from "../../components/Input";
import Thread from "./components/Thread";

const PostThread = () => {
  return (
    <div className="py-28 px-8 flex gap-x-6 max-w-screen-2xl mx-auto w-full">
      <div className="flex-none w-80 hidden xl:block">
        <div className="flex gap-x-2 items-center">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <Input
            appearance="tertiary"
            className="flex-1"
            placeholder="Apa yang Anda pikirkan, Alfons?"
            fontSize="xs"
          />
        </div>
      </div>
      <div className="flex-1 xl:shadow-lg">
        <div className="flex gap-x-2 items-center my-2 xl:hidden">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <Input
            appearance="primary"
            className="flex-1"
            placeholder="Apa yang Anda pikirkan, Alfons?"
            fontSize="xs"
          />
        </div>
        <Thread />
        <Thread />
        <Thread />
      </div>
      <div className="flex-none w-80 hidden xl:block">
        <h3 className="font-lg font-bold mb-2">
          Pilih Informasi berdasarkan Wilayah
        </h3>
        <CardCollapse />
      </div>
    </div>
  );
};

export default PostThread;
