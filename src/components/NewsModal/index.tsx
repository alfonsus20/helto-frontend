import React from "react";

type NewsModalProps = {
  imageURL: string;
  title: string;
  content: string;
};

const NewsModal = ({ imageURL, title, content }: NewsModalProps) => {
  return (
    <div>
      <h4 className="mb-2 font-bold text-lg">{title}</h4>
      <img src={imageURL} alt="berita" className="w-full rounded-md" />
      <div className="mt-2 text-[1.075rem]">{content}</div>
    </div>
  );
};

export default NewsModal;
