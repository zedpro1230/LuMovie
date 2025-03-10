import React from "react";
import { menu, logo_img } from "../utils";
import { MdArrowDropDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { FiAlignJustify } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
function NavBar() {
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
      className={`flex items-center  justify-start   w-full gap-4 font-manrope 
      text-full text-[white] px-[40px] fixed top-0 z-50 left-0 right-0  
      max-desktop:justify-between ease-in-out transition-all duration-300
      ${onScroll ? "bg-[#0A0B14] " : "bg-transparent"}`}
      on
    >
      {/* UI width < 1420px */}
      <div
        className="flex items-center justify-center gap-4"
        onClick={() => handleMobileMenu()}
      >
        {mobileMenu === true ? (
          <IconContext.Provider
            value={{
              className: "fill-[white] hidden max-desktop:block",
              size: "30px",
            }}
          >
            <div className="">
              <IoMdClose />
            </div>
          </IconContext.Provider>
        ) : (
          <IconContext.Provider
            value={{
              className: "fill-[white] hidden max-desktop:block",
              size: "30px",
            }}
          >
            <div className="">
              <FiAlignJustify />
            </div>
          </IconContext.Provider>
        )}

        <img
          src={logo_img}
          alt="logo"
          className="w-[150px] h-[100px] object-cover cursor-pointer"
        />
      </div>
      {/* Search bar input */}
      <input
        type="text"
        placeholder="Nhập tên phim..."
        className="bg-white/10  w-[400px] h-[60px] text-[white] rounded-[8px] outline-0 px-4 pl-5
        focus:ring-1 focus:ring-[white] focus:ring-opacity-50 max-desktop:hidden"
      />
      {/* Link menu width > 1420px */}
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
                      <a
                        href={`/${subLink.slug}`}
                        key={index}
                        className="transition-colors duration-200 
                        p-1  flex items-center justify-center rounded-[4px]
                         text-[#FFD369] bg-[#3C3D37]
                        hover:text-[#3C3D37] hover:bg-[#FFD369] "
                      >
                        {subLink.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                href={`/${link.slug}`}
                className="text-[white] hover:text-[#FFD369] px-4"
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      {/* Search icon for width < 1420px */}
      <IconContext.Provider
        value={{
          className: "fill-[white] hidden max-desktop:block",
          size: "30px",
        }}
      >
        <div className="">
          <FaSearch />
        </div>
      </IconContext.Provider>
      {/* Link menu for width < 1420px */}
      <ul
        className={`flex items-start justify-start gap-4 flex-col fixed py-4
      top-[110px] left-0 bg-[#161a30] w-full pl-[40px] h-fit transition-transform
      duration-300 ease-in-out 
        ${mobileMenu === true ? "translate-x-0 " : "translate-x-[-100%] "}`}
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
    </nav>
  );
}

export default NavBar;
