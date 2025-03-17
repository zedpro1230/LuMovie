import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function InputBar() {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search !== "") {
          const resonse = await axios.get(
            `https://phimapi.com/v1/api/tim-kiem?keyword=${search}&page=1&sort_field=_id&sort_type=asc&sort_lang=&category=&country=&year=&limit=64`
          );
          console.log(resonse.data);
          setSearchMovie(resonse.data.data.items);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);
  console.log(searchMovie);
  const navigate = useNavigate();
  const handleNavigate = (slug) => {
    navigate(`/movie/${slug}`, { state: { slug: slug } });
    setSearch("");
  };
  return (
    <div className="relative w-[400px] max-desktop:w-[95%] max-desktop:mx-auto">
      <input
        type="text"
        placeholder="Nhập tên phim..."
        className="bg-white/10  w-full h-[60px] text-[white] rounded-[8px] outline-0 px-4 pl-5
            focus:ring-1 focus:ring-[white] focus:ring-opacity-50 "
        onChange={(e) => {
          handleInput(e);
        }}
      />
      {search !== "" && (
        <ul
          className="w-full flex flex-col gap-2 absolute top-[140%] left-0 h-[400px] overflow-y-scroll
        bg-black/90 rounded-[8px] p-2"
        >
          {searchMovie.map((movie, index) => (
            <li
              key={index}
              className="w-full flex items-start justify-start gap-1 h-fit hover:bg-white/30 p-2 rounded-[8px] cursor-pointer"
              onClick={() => handleNavigate(movie.slug)}
            >
              <img
                src={`https://phimimg.com/${movie.poster_url}`}
                alt={movie.name}
                className="w-[70px] h-[80px] object-cover rounded-[8px]"
              />
              <div className="w-full flex flex-col gap-1 max-desktop:w-full">
                <h1
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #E52020, #EB5B00)",

                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="font-bold text-[20px] w-200px max-desktop:w-full"
                >
                  {movie.name}
                </h1>
                <p className="text-[18px]  w-[200px] text-ellipsis whitespace-nowrap overflow-hidden max-desktop:w-full">
                  {movie.origin_name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default InputBar;
