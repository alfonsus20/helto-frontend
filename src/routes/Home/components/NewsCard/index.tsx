import React from "react";

const NewsCard = () => {
  return (
    <div className="flex gap-4">
      <img
        src="https://tmqbylesuwxzdqaxmdlm.supabase.co/storage/v1/object/public/images/87d0bade-11bc-4235-a9ca-967faaf9177e.webp"
        alt="example"
        className="flex-shrink-0 w-44 h-32 rounded-md"
      />
      <div>
        <h5 className="font-bold text-brown-700 mb-2">Lorem ipsum?</h5>
        <p>
          Lorem Ipsum is not simply random text. It has roots in a piece of
          classical Latin literature from 45 BC, making it over 2000 years old.
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
