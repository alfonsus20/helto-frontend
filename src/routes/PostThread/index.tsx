import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import CardCollapse from "../../components/CardCollapse";
import Input from "../../components/Input";
import Thread from "../../components/Thread";
import Modal from "../../components/Modal";
import { HandIcon, KeyIcon } from "@heroicons/react/outline";

import { useUserContext } from "../../context/UserContext";
import { useModalContext } from "../../context/ModalContext";
import useEffectOnce from "../../hooks/useEffectOnce";
import useError from "../../hooks/useError";
import useSnackbar from "../../hooks/useSnackbar";

import {
  claimKey,
  getAllCommunityThreads,
  joinConsultation,
  postNewThreadCommunity,
} from "../../models/thread";

import { Thread as ThreadEntity } from "../../types/entities/thread";
import { SkeletonThread } from "../../components/Skeleton";

const skeletons = [...Array(6)].map((_, idx) => <SkeletonThread key={idx} />);

const PostThread = () => {
  const [threadList, setThreadList] = useState<Array<ThreadEntity>>([]);
  const [newThread, setNewThread] = useState<string>("");
  const [isPostingNewThread, setIsPostingNewThread] = useState<boolean>(false);
  const [isJoiningColsultation, setIsJoiningConsultation] =
    useState<boolean>(false);
  const [inputKey, setInputKey] = useState<string>("");
  const [isModalConsultationShown, showPopupJoinConsultation] =
    useState<boolean>(false);
  const [isFetchingThread, setIsFetchingThread] = useState<boolean>(false);

  const { userInfo, setUserInfo } = useUserContext();
  const { handleError } = useError();
  const snackbar = useSnackbar();
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  const fetchThreadList = async () => {
    try {
      setIsFetchingThread(true);
      const { data } = await getAllCommunityThreads("offset=0&limit=10");
      if (data.data) {
        setThreadList(data.data.posts);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingThread(false);
    }
  };

  const handlePostNewThread = async () => {
    try {
      setIsPostingNewThread(true);
      await postNewThreadCommunity({ content: newThread });
      snackbar.success("Postingan berhasil diunggah");
      setNewThread("");
      fetchThreadList();
    } catch (error) {
      handleError(error);
    } finally {
      setIsPostingNewThread(false);
    }
  };

  const handleJoinConsultation = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      setIsJoiningConsultation(true);
      const { data } = await joinConsultation(inputKey);
      if (data.data) {
        snackbar.success("Berhasil bergabung");
        setUserInfo({
          ...userInfo,
          thread: { key: data.data.thread.key },
          joined: true,
        });
        showPopupJoinConsultation(false);
        navigate(`/konsultasi`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsJoiningConsultation(false);
    }
  };

  const handleClaimKey = async () => {
    try {
      const { data } = await claimKey();
      if (data.data) {
        openModal(
          <div className="space-y-3">
            <h1 className="font-bold text-2xl">Kode</h1>
            <p className="text-center text-3xl">{data.data}</p>
            <p>Harap salin kunci diatas untuk gabung pada grup konsultasi.</p>
          </div>
        );
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffectOnce(() => {
    fetchThreadList();
  });

  return (
    <div className="py-28 px-8 flex gap-x-6 max-w-screen-2xl mx-auto w-full">
      <Modal
        isOpen={isModalConsultationShown}
        onClose={() => showPopupJoinConsultation(false)}
      >
        <form className="space-y-4" onSubmit={handleJoinConsultation}>
          <h1 className="font-bold text-2xl">Enroll Key</h1>
          <Input
            required
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <p className="text-sm">
            Masukkan kode agar bisa melakukan konsultasi dengan orang yang ahli
            di bidangnya.
          </p>
          <div className="flex justify-center">
            <Button shape="rounded" disabled={isJoiningColsultation}>
              Gabung
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex-none w-80 hidden xl:flex flex-col">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4">
          Halaman Komunitas
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
        {userInfo.name && !userInfo.joined && (
          <>
            <div className="shadow-md p-4 mb-4">
              <div className="flex gap-x-2">
                <div className="flex-shrink-0 pt-1">
                  <KeyIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2">Claim Key untuk bisa berkonsultasi.</p>
                  <div className="flex justify-end">
                    <Button shape="pill" onClick={handleClaimKey}>
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md p-4 mb-4">
              <div className="flex gap-x-2">
                <div className="flex-shrink-0 pt-1">
                  <HandIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2">Konsultasikan Tanaman Anda!</p>
                  <p className="text-sm">
                    Konsultasikan tanaman kentang Anda dengan orang yang ahli
                    dibidangnya dan dapatkan hasil kentang yang berkualitas.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      shape="pill"
                      onClick={() => showPopupJoinConsultation(true)}
                    >
                      Gabung
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center mt-auto">
          <Button shape="rounded" pathname="konsultasi">
            Halaman Konsultasi
          </Button>
        </div>
      </div>
      <div className="flex-1 xl:shadow-lg ">
        <h1 className="text-2xl font-semibold text-center pb-2 border-b-[1px] border-black mb-4 xl:hidden">
          Halaman Komunitas
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
        {userInfo.name && !userInfo.joined && (
          <div className="xl:hidden max-w-3xl mx-auto">
            <div className="shadow-md p-4 mb-4">
              <div className="flex gap-x-2">
                <div className="flex-shrink-0 pt-1">
                  <KeyIcon className="w-5 h-5" />
                </div>
                <div className="flex-auto">
                  <p className="mb-2">Claim Key untuk bisa berkonsultasi.</p>
                  <div className="flex justify-end">
                    <Button shape="pill" onClick={handleClaimKey}>
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md p-4 mb-4">
              <div className="flex gap-x-2">
                <div className="flex-shrink-0 pt-1">
                  <HandIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2">Konsultasikan Tanaman Anda!</p>
                  <p className="text-sm mb-2">
                    Konsultasikan tanaman kentang Anda dengan orang yang ahli
                    dibidangnya dan dapatkan hasil kentang yang berkualitas.
                  </p>
                  <div className="flex justify-end">
                    <Button
                      shape="pill"
                      onClick={() => showPopupJoinConsultation(true)}
                    >
                      Gabung
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="py-4">
          {isFetchingThread ? (
            skeletons
          ) : threadList.length === 0 ? (
            <div className="min-h-[200px] flex justify-center items-center">
              Belum ada postingan
            </div>
          ) : (
            threadList.map((thread) => (
              <Thread
                id={thread.id}
                key={thread.id}
                userName={thread.author.username}
                content={thread.content}
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

export default PostThread;
