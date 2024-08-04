import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";

const Header = () => {
  const Menu = [
    { title: "Home", href: "/" },
    { title: "Movies", href: "/movies" },
    { title: "TV Shows", href: "/tvshows" },
    { title: "Top IMDB", href: "/topimbd" },
  ];
  return (
    <div className="h-[60px] top-0 bg-[#1D1F2B] bg-opacity-65 w-[100dvh] rounded-md items-center flex justify-between px-5">
      <div className="text-[20px] flex items-center tracking-[6px]">
        UPtoMovie{" "}
        <MdOutlineDoubleArrow className="rotate-180 text-[30px] text-[#EE2B47]" />
      </div>
      <div className="flex gap-10 justify-between ">
        {Menu.map((menu, index) => (
          <Link to={menu.href} key={index}>
            {menu.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
