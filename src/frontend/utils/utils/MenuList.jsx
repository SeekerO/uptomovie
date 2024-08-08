import React from "react";
import { Link } from "react-router-dom";
const MenuList = ({ theme }) => {
  const Menu = [
    { title: "Home", href: "/" },
    { title: "Movies", href: "/movies" },
    { title: "TV Shows", href: "/tvshows" },
    { title: "Top IMDB", href: "/topimbd" },
  ];
  return (
    <>
      {Menu.map((menu, index) => (
        <Link
          to={menu.href}
          key={index}
          className={`${theme === "sideButton" && "mt-5 text-center"}`}
        >
          {menu.title}
        </Link>
      ))}
    </>
  );
};

export default MenuList;
