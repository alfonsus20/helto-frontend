import React, { useEffect, useState } from "react";
import qs from 'query-string'
import { SearchIcon } from "@heroicons/react/outline";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Input from "../../components/Input";
import VideoModal from "../../components/VIdeoModal";
import { useModalContext } from "../../context/ModalContext";
import { useLocation, useNavigate } from "react-router-dom";
import useSnackbar from "../../hooks/useSnackbar";
import { Media } from "../../types/entities/media";
import { getEmbedYoutubeURL } from "../../utils/helper";
import { AxiosError } from "axios";
import { getMediaList } from "../../models/media";
import useEffectOnce from "../../hooks/useEffectOnce";

const VideoList = () => {
  const [videoList, setVideoList] = useState<Media[]>([]);
  const [isFetchingVideo, setIsFetchingVideo] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { openModal } = useModalContext();
  const { search, pathname } = useLocation();

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
      const { data } = await getMediaList(`?${qs.stringify({ ...urlParams, offset: 0, limit: 10 })}`);
      if (data.data) {
        setVideoList(data.data.media);
      }
    } catch (error) {
      snackbar.error((error as AxiosError).response?.data.message);
    } finally {
      setIsFetchingVideo(false);
    }
  };

  const handleSearch = (evt: React.FormEvent) => {
    evt.preventDefault();
    navigate(`${pathname}?${qs.stringify({ keyword })}`);
  }


  useEffectOnce(() => {
    const keywordFromURL = qs.parse(search)['keyword']?.toString();
    if (keywordFromURL) {
      setKeyword(keywordFromURL);
    }
  })

  useEffect(() => {
    fetchVideoList();
  }, [search]);

  return (
    <div className="py-28 max-w-7xl mx-auto w-full px-8">
      <Header
        brownText="Media"
        blackText=""
        textAlign="left"
        className="mb-4"
      />
      <form onSubmit={handleSearch}>
        <Input
          placeholder="Cari Video Terbaru Hari Ini"
          icon={<SearchIcon className="w-5 h-5" />}
          className="mb-6"
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
        />
      </form>
      <div className="mt-4 grid grid-cols-12 gap-5">
        {videoList.map((video) => (
          <Card
            description={video.description}
            url={getEmbedYoutubeURL(video.link)}
            key={video.id}
            media="video"
            onViewDetail={() => handleViewVideoDetail(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
