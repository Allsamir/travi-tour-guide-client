import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import { Pagination, Autoplay } from "swiper/modules";
const Slider: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="w-full h-full  bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://roam.qodeinteractive.com/wp-content/uploads/2017/08/h4-masonry-gallery-img-1.jpg')",
            }}
          >
            <div
              className="content absolute top-1/2 left-1/2 text-center w-full"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <h5 className="text-secondaryColor uppercase font-bold text-base font-serif mb-4 tracking-widest md:tracking-[10px]">
                Explore The World
              </h5>
              <h2 className="leading-[70px] lg:text-6xl text-3xl uppercase text-primaryColor font-bold font-serif">
                A More rewarding <br /> way to travel
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destitnation-title-img-1.jpg')",
            }}
          >
            <div
              className="content absolute top-1/2 left-1/2 text-center w-full"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <h5 className="text-secondaryColor uppercase font-bold text-base font-serif mb-4 tracking-widest md:tracking-[10px]">
                Be an adventure
              </h5>
              <h2 className="leading-[70px] lg:text-6xl text-3xl uppercase text-primaryColor font-bold font-serif">
                Collectiong Memories <br /> Everytime
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destitnation-title-img-5.jpg')",
            }}
          >
            <div
              className="content absolute top-1/2 left-1/2 text-center w-full"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <h5 className="text-secondaryColor uppercase font-bold text-base font-serif mb-4 tracking-widest md:tracking-[10px]">
                find our passion
              </h5>
              <h2 className="leading-[70px] lg:text-6xl text-3xl uppercase text-primaryColor font-bold font-serif">
                Escape life for <br /> A little white
              </h2>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://roam.qodeinteractive.com/wp-content/uploads/2017/08/destitnation-title-img-1.jpg')",
            }}
          >
            <div
              className="content absolute top-1/2 left-1/2 text-center w-full"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <h5
                className="text-secondaryColor uppercase font-bold text-base font-serif mb-4 tracking-widest md:tracking-[10px]"
                style={{ letterSpacing: "10px" }}
              >
                Commit To Travel
              </h5>
              <h2 className="leading-[70px] lg:text-6xl text-3xl uppercase text-primaryColor font-bold font-serif">
                The real adventure <br /> is out there
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
