import { useState } from "react";
import Slider from "react-slick";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

import Image1 from "../../../../images/carousel-item-1.png";
import Image2 from "../../../../images/carousel-item-2.png";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slider, setSlider] = useState<Slider>();

  const images = [Image1, Image2, Image1, Image2];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <></>,
    prevArrow: <></>,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider
        ref={(c) => {
          setSlider(c!);
        }}
        {...settings}
      >
        {images.map((image, idx) => (
          <div>
            <img
              src={image}
              alt="item"
              className={`mx-auto w-[90%] md:w-full transition duration-1000 ${
                activeSlide === idx ? "lg:scale-100" : "lg:scale-[0.6]"
              }`}
            />
          </div>
        ))}
      </Slider>
      <div className="hidden lg:flex gap-x-4 absolute right-40 top-10">
        <button
          className="p-2 flex border-brown-500 border-2 rounded-full"
          onClick={() => slider?.slickPrev()}
        >
          <ArrowLeftIcon className="w-5 h-5 text-brown-500" />
        </button>
        <button
          className="p-2 flex bg-brown-500 border-2 border-brown-500 rounded-full"
          onClick={() => slider?.slickNext()}
        >
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
