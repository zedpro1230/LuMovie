import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Footer from "../components/Footer";

function TvShowPage() {
  const location = useLocation();
  const type = location.state;
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          `https://phimapi.com/v1/api/danh-sach/${type.type}?page=${page}&sort_field=_id&sort_type=asc&sort_lang=&category=&country=&year=&limit=20`
        );
        setSeries(response.data.data);
        setTotalPage(response.data.data.params.pagination.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSeries();
  }, [page]);

  return (
    <div className="w-[95%] ml-auto mr-auto flex items-center justify-center flex-col gap-5 font-manrope">
      <NavBar />
      <div className="mt-[150px] ">
        <h1
          className="text-[40px] font-bold"
          style={{
            backgroundImage: "linear-gradient(to right, #E52020, #EB5B00)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tổng Hợp Tv Show
        </h1>
      </div>
      {series !== null && (
        <ul
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5 mt-[50px]
        "
        >
          {series.items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                navigate(`/movie/${item.slug}`, { state: { slug: item.slug } });
              }}
              className="scrollable-element w-full h-[500px] relative overflow-hidden flex flex-col
                items-center justify-end gap-2 rounded-[8px]"
            >
              <img
                src={`https://phimimg.com/${item.poster_url}`}
                alt={item.name}
                lazy="loading"
                className="w-full h-full object-cover rounded-[8px] hover:scale-125 transition-transform duration-500
                    cursor-pointer absolute top-0 left-0 right-0 bottom-0 "
              />
              <div
                className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  from-[#EB5B00] to-[#FFB200] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[5%] left-0
                  shadow-2xl shadow-[black]"
              >
                <p className="text-[white] font-semibold text-full">
                  {item.lang}
                </p>
                <p className="text-[white] font-semibold text-full">
                  {item.episode_current}
                </p>
              </div>
              <div
                className="flex items-center justify-between p-2 bg-gradient-to-l gap-[10px]
                  to-[#E52020] from-[#D2665A] rounded-tr-[8px] rounded-br-[8px] w-fit absolute top-[20%] left-0
                  shadow-[2px] shadow-[black]"
              >
                <p className="text-[white] font-semibold text-full">
                  {item.year}
                </p>
                <p className="text-[white] font-semibold text-full">
                  {item.quality}
                </p>
              </div>
              <div className="w-full bg-[black]/50 flex flex-col items-center justify-center h-fit relative z-[10] p-5">
                <h2
                  className="w-[70%] overflow-hidden text-center text-[#FFB200] text-ellipsis whitespace-nowrap
                    text-[25px] font-bold"
                >
                  {item.name}
                </h2>
                <p className="text-full text-[white] text-ellipsis whitespace-nowrap">
                  {item.origin_name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination
        count={totalPage}
        variant="outlined"
        page={page}
        onChange={(event, value) => {
          setPage(value);
        }}
        showFirstButton
        showLastButton
        shape="rounded"
        size="large"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "gray",
            backgroundColor: "white", // Color of all items
          },
          "& .Mui-selected": {
            color: "purple", // Color of the selected item
            backgroundColor: "#EB5B00", // background color of selected item
          },
        }}
      />
      <Footer />
    </div>
  );
}

export default TvShowPage;
