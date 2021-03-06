import { useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";

import Card from "../../components/Card";
import Header from "../../components/Header";
import VideoModal from "../../components/VideoModal";
import Search from "../../components/Search";
import { SkeletonCard } from "../../components/Skeleton";

import useError from "../../hooks/useError";
import { useModalContext } from "../../context/ModalContext";

import { getMediaList } from "../../models/media";

import { Media } from "../../types/entities/media";

import { getEmbedYoutubeURL } from "../../utils/helper";
import Pagination from "../../components/Pagination";

const VideoList = () => {
  const [videoList, setVideoList] = useState<Media[]>([]);
  const [isFetchingVideo, setIsFetchingVideo] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);

  const { openModal } = useModalContext();
  const { search } = useLocation();
  const { handleError } = useError();

  const handleViewVideoDetail = (videoId: number) => {
    const foundVideo = videoList.find((video) => video.id === videoId)!;
    const modalDOM = (
      <VideoModal
        content={foundVideo.description}
        videoURL={getEmbedYoutubeURL(foundVideo.link)}
      />
    );
    openModal(modalDOM, "2xl");
  };

  const fetchVideoList = async () => {
    try {
      setIsFetchingVideo(true);
      const urlParams = qs.parse(search);
      const { data } = await getMediaList(
        `?${qs.stringify({ offset: 0, limit: 8, ...urlParams })}`
      );
      if (data.data) {
        setVideoList(data.data.media);
        setTotalData(data.data.totalData);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetchingVideo(false);
    }
  };

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Media"
        blackText=""
        textAlign="left"
        className="mb-4"
      />
      <Search
        placeholder="Cari Media Terbaru Hari Ini"
        fetchFunc={fetchVideoList}
      />
      <div className="mt-4 grid grid-cols-12 gap-5 mb-6">
        {isFetchingVideo
          ? [...Array(8)].map((_, idx) => <SkeletonCard key={idx} />)
          : videoList.map((video) => (
              <Card
                description={video.description}
                url={getEmbedYoutubeURL(video.link)}
                key={video.id}
                media="video"
                onViewDetail={() => handleViewVideoDetail(video.id)}
              />
            ))}
      </div>
      <Pagination totalData={totalData} rowPerPage={8} />
    </div>
  );
};

export default VideoList;
