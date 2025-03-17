import React from "react";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";
function MovieDetail() {
  const location = useLocation(); // Get the location object
  const keyWord = location.state; // Access the state
  const [movieDetail, setMovieDetail] = useState(null);
  const [episode_current, setEpisode_current] = useState(null);
  const [series, setSeries] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const getSlug = keyWord.slug;
        const response = await axios.get(`https://phimapi.com/phim/${getSlug}`);
        setMovieDetail(response.data);
        setEpisode_current(response.data.episodes[0].server_data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetail();
  }, [keyWord]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          `https://phimapi.com/v1/api/the-loai/${movieDetail.movie.category[0].slug}?page=1&sort_field=_id&sort_type=asc&sort_lang=&country=&year=2024&limit=10`
        );
        setSeries(response.data.data.items.slice(1, 10));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeries();
  }, [movieDetail]);
  console.log(series);
  const handleNavigate = (slug) => {
    navigate(`/movie/${slug}`, { state: { slug: slug } });
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-[95%] ml-auto mr-auto flex items-center justify-center flex-col gap-5 font-manrope">
      <NavBar />

      {movieDetail !== null && (
        <div className="flex items-start justify-center w-full mt-[120px] h-[600px] max-desktop:flex-col">
          <iframe
            src={episode_current.link_embed}
            className="w-full h-full flex-10/12 max-desktop:flex-1"
            title="123"
            allowFullScreen
          ></iframe>

          <ul
            className="h-fit flex flex-wrap gap-2 flex-2/12 justify-start items-start max-h-full
          overflow-y-scroll bg-black/20 py-4 px-2 max-desktop:flex-1 
          max-desktop:overflow-y-hidden max-desktop:h-auto max-desktop:justify-start max-desktop:items-start
          max-desktop:gap-2 "
          >
            {movieDetail.episodes[0].server_data.map((episode, index) => (
              <li
                key={index}
                className=" bg-black/50 flex items-center justify-center py-2 px-4 rounded-[8px] 
                max-w-fit min-w-[130px] h-[50px] hover:bg-[#E52020]/50 cursor-pointer"
                onClick={() => {
                  setEpisode_current(episode);
                }}
              >
                <p
                  className={` ${
                    episode_current.slug === episode.slug
                      ? "text-[#FFB200]"
                      : "text-white"
                  }`}
                >
                  {episode.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {movieDetail !== null && (
        <article
          className="w-full gap-5 flex flex-col  p-4 rounded-[8px] bg-gradient-to-r
        from-black/40 to-transparent"
        >
          <div className="flex items-start w-full gap-5 max-[550px]:flex-col-reverse">
            <img
              src={movieDetail.movie.poster_url}
              alt="..."
              className="w-[200px] h-[260px] object-cover rounded-[8px]"
            />
            <div>
              <h1 className="text-white text-[35px] w-fit font-bold">
                {movieDetail.movie.name}
              </h1>
              <h1 className="text-[#FFB200] text-[30px] w-fit font-bold">
                {movieDetail.movie.origin_name}
              </h1>
            </div>
          </div>
          <ul className="flex items-center justify-start gap-5 max-[550px]:flex-wrap">
            <li className="bg-white/10 text-white text-full px-2 py-1 rounded-[8px] cursor-pointer">
              {movieDetail.movie.country[0]?.name}
            </li>
            {movieDetail.movie.episode_current !== "" && (
              <li className="bg-white/10 text-white text-full px-2 py-1 rounded-[8px] cursor-pointer">
                {movieDetail.movie.episode_current}
              </li>
            )}

            <li className="bg-white/10 text-white text-full px-2 py-1 rounded-[8px] cursor-pointer">
              {movieDetail.movie.lang}
            </li>
            <li className="bg-white/10 text-white text-full px-2 py-1 rounded-[8px] cursor-pointer">
              {movieDetail.movie.year}
            </li>
          </ul>
          <ul className="flex items-center justify-start gap-5 max-[550px]:flex-wrap">
            {movieDetail.movie.category.map((category, index) => (
              <li
                key={index}
                className="bg-[#3C3D37] text-white text-full px-2 py-1 rounded-[8px] cursor-pointer"
              >
                <p className="text-[#FFB200]">{category.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="text-[grey] text-[25px]">
            Đạo diễn:{" "}
            <span className="text-white text-full">
              {movieDetail.movie.director}
            </span>
          </h1>
          <h1 className="text-[grey] text-[25px] w-full">
            Diễn viên :
            <ul className="flex items-center justify-start gap-2 flex-wrap w-[50%]">
              {movieDetail.movie.actor.map((actor, index) => (
                <li key={index} className="text-white text-full">
                  <p>{actor}, </p>
                </li>
              ))}
            </ul>
          </h1>
          <h1 className="text-[grey] text-[25px] w-full">
            Mô tả:{"  "}
            <p className="text-white text-full">{movieDetail.movie.content}</p>
          </h1>
          <h1
            className=" text-[35px] w-full font-bold"
            style={{
              backgroundImage: "linear-gradient(to right, #E52020, #EB5B00)",

              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Phim cùng thể loại
          </h1>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] w-full gap-4">
            {series !== null &&
              series.map((serie, index) => (
                <li className="w-full h-[500px]" key={index}>
                  <div
                    className="scrollable-element w-full h-full relative overflow-hidden flex flex-col
                items-center justify-end gap-2"
                    onClick={() => handleNavigate(serie.slug)}
                  >
                    <img
                      src={`https://phimimg.com/${serie.poster_url}`}
                      alt={serie.name}
                      className="w-full h-full object-cover rounded-[8px] hover:scale-125 transition-transform duration-500
                    cursor-pointer absolute top-0 left-0 right-0 bottom-0 "
                    />
                    <div
                      className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  from-[#EB5B00] to-[#FFB200] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[5%] left-0
                  shadow-2xl shadow-[black]"
                    >
                      <p className="text-[white] font-semibold text-full">
                        {serie.lang}
                      </p>
                      <p className="text-[white] font-semibold text-full">
                        {serie.episode_current}
                      </p>
                    </div>
                    <div
                      className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  to-[#E52020] from-[#D2665A] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[20%] left-0
                  shadow-[2px] shadow-[black]"
                    >
                      <p className="text-[white] font-semibold text-full">
                        {serie.year}
                      </p>
                      <p className="text-[white] font-semibold text-full">
                        {serie.quality}
                      </p>
                    </div>
                    <div className="w-full bg-[black]/50 flex flex-col items-center justify-center h-fit relative z-[10] p-5">
                      <h2
                        className="w-[70%] overflow-hidden text-center text-[#FFB200] text-ellipsis whitespace-nowrap
                    text-[25px] font-bold"
                      >
                        {serie.name}
                      </h2>
                      <p className="text-full text-[white]">
                        {serie.origin_name}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </article>
      )}
    </div>
  );
}

export default MovieDetail;
