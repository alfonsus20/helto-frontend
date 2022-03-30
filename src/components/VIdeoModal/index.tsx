import React from "react";

type VideoModalProps = {
  videoURL: string;
  content: string;
};

const VideoModal = ({ videoURL, content }: VideoModalProps) => {
  return (
    <div className="mt-4">
      <iframe className="w-full h-80" title="video" src={videoURL}></iframe>
      <div className="mt-2 text-[1.075rem]">{content}</div>
    </div>
  );
};

export default VideoModal;
