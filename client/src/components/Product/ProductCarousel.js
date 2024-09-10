import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Box } from "@mui/material";

const ProductCarousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ padding: 1, width: "100%", height: "100%" }}>
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
        className="mySwiper2 grid-xs:h-[300px] grid-md:h-[80%]"
      >
        {images.slice(0, 4).map((image) => (
          <SwiperSlide className="rounded-md border border-gray-400" key={image.id}>
            <img className="object-contain px-8" src={image.imageSrc} alt={`Nature ${image.id}`} />
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
        className="mySwiper grid-xs:h-[100px] grid-md:h-[80%]"
      >
        {images.slice(0, 4).map((image) => (
          <SwiperSlide className="rounded-md border border-gray-400" key={image.id}>
            <img className="object-contain px-2" src={image.imageSrc} alt={`Nature ${image.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductCarousel;
