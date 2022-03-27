import React from "react";
import Slider from "react-slick";
import { PROGRAMS } from "../../../../utils/constants";
import ProgramCard from "../ProgramCard";

const ProgramCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="mt-8">
      <Slider {...settings}>
        {PROGRAMS.map((program) => (
          <ProgramCard {...program} />
        ))}
      </Slider>
    </div>
  );
};

export default ProgramCarousel;
