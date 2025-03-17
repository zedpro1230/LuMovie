import React from "react";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router";
import "../index.css";
import axios from "axios";
function Movie() {
  const [tvShowData, setTvShowData] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [key, setKey] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await axios.get(
          ` https://phimapi.com/v1/api/danh-sach/phim_le?page=1&sort_field=_id&sort_type=asc&sort_lang=&category=&country=&year=&limit=10`
        );
        const limitData = response.data.data.items;
        console.log(limitData);
        setTvShowData(limitData);
        setKey("1");
      } catch (error) {
        console.log(error);
      }
    };
    fetchTvShows();
  }, []);
  const handleNavigate = (slug) => {
    navigate(`/movie/${slug}`, { state: { slug: slug } });
  };
  return (
    <section className="w-full flex items-start justify-center flex-col gap-5 font-manrope">
      <h1
        className="w-auto text-[40px] font-bold"
        style={{
          backgroundImage: "linear-gradient(to right, #E52020, #EB5B00)",

          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Phim Lẻ
      </h1>
      <div className="w-full h-[500px] relative ">
        <div
          className="w-[120px] h-full absolute top-0 bottom-0 left-0
                        bg-gradient-to-r from-[#3C3D37] to-transparent z-[10]"
        ></div>
        <div
          className="w-[120px] h-full absolute top-0 bottom-0 right-0
                        bg-gradient-to-l from-[#3C3D37] to-transparent z-[10]"
        ></div>
        <Swiper
          modules={[Navigation]}
          key={key}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          className="seriesSwiper w-full h-full"
          loop={true}
          spaceBetween={25}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            975: {
              slidesPerView: 3,
            },
            1420: {
              slidesPerView: 4,
            },
            1620: {
              slidesPerView: 5,
            },
          }}
        >
          {tvShowData !== undefined &&
            tvShowData.map((tvShow, index) => (
              <SwiperSlide className="tv_show_item" key={index}>
                <div
                  className="scrollable-element w-full h-full relative overflow-hidden flex flex-col
                items-center justify-end gap-2"
                  onClick={() => handleNavigate(tvShow.slug)}
                >
                  <img
                    src={`https://phimimg.com/${tvShow.poster_url}`}
                    alt={tvShow.name}
                    className="w-full h-full object-cover rounded-[8px] hover:scale-125 transition-transform duration-500
                    cursor-pointer absolute top-0 left-0 right-0 bottom-0 "
                  />
                  <div
                    className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  from-[#EB5B00] to-[#FFB200] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[5%] left-0
                  shadow-2xl shadow-[black]"
                  >
                    <p className="text-[white] font-semibold text-full">
                      {tvShow.lang}
                    </p>
                    <p className="text-[white] font-semibold text-full">
                      {tvShow.episode_current}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  to-[#E52020] from-[#D2665A] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[20%] left-0
                  shadow-[2px] shadow-[black]"
                  >
                    <p className="text-[white] font-semibold text-full">
                      {tvShow.year}
                    </p>
                    <p className="text-[white] font-semibold text-full">
                      {tvShow.quality}
                    </p>
                  </div>
                  <div className="w-full bg-[black]/50 flex flex-col items-center justify-center h-fit relative z-[10] p-5">
                    <h2
                      className="w-[70%] overflow-hidden text-center text-[#FFB200] text-ellipsis whitespace-nowrap
                    text-[25px] font-bold"
                    >
                      {tvShow.name}
                    </h2>
                    <p className="text-full text-[white]">
                      {tvShow.origin_name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="swiper-button-prev" ref={navigationPrevRef}></div>
        <div className="swiper-button-next" ref={navigationNextRef}></div>
      </div>
    </section>
  );
}

export default Movie;
