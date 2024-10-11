import React, { memo, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductCarousel = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const newImages = product?.images ? JSON.parse(product.images.replace(/'/g, '"')) : [];
    setImages(newImages);
  }, [product]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        gap: 1,
        width: "100%",
        height: "100%",
        minHeight: "420px",
      }}
    >
      {images && images?.length > 0 && (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "var(--primary-color)",
              "--swiper-navigation-size": "30px",
              "--swiper-pagination-color": "var(--primary-color)",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 flex items-center rounded-md border border-black grid-xs:h-[300px] grid-md:h-[80%] grid-md:max-h-full grid-md:min-h-[330px]"
          >
            {images.map((image, index) => (
              <SwiperSlide className="h-full" key={index}>
                <img
                  className="h-full max-h-[400px] object-contain px-8"
                  src={image.startsWith("https://") ? image : process.env.REACT_APP_SERVER_URL + image}
                  alt={`Ảnh ${product?.name}  ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper grid-xs:h-[100px] grid-md:max-h-full grid-md:min-h-[120px]"
          >
            {images.map((image, index) => (
              <SwiperSlide className="h-ful rounded-md border border-black" key={index}>
                <img
                  className="h-full max-h-[100px] object-contain px-2"
                  src={image.startsWith("https://") ? image : process.env.REACT_APP_SERVER_URL + image}
                  alt={`Ảnh ${product?.name}  ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Box>
  );
};

export default memo(ProductCarousel);
