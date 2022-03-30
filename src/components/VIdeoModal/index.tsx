import React from "react";

type VideoModalProps = {
  videoURL: string;
  title: string;
  content: string;
};

const VideoModal = ({ videoURL, title, content }: VideoModalProps) => {
  return (
    <div>
      <h4 className="mb-2 font-bold text-lg">{title}</h4>
      <iframe
        className="w-full h-80"
        title="video"
        src={videoURL}
      ></iframe>
      <div className="mt-2 text-[1.075rem]">{content}</div>
    </div>
  );
};

export default VideoModal;
