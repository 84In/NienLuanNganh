import { Box } from "@mui/material";
import { React, memo, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

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
      <IoIosArrowForward style={{ width: "20px", height: "20px", color: "blue" }} />
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
      <IoIosArrowBack style={{ width: "20px", height: "20px", color: "blue" }} />
    </div>
  );
}

function BannerCarousel({ data, slide }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3500,
    slidesToShow: slide && slide > 0 ? slide : 2,
    slidesToScroll: slide && slide > 0 ? slide : 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: slide && slide > 0 ? slide - 1 : 2,
          slidesToScroll: slide && slide > 0 ? slide - 1 : 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slide && slide > 2 ? slide - 2 : 1,
          slidesToScroll: slide && slide > 2 ? slide - 2 : 1,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const newImages = data?.images ? JSON.parse(data?.images.replace(/'/g, '"')) : [];
    setImages(newImages);
  }, [data]);

  console.log(images);

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 2,
        py: 3,
        bgcolor: "white",
        borderRadius: "10px",
        rowGap: "2rem",
        width: "100%",
        height: "fit-content",
      }}
    >
      {images && (
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} className="px-2">
              <img
                src={
                  item.startsWith("https://")
                    ? item
                    : (process.env.NODE_ENV === "production"
                        ? process.env.REACT_APP_SERVER_URL_PROD
                        : process.env.REACT_APP_SERVER_URL_DEV) + item
                }
                alt={item.title}
                className="h-auto w-full rounded-lg"
              />
            </div>
          ))}
        </Slider>
      )}
    </Box>
  );
}

export default memo(BannerCarousel);
