import { React, memo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"; // Import icon từ react-icons
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { banner } from "../utils/constant";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        right: "10px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <FaArrowRight style={{ width: "10px", height: "10px", color: "blue" }} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        left: "10px",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <FaArrowLeft style={{ width: "10px", height: "10px", color: "blue" }} />
    </div>
  );
}
function SliderCustom() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3500,
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container h-auto w-full rounded-lg bg-white px-4 py-6">
      <Slider {...settings}>
        {banner.map((item, index) => (
          <div key={index} className="px-2">
            <img src={item.image} alt={item.title} className="h-auto w-full rounded-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default memo(SliderCustom);