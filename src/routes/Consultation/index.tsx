import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import CardCollapse from "../../components/CardCollapse";
import Input from "../../components/Input";
import Thread from "../../components/Thread";

import { useUserContext } from "../../context/UserContext";
import useError from "../../hooks/useError";
import useSnackbar from "../../hooks/useSnackbar";

import {
  getAllPrivateThreads,
  postNewPrivateThreadCommunity,
} from "../../models/thread";

import { Thread as ThreadEntity } from "../../types/entities/thread";

const Consultation = () => {
  const [threadList, setThreadList] = useState<Array<ThreadEntity>>([]);
  const [newThread, setNewThread] = useState<string>("");
  const [isPostingNewThread, setIsPostingNewThread] = useState<boolean>(false);

  const snackbar = useSnackbar();
  const { userInfo } = useUserContext();
  const { handleError } = useError();
  const navigate = useNavigate();

  const fetchThreadList = async () => {
    try {
      const { data } = await getAllPrivateThreads(
        userInfo.thread?.key!,
        "offset=0&limit=100"
      );
      if (data.data) {
        setThreadList(data.data.posts);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handlePostNewThread = async () => {
    try {
      setIsPostingNewThread(true);
      await postNewPrivateThreadCommunity(userInfo.thread?.key!, {
        content: newThread,
      });
      snackbar.success("Postingan berhasil diunggah");
      setNewThread("");
      fetchThreadList();
    } catch (error) {
      handleError(error);
    } finally {
      setIsPostingNewThread(false);
    }
  };

  useEffect(() => {
    if (Object.keys(userInfo).length > 1) {
      if (userInfo.joined) {
        fetchThreadList();
      } else {
        snackbar.error("Claim key terlebih dahulu");
        navigate("/komunitas");
      }
    }
  }, [userInfo]);

  return (
    <div className="py-28 px-8 flex gap-x-6 max-w-screen-2xl mx-auto w-full">
      <div className="flex-none w-80 hidden xl:flex flex-col min-h-[600px]">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4">
          Halaman Konsultasi
        </h1>
        <div className="flex gap-x-2 mb-4">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1 mt-2">
            <Input
              appearance="tertiary"
              className="flex-1"
              placeholder={
                userInfo.name
                  ? `Apa yang Anda pikirkan ${userInfo.name?.split(" ")[0]}?`
                  : "Loading..."
              }
              fontSize="xs"
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button
                shape="pill"
                disabled={isPostingNewThread || !newThread}
                onClick={handlePostNewThread}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-auto">
          <Button shape="rounded" pathname="komunitas">
            Halaman Komunitas
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4 xl:hidden">
          Halaman Konsultasi
        </h1>
        <div className="flex gap-x-2 my-2 xl:hidden max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <img
              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <div className="flex-1">
            <Input
              appearance="primary"
              className="my-2"
              placeholder={
                userInfo.name
                  ? `Apa yang Anda pikirkan ${userInfo.name?.split(" ")[0]}?`
                  : "Loading..."
              }
              fontSize="xs"
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                shape="pill"
                disabled={isPostingNewThread || !newThread}
                onClick={handlePostNewThread}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
        <div className="xl:shadow-lg py-4">
          {threadList.length === 0 ? (
            <div className="p-4">Belum ada postingan</div>
          ) : (
            threadList.map((thread) => (
              <Thread
                id={thread.id}
                key={thread.id}
                userName={thread.author.username}
                content={thread.content}
                datetime={thread.createdAt}
                likeCount={thread.likesCount}
                commentCount={thread.replyCount}
                createdAt={thread.createdAt}
                liked={thread.likes.length === 1}
              />
            ))
          )}
        </div>
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

export default Consultation;
