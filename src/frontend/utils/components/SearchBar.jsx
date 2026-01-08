import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({ isShowBar, setShowBar }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Initialize with empty string
  const navigate = useNavigate();
  const refSearchBar = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refSearchBar.current && !refSearchBar.current.contains(event.target)) {
        setShowBar(false);
      }
    };
    if (isShowBar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShowBar, setShowBar]);

  const goToMovie = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/searchedItem/${searchTerm}/1/en-us`);
    setShowBar(false); // Close bar after search
  };

  return (
    <AnimatePresence>
      {isShowBar && (
        <motion.div
          ref={refSearchBar}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] mt-2 z-[101]"
        >
          <div className="bg-[#1D1F2B]/90 backdrop-blur-xl border border-white/10 p-2 rounded-xl shadow-2xl">
            <form
              onSubmit={goToMovie}
              className="flex items-center gap-3 px-3"
            >
              <CiSearch className="text-2xl text-[#EE2B47] flex-shrink-0" />
              <input
                autoFocus
                placeholder="Search movies and TV shows..."
                required
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                type="text"
                className="w-full py-2 bg-transparent text-white outline-none placeholder:text-slate-500 text-lg"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;