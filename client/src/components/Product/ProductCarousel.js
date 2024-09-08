import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { Box } from "@mui/material";
import product1 from "../../assets/images/product/product1.png";

const ProductCarousel = () => {
  const images = [
    { id: 1, imageSrc: product1 },
    { id: 2, imageSrc: "https://swiperjs.com/demos/images/nature-2.jpg" },
    // ... add more images as needed
  ];

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box sx={{ padding: 1, minHeight: "368px", maxHeight: "fit-content" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "var(--primary-color)",
          "--swiper-navigation-size": "20px",
          "--swiper-pagination-color": "var(--primary-color)",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide className="rounded-md border border-gray-400" key={image.id}>
            <img className="px-8" src={image.imageSrc} alt={`Nature ${image.id}`} />
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
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide className="rounded-md border border-gray-400" key={image.id}>
            <img className="object-contain px-2" src={image.imageSrc} alt={`Nature ${image.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductCarousel;
