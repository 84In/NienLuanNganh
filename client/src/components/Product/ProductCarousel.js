import React, { memo, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Box } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductCarousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ padding: 1, width: "100%", height: "100%", minHeight: "420px" }}>
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
        className="mySwiper2 flex items-center justify-center rounded-md border border-gray-400 grid-xs:h-[300px] grid-md:h-[80%] grid-md:max-h-full grid-md:min-h-[330px]"
      >
        {images.slice(0, 4).map((image) => (
          <SwiperSlide className="h-full" key={image.id}>
            <img className="h-full object-contain px-8" src={image.imageSrc} alt={`Nature ${image.id}`} />
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
        className="mySwiper grid-xs:h-[100px] grid-md:h-[100%] grid-md:max-h-full grid-md:min-h-[120px]"
      >
        {images.slice(0, 4).map((image) => (
          <SwiperSlide className="h-full rounded-md border border-gray-400" key={image.id}>
            <img className="h-full min-h-[78px] object-contain px-2" src={image.imageSrc} alt={`Nature ${image.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default memo(ProductCarousel);
