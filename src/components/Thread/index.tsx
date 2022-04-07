import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import classNames from "classnames";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import Button from "../Button";
import Loader from "../Loader";
import TextArea from "../TextArea";
import { useUserContext } from "../../context/UserContext";
import useError from "../../hooks/useError";
import useSnackbar from "../../hooks/useSnackbar";
import {
  getCommunityThreadById,
  likeThreadCommunity,
  replyToThreadCommunity,
} from "../../models/thread";
import { ThreadDetail } from "../../types/entities/thread";

dayjs.extend(relativeTime);
dayjs.locale("id");

type ThreadProps = {
  id: number;
  userName: string;
  content: string;
  likeCount: number;
  commentCount: number;
  handleLike?: () => void;
  handleComment?: () => void;
  className?: string;
  createdAt: string;
  liked: boolean;
};

const Thread = ({
  id,
  userName,
  content,
  likeCount,
  commentCount,
  className,
  createdAt,
  liked,
}: ThreadProps) => {
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [threadDetail, setThreadDetail] = useState<ThreadDetail>(
    {} as ThreadDetail
  );
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [countReply, setCountReply] = useState<number>(commentCount);
  const [countLike, setCountLike] = useState<number>(likeCount);
  const [reply, setReply] = useState<string>("");

  const { handleError } = useError();
  const { userInfo } = useUserContext();
  const snackbar = useSnackbar();

  const fetchThreadDetail = async () => {
    try {
      setLoadingDetail(true);
      const { data } = await getCommunityThreadById(id);
      if (data.data) {
        setThreadDetail(data.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleReply = async () => {
    if (!reply) {
      snackbar.error("Masukkan balasan Anda");
      return;
    }
    try {
      setIsReplying(true);
      await replyToThreadCommunity({ replyToId: id, content: reply });
      snackbar.success("Balasan terkirim");
      setCountReply(countReply + 1);
      setReply("");
      fetchThreadDetail();
    } catch (error) {
      handleError(error);
    } finally {
      setIsReplying(false);
    }
  };

  const handleLike = async () => {
    try {
      await likeThreadCommunity(id);
      snackbar.success(`Berhasil di${isLiked ? "un" : ""}like`);
      setCountLike(!isLiked ? countLike + 1 : countLike - 1);
      setIsLiked(!isLiked);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div
      className={classNames(
        "py-2 xl:px-8 flex gap-x-4 lg:gap-x-2",
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
          <h4 className="font-semibold">{userName}</h4>
          <span className="text-gray-400">
            • {dayjs(createdAt).toNow(true)}
          </span>
        </div>
        <div className="mb-2">{content}</div>
        <div className="flex gap-x-6">
          <button
            className="flex gap-x-1 items-center"
            onClick={() => {
              if (!isExpanded) {
                setIsExpanded(true);
                fetchThreadDetail();
              } else {
                setIsExpanded(false);
              }
            }}
          >
            <ChatIcon className="w-5 h-5" />
            {countReply}
          </button>
          <button className="flex gap-x-1 items-center" onClick={handleLike}>
            {isLiked ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}{" "}
            {countLike}
          </button>
        </div>
        <div
          className={classNames(
            "mt-2 transition-all duration-500 overflow-hidden",
            {
              "max-h-0 opacity-0": !isExpanded,
              "max-h-[1000px] opacity-1": isExpanded,
            }
          )}
        >
          <h2 className="mb-2">Kirim Balasan</h2>
          <div className="flex gap-x-2">
            <div className="flex-shrink-0">
              <img
                src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">{userInfo.name}</h3>
              <TextArea
                placeholder="Ketik untuk membalas postingan"
                className="mb-2"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <div className="flex gap-x-2">
                <Button
                  appearance="default"
                  shape="rounded"
                  onClick={() => {
                    setIsExpanded(false);
                    setReply("");
                  }}
                  disabled={isReplying}
                >
                  Batal
                </Button>
                <Button
                  shape="rounded"
                  onClick={handleReply}
                  disabled={isReplying}
                >
                  Kirim
                </Button>
              </div>
              {loadingDetail ? (
                <div className="py-8 flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                <div className="space-y-2 mt-4">
                  {threadDetail.repliedBy &&
                    (threadDetail.repliedBy.length === 0 ? (
                      <p className="text-center">Belum Ada Balasan</p>
                    ) : (
                      threadDetail.repliedBy.map((threadReply) => (
                        <div className="flex gap-x-2">
                          <div className="flex-shrink-0">
                            <img
                              src="https://evflxrgbnrjjfuhiafhk.supabase.co/storage/v1/object/public/images/shawn_mendes-rev1.jpg"
                              alt="avatar"
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                          <div>
                            <h3>{threadReply.author?.username}</h3>
                            <p className="text-sm py-1">
                              {threadReply.content}
                            </p>
                          </div>
                        </div>
                      ))
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
