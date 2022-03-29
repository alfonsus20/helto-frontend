import React from "react";
import Slider from "react-slick";
import { PROGRAMS } from "../../../../utils/constants";
import ProgramCard from "../ProgramCard";

const ProgramCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="mt-8 overflow-x-hidden">
      <Slider {...settings}>
        {PROGRAMS.map((program, idx) => (
          <ProgramCard {...program} key={idx} />
        ))}
      </Slider>
    </div>
  );
};

export default ProgramCarousel;
