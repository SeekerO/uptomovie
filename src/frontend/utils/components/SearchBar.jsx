import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const SearchBar = ({ isShowBar, setShowBar }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [hide, setHide] = useState(false);
  const searchPoint = useNavigate();
  const refSearchBar = useRef();
  useEffect(() => {
    setHide(!hide);
  }, [isShowBar]);

  const goToMovie = (e) => {
    e.preventDefault();
    searchPoint("/searchedItem/" + searchTerm + "/" + 1 + "/" + "en-us");
  };

  const handleClickOutside = (event) => {
    if (refSearchBar.current && !refSearchBar.current.contains(event.target)) {
      setShowBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div
      ref={refSearchBar}
      initial={isShowBar && { height: 0 }}
      animate={
        isShowBar
          ? { height: "fit-content", padding: "0.25rem" }
          : { height: 0 }
      }
      className="flex bg-[#1D1F2B] backdrop-blur-[5px] bg-opacity-40 text-black md:w-[100dvh] w-[80%] mt-1 rounded-md items-center gap-1 overflow-hidden"
    >
      <motion.form
        onSubmit={goToMovie}
        initial={isShowBar && { opacity: 0 }}
        animate={isShowBar ? { opacity: 1 } : { opacity: 0 }}
        // transition={isShowBar ? { duration: 1, delay: 1.1 } : { duration: 0 }}
        className="w-full flex items-center justify-center gap-2"
      >
        <CiSearch hidden={hide} className="text-[25px] text-[#EE2B47]" />
        <div className="w-full">
          <motion.input
            placeholder="Search movie and tv shows here.."
            required
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="search"
            className="px-1 py-2 w-full outline-none border-[1px] border-slate-500 rounded-md bg-slate-300"
            hidden={hide}
          />
        </div>
      </motion.form>
    </motion.div>
  );
};

export default SearchBar;
