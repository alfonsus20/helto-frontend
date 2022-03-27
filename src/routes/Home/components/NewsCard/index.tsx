import React from "react";

type NewsCardProps = {
  imageUrl: string;
  title: string;
  content: string;
};

const NewsCard = ({ imageUrl, title, content }: NewsCardProps) => {
  return (
    <div className="flex gap-4">
      <img
        src={imageUrl}
        alt="berita"
        className="flex-shrink-0 w-44 h-32 rounded-md"
      />
      <div>
        <h5 className="font-bold text-brown-700 mb-2">{title}</h5>
        <p className="line-clamp-3">{content}</p>
      </div>
    </div>
  );
};

export default NewsCard;
