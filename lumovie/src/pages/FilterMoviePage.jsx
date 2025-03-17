import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { menu } from "../utils";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function FilterMoviePage() {
  const navigate = useNavigate();
  const movieTypeList = [
    { name: "Phim bộ", slug: "phim-bo" },
    { name: "Phim lẻ", slug: "phim-le" },
    { name: "Tv shows", slug: "tv-shows" },
    { name: "Hoạt hình", slug: "hoat-hinh" },
    { name: "Phim Vietsub", slug: "phim-vietsub" },
    { name: "Phim Thuyết Minh", slug: "phim-thuyet-minh" },
    { name: "Phim Lồng Tiếng", slug: "phim-long-tieng" },
  ];
  const genreList = [
    {
      name: "Hành Động",
      slug: "hanh-dong",
      title: "genre",
    },
    {
      name: "Miền Tây",
      slug: "mien-tay",
      title: "genre",
    },
    {
      name: "Trẻ Em",
      slug: "tre-em",
      title: "genre",
    },
    {
      name: "Lịch Sử",
      slug: "lich-su",
      title: "genre",
    },
    {
      name: "Cổ Trang",
      slug: "co-trang",
      title: "genre",
    },
    {
      name: "Chiến Tranh",
      slug: "chien-tranh",
      title: "genre",
    },
    {
      name: "Viễn Tưởng",
      slug: "vien-tuong",
      title: "genre",
    },
    {
      name: "Kinh Dị",
      slug: "kinh-di",
      title: "genre",
    },
    {
      name: "Tài Liệu",
      slug: "tai-lieu",
      title: "genre",
    },
    {
      name: "Bí Ẩn",
      slug: "bi-an",
      title: "genre",
    },
    {
      name: "Phim 18+",
      slug: "phim-18",
      title: "genre",
    },
    {
      name: "Tình Cảm",
      slug: "tinh-cam",
      title: "genre",
    },
    {
      name: "Tâm Lý",
      slug: "tam-ly",
      title: "genre",
    },
    {
      name: "Thể Thao",
      slug: "the-thao",
      title: "genre",
    },
    {
      name: "Phiêu Lưu",
      slug: "phieu-luu",
      title: "genre",
    },
    {
      name: "Âm Nhạc",
      slug: "am-nhac",
      title: "genre",
    },
    {
      name: "Gia Đình",
      slug: "gia-dinh",
      title: "genre",
    },
    {
      name: "Học Đường",
      slug: "hoc-duong",
      title: "genre",
    },
    {
      name: "Hài Hước",
      slug: "hai-huoc",
      title: "genre",
    },
    {
      name: "Hình Sự",
      slug: "hinh-su",
      title: "genre",
    },
    {
      name: "Võ Thuật",
      slug: "vo-thuat",
      title: "genre",
    },
    {
      name: "Khoa Học",
      slug: "khoa-hoc",
      title: "genre",
    },
    {
      name: "Thần Thoại",
      slug: "than-thoai",
      title: "genre",
    },
    {
      name: "Chính Kịch",
      slug: "chinh-kich",
      title: "genre",
    },
    {
      name: "Kinh Điển",
      slug: "kinh-dien",
      title: "genre",
    },
  ];
  const countryList = [
    {
      name: "Việt Nam",
      slug: "viet-nam",
      title: "country",
    },
    {
      name: "Trung Quốc",
      slug: "trung-quoc",
      title: "country",
    },
    {
      name: "Hà Lan",
      slug: "ha-lan",
      title: "country",
    },
    {
      name: "Mexico",
      slug: "mexico",
      title: "country",
    },
    {
      name: "Thụy Điển",
      slug: "thuy-dien",
      title: "country",
    },
    {
      name: "Philippines",
      slug: "philippines",
      title: "country",
    },
    {
      name: "Đan Mạch",
      slug: "dan-mach",
      title: "country",
    },
    {
      name: "Thụy Sĩ",
      slug: "thuy-si",
      title: "country",
    },
    {
      name: "Ukraina",
      slug: "ukraina",
      title: "country",
    },
    {
      name: "Hàn Quốc",
      slug: "han-quoc",
      title: "country",
    },
    {
      name: "Âu Mỹ",
      slug: "au-my",
      title: "country",
    },
    {
      name: "Ấn Độ",
      slug: "an-do",
      title: "country",
    },
    {
      name: "Canada",
      slug: "canada",
      title: "country",
    },
    {
      name: "Tây Ban Nha",
      slug: "tay-ban-nha",
      title: "country",
    },
    {
      name: "Indonesia",
      slug: "indonesia",
      title: "country",
    },
    {
      name: "Ba Lan",
      slug: "ba-lan",
      title: "country",
    },
    {
      name: "Malaysia",
      slug: "malaysia",
      title: "country",
    },
    {
      name: "Bồ Đào Nha",
      slug: "bo-dao-nha",
      title: "country",
    },
    {
      name: "UAE",
      slug: "uae",
      title: "country",
    },
    {
      name: "Châu Phi",
      slug: "chau-phi",
      title: "country",
    },
    {
      name: "Ả Rập Xê Út",
      slug: "a-rap-xe-ut",
      title: "country",
    },
    {
      name: "Nhật Bản",
      slug: "nhat-ban",
      title: "country",
    },
    {
      name: "Đài Loan",
      slug: "dai-loan",
      title: "country",
    },
    {
      name: "Anh",
      slug: "anh",
      title: "country",
    },
    {
      name: "Quốc Gia Khác",
      slug: "quoc-gia-khac",
      title: "country",
    },
    {
      name: "Thổ Nhĩ Kỳ",
      slug: "tho-nhi-ky",
      title: "country",
    },
    {
      name: "Nga",
      slug: "nga",
      title: "country",
    },
    {
      name: "Úc",
      slug: "uc",
      title: "country",
    },
    {
      name: "Brazil",
      slug: "brazil",
      title: "country",
    },
    {
      name: "Ý",
      slug: "y",
      title: "country",
    },
    {
      name: "Na Uy",
      slug: "na-uy",
      title: "country",
    },
  ];
  const yearList = [
    {
      name: "2025",
      slug: "2025",
      title: "year",
    },
    {
      name: "2024",
      slug: "2024",
      title: "year",
    },
    {
      name: "2023",
      slug: "2023",
      title: "year",
    },
    {
      name: "2022",
      slug: "2022",
      title: "year",
    },
    {
      name: "2021",
      slug: "2021",
      title: "year",
    },
    {
      name: "2020",
      slug: "2020",
      title: "year",
    },
    {
      name: "2019",
      slug: "2019",
      title: "year",
    },
    {
      name: "2018",
      slug: "2018",
      title: "year",
    },
    {
      name: "2017",
      slug: "2017",
      title: "year",
    },
    {
      name: "2016",
      slug: "2016",
      title: "year",
    },
    {
      name: "2015",
      slug: "2015",
      title: "year",
    },
    {
      name: "2014",
      slug: "2014",
      title: "year",
    },
    {
      name: "2013",
      slug: "2013",
      title: "year",
    },
    {
      name: "2012",
      slug: "2012",
      title: "year",
    },
    {
      name: "2011",
      slug: "2011",
      title: "year",
    },
    {
      name: "2010",
      slug: "2010",
      title: "year",
    },
    {
      name: "2009",
      slug: "2009",
      title: "year",
    },
    {
      name: "2008",
      slug: "2008",
      title: "year",
    },
    {
      name: "2007",
      slug: "2007",
      title: "year",
    },
    {
      name: "2006",
      slug: "2006",
      title: "year",
    },
    {
      name: "2005",
      slug: "2005",
      title: "year",
    },
    {
      name: "2004",
      slug: "2004",
      title: "year",
    },
    {
      name: "2003",
      slug: "2003",
      title: "year",
    },
    {
      name: "2002",
      slug: "2002",
      title: "year",
    },
    {
      name: "2001",
      slug: "2001",
      title: "year",
    },
    {
      name: "2000",
      slug: "2000",
      title: "year",
    },
  ];
  const [typeList, setTypeList] = useState(movieTypeList[0].slug);
  const [genre, setGenre] = useState(genreList[0].slug);
  const [country, setCountry] = useState(countryList[0].slug);
  const [year, setYear] = useState(yearList[0].slug);
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState(null);
  const handleChangeType = (event) => {
    setTypeList(event.target.value);
  };
  const handleChangeGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
  const handleFetchData = async () => {
    console.log(typeList, genre, country, year);
    try {
      const response = await axios.get(
        `https://phimapi.com/v1/api/danh-sach/${typeList}?page=${page}&sort_field=_id&sort_type=asc&sort_lang=&category=${genre}&country=${country}&year=${year}&limit=14`
      );

      setMovieData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movieData);
  return (
    <div className="w-[95%]  ml-auto mr-auto flex items-center justify-center font-manrope">
      <NavBar />
      <div className="mt-[150px] flex items-center justify-center gap-5 w-full flex-col">
        <h1
          className="w-auto text-[40px] font-bold"
          style={{
            backgroundImage: "linear-gradient(to right, #E52020, #EB5B00)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Bộ Lọc Phim
        </h1>
        <ul className="w-full flex items-center justify-center gap-2 h-[60px]">
          <li className="flex-1 h-full">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeList}
              label="Age"
              defaultValue={typeList}
              onChange={handleChangeType}
              sx={{
                backgroundColor: "#1E1E1E",
                color: "white",
                width: "100%",
                height: "100%",
              }}
            >
              {movieTypeList.map((type, index) => (
                <MenuItem key={index} value={type.slug}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </li>
          <li className="flex-1 h-full">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              label="Age"
              defaultValue={genre}
              onChange={handleChangeGenre}
              sx={{
                backgroundColor: "#1E1E1E",
                color: "white",
                width: "100%",
                height: "100%",
              }}
              MenuProps={{
                style: {
                  height: "500px",
                },
              }}
            >
              {genreList.map((type, index) => (
                <MenuItem key={index} value={type.slug}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </li>
          <li className="flex-1 h-full">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Age"
              defaultValue={country}
              onChange={handleChangeCountry}
              sx={{
                backgroundColor: "#1E1E1E",
                color: "white",
                width: "100%",
                height: "100%",
              }}
              MenuProps={{
                style: {
                  height: "500px",
                },
              }}
            >
              {countryList.map((type, index) => (
                <MenuItem key={index} value={type.slug}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </li>
          <li className="flex-1 h-full">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Age"
              defaultValue={year}
              onChange={handleChangeYear}
              sx={{
                backgroundColor: "#1E1E1E",
                color: "white",
                width: "100%",
                height: "100%",
              }}
              MenuProps={{
                style: {
                  height: "500px",
                },
              }}
            >
              {yearList.map((type, index) => (
                <MenuItem key={index} value={type.slug}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </li>
          <button
            className="flex flex-1 justify-center items-center p-2
           bg-black/50 text-white text-full rounded-[8px] cursor-pointer h-full font-bold
           hover:bg-white/30 hover:text-black transition-all ease-linear duration-200"
            onClick={() => handleFetchData()}
          >
            Tìm kiếm
          </button>
        </ul>
        {movieData !== null && (
          <ul className="w-full grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
            {movieData.items.length > 0 ? (
              movieData.items.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`/movie/${item.slug}`, {
                      state: { slug: item.slug },
                    });
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
                    <p className="text-full text-[white] text-ellipsis  w-[70%] whitespace-nowrap overflow-hidden text-center">
                      {item.origin_name}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <h1 className="text-white text-[30px] font-bold">
                Không Có Dữ Liệu...
              </h1>
            )}
          </ul>
        )}
        <Pagination
          count={
            movieData !== null ? movieData.params.pagination.totalPages : 0
          }
          variant="outlined"
          page={page}
          onChange={(event, value) => {
            setPage(value);
            handleFetchData();
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
      </div>
      <Footer />
    </div>
  );
}

export default FilterMoviePage;
