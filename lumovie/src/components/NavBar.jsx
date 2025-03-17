import React from "react";
import { menu } from "../utils";
import { MdArrowDropDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { FiAlignJustify } from "react-icons/fi";

import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import InputBar from "./InputBar";
function NavBar() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [indexId, setIndexId] = useState(null);
  const [onScroll, setOnScroll] = useState(false);
  const timeoutRef = useRef(null);
  // handle mobile menu
  const [mobileMenuID, setMobileMenuID] = useState("");
  const handleshow = (index) => {
    clearTimeout(timeoutRef.current);
    setIndexId(index);
    setShow(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIndexId(null);
      setShow(false);
    }, 300);
  };
  const handleSubmenuEnter = () => {
    // Cancel the timeout when mouse enters submenu
    clearTimeout(timeoutRef.current);
  };

  const handleSubmenuLeave = () => {
    // Close when leaving submenu
    setIndexId(null);
    setShow(false);
  };
  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setOnScroll(true);
      } else {
        setOnScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`   w-full  font-manrope py-[20px]
      text-full text-[white]  fixed top-0 z-9999 left-0 right-0  
      max-desktop:justify-between ease-in-out transition-all duration-300
      ${
        onScroll
          ? "bg-[#0A0B14] "
          : "bg-gradient-to-b from-black to-transparent"
      }`}
    >
      <div className="w-[95%] mx-auto flex items-center  justify-start gap-6 max-desktop:flex-col">
        <div className="flex items-center justify-between  max-desktop:self-start ">
          {mobileMenu === true ? (
            <IconContext.Provider
              value={{
                className: "fill-[white] mr-[8px] hidden max-desktop:block",
                size: "30px",
              }}
            >
              <div className="" onClick={() => handleMobileMenu()}>
                <IoMdClose />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                className: "fill-[white] mr-[8px] hidden max-desktop:block",
                size: "30px",
              }}
            >
              <div className="" onClick={() => handleMobileMenu()}>
                <FiAlignJustify />
              </div>
            </IconContext.Provider>
          )}

          <h1
            className=" text-[35px] font-bold cursor-pointer
        "
            style={{
              backgroundImage: "linear-gradient(to right, #E52020, #EB5B00)",

              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            LUMOVIE
          </h1>
        </div>
        {/* Search bar input */}

        <InputBar />
        {/* Link menu width > 1420px */}
        <p
          className="text-white text-full hover:text-[#FFD369] max-desktop:hidden cursor-pointer"
          onClick={() => {
            navigate("/filter");
          }}
        >
          Lọc Phim
        </p>
        <ul className="flex items-center justify-center gap-3.5  max-desktop:hidden">
          {menu.map((link, index) => (
            <li key={index} className="relative ">
              {link.slug === undefined ? (
                <div
                  className="relative"
                  onMouseEnter={() => handleshow(index)}
                  onMouseLeave={handleLeave}
                >
                  <div className="flex items-center justify-center gap-1 group">
                    <p className="text-white group-hover:text-[#FFD369]">
                      {link.name}
                    </p>
                    <IconContext.Provider
                      value={{
                        className:
                          " fill-[white] group-hover:fill-[#FFD369] group-hover:rotate-180 transition-all duration-300",
                        size: "30px",
                      }}
                    >
                      <MdArrowDropDown />
                    </IconContext.Provider>
                  </div>

                  {show && indexId === index && (
                    <div
                      className="absolute top-[75px] right-0 bg-black/50 w-[500px] grid 
                  grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-4 p-4 rounded-[4px] 
                  "
                      onMouseEnter={handleSubmenuEnter}
                      onMouseLeave={handleSubmenuLeave}
                    >
                      {link.subMenu.map((subLink, index) => (
                        <p
                          onClick={() => {
                            if (subLink.title === "genre") {
                              navigate("/genre", {
                                state: { type: subLink.slug },
                              });
                              window.location.reload();
                            }
                            if (subLink.title === "country") {
                              navigate("/country", {
                                state: { type: subLink.slug },
                              });
                              console.log(subLink.slug);
                              // window.location.reload();
                            }
                            if (subLink.title === "year") {
                              navigate("/year", {
                                state: { type: subLink.slug },
                              });
                              window.location.reload();
                            }
                          }}
                          key={index}
                          className="transition-colors duration-200 
                        p-1  flex items-center justify-center rounded-[4px]
                         text-[#FFD369] bg-[#3C3D37]
                        hover:text-[#3C3D37] hover:bg-[#FFD369] "
                        >
                          {subLink.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p
                  onClick={() => {
                    console.log(link.slug);
                    if (link.slug === "phim-bo") {
                      navigate("/series", { state: { type: link.slug } });
                    } else if (link.slug === "phim-le") {
                      navigate("/movie", { state: { type: link.slug } });
                    } else if (link.slug === "tv-shows") {
                      navigate("/tv-show", { state: { type: link.slug } });
                    }
                  }}
                  className="text-[white] hover:text-[#FFD369] px-4"
                >
                  {link.name}
                </p>
              )}
            </li>
          ))}
        </ul>

        {/* Link menu for width < 1420px */}
        <ul
          className={`flex items-start justify-start gap-4 flex-col fixed py-4
      top-[80px] left-0 bg-[#161a30] w-[95%] pl-[40px] h-fit transition-transform
      duration-300 ease-in-out  rounded-[8px]
        ${
          mobileMenu === true ? "translate-x-[2.6%] " : "translate-x-[-100%] "
        }`}
        >
          {menu.map((link, index) => (
            <li key={index} className="relative w-full">
              {link.slug === undefined ? (
                <div className="w-full">
                  <div
                    className="flex items-center justify-start gap-1 group "
                    onClick={() =>
                      setMobileMenuID(mobileMenuID === index ? null : index)
                    }
                  >
                    <p className="">{link.name}</p>
                    <IconContext.Provider
                      value={{
                        className: `{ fill-[white] ${
                          mobileMenuID === index ? "rotate-180" : ""
                        } transition-all duration-300}`,
                        size: "30px",
                      }}
                    >
                      <MdArrowDropDown />
                    </IconContext.Provider>
                  </div>
                  {mobileMenuID === index && (
                    <div
                      className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 
                  p-4 rounded-[4px]  h-[130px] overflow-y-scroll"
                    >
                      {link.subMenu.map((items, index) => (
                        <p
                          key={index}
                          className="text-[#FFD369] bg-[#3C3D37]
                        hover:text-[#3C3D37] hover:bg-[#FFD369] flex items-center justify-center rounded-[4px] p-1"
                        >
                          {items.name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a href={`/${link.slug}`} className="] ">
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* UI width < 1420px */}
    </nav>
  );
}

export default NavBar;
