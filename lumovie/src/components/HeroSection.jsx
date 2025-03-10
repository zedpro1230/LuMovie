import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";
function HeroSection() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const fetchNewMovies = async () => {
      try {
        const response = await axios.get(
          "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1"
        );
        const litmitData = response.data.items.slice(0, 10);
        setMovieData(litmitData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewMovies();
  }, []);
  console.log(movieData);

  return (
    <section className="w-full  flex items-center justify-center flex-col mx-auto  font-manrope ">
      {movieData !== undefined && (
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          navigation={false}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-full h-screen relative max-desktop:h-[400px]"
        >
          {movieData.map((movie, index) => (
            <SwiperSlide key={index}>
              <div
                className={`w-full h-full flex flex-col mb-5 max-desktop:items-center max-desktop:justify-end
                 
                
         `}
                style={{
                  backgroundImage: `url(${movie?.thumb_url})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute bottom-[50px] left-[50px] w-[50%]
                max-desktop:flex max-desktop:flex-col max-desktop:static max-desktop:w-fit
                max-desktop:mb-[20px] max-desktop:items-center max-desktop:justify-center"
                >
                  <h1
                    className=" text-[#3D3D3D] font-bold text-[35px] max-w-[500px] min-w-[150px]
                     max-desktop:text-[25px] max-desktop:text-center
                  "
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #E52020, #EB5B00)",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {movie?.name}
                  </h1>
                  <div
                    className="  bg-black/30  p-5 rounded-lg flex flex-row max-w-[600px]
                    justify-start items-start gap-[20px]  max-desktop:flex-col
                    "
                  >
                    <img
                      src={movie.poster_url}
                      alt=""
                      className="w-[180px] h-[265px] rounded-[8px] object-fill max-desktop:hidden"
                    />

                    <div className="flex flex-col gap-[15px] justify-between h-full">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-row gap-[20px]">
                          <p
                            className="text-full text-white font-bold rounded-[8px] flex justify-center items-center px-2 py-1 bg-[#F5F5F5]/40
                          max-desktop:text-[14px] max-desktop:p-1"
                          >
                            {movie?.country[0].name}
                          </p>
                          <p
                            className="text-full text-white font-bold rounded-[8px] flex justify-center items-center px-2 py-1 bg-[#F5F5F5]/40
                          max-desktop:text-[14px] max-desktop:p-1"
                          >
                            {movie?.year}
                          </p>
                          <p
                            className="text-full text-white font-bold rounded-[8px] flex justify-center items-center px-2 py-1 bg-[#F5F5F5]/40
                          max-desktop:text-[14px] max-desktop:p-1"
                          >
                            {movie?.quality}
                          </p>
                        </div>

                        <p
                          className="text-full  font-bold rounded-[8px] w-fit p-2 bg-[#EB5B00]/50
              text-[#FFD369] border-[1px] border-[#FFD369] max-desktop:hidden"
                        >
                          {movie?.episode_current}
                        </p>
                        <p className="text-full text-white font-bold max-desktop:text-[14px]">
                          <IconContext.Provider
                            value={{
                              className:
                                "fill-[#FFB200] mr-[5px] max-desktop:size-[14px]",
                            }}
                          >
                            <FaClock className="inline-block" />
                          </IconContext.Provider>
                          {movie?.time}
                        </p>
                        <div className="flex flex-wrap gap-[20px] max-desktop:hidden">
                          {movie.category.map((category, index) => (
                            <p
                              className="text-full text-white font-bold rounded-[8px]  px-2 py-1 cursor-pointer
                              border-[1px] border-[#F5F5F5] hover:bg-black/50 
                            "
                              key={index}
                            >
                              {category.name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div
                        className="bg-gradient-to-r from-[#FFB200] to-[#EB5B00] w-[250px] h-[60px] rounded-[8px]
            cursor-pointer flex items-center justify-center transition-all duration-500 ease-in-out
            hover:bg-gradient-to-l hover:from-[#FFB200] hover:to-[#EB5B00] max-desktop:w-fit max-desktop:h-fit
            max-desktop:p-2"
                      >
                        <p className="font-bold text-full text-[white] max-desktop:text-[14px]">
                          Chi tiết phim
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

export default HeroSection;
