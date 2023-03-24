import { Box } from "@mui/material";
import React from "react";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./imageSlider.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IProductGetOnePhotos } from "../../../types/IProduct";
import { $imageApi } from "../../../api";
import { StyledContainedButton } from "../../styled-components/StyledButton";

interface Props {
  photos: IProductGetOnePhotos[];
}

const ImageSlider: React.FC<Props> = ({ photos }) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  return (
    <Box className={"wrapper"}>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        lazy={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        className={"mySwiper2"}
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#8a3ffc",
          "--swiper-navigation-color": "#8a3ffc",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {photos.map((photo) => (
          <SwiperSlide className={"swiperSlide"}>
            <img src={`${$imageApi}/${photo.image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={15}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={"mySwiper"}
        style={{ justifyContent: "center" }}
      >
        {photos.map((photo) => (
          <SwiperSlide
            className={"swiperSlide"}
            style={{ flexDirection: "column" }}
          >
            <img src={`${$imageApi}/${photo.image}`} />
            <StyledContainedButton
              onClick={(e) => {
                e.stopPropagation()
                photos.filter(one => one.image === photo.image)
              }}
              sx={{
                mt: "5px",
                fontSize: "10px",
                height: "20px",
                width: "64px",
              }}
            >
              Удалить
            </StyledContainedButton>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
