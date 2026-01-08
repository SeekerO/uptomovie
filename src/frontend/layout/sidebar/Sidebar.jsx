import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDoubleArrow, MdOutlineKeyboardArrowDown } from "react-icons/md";
import MenuList from "../../utils/utils/MenuList";

// Re-using the same GENRES array for consistency
const GENRES = [
  { name: "Action", movie: 28, tv: 10759 },
  { name: "Adventure", movie: 12, tv: 10759 },
  { name: "Animation", movie: 16, tv: 16 },
  { name: "Comedy", movie: 35, tv: 35 },
  { name: "Crime", movie: 80, tv: 80 },
  { name: "Documentary", movie: 99, tv: 99 },
  { name: "Drama", movie: 18, tv: 18 },
  { name: "Family", movie: 10751, tv: 10751 },
  { name: "Fantasy", movie: 14, tv: 10765 },
  { name: "History", movie: 36, tv: null },
  { name: "Horror", movie: 27, tv: null },
  { name: "Music", movie: 10402, tv: null },
  { name: "Mystery", movie: 9648, tv: 9648 },
  { name: "Romance", movie: 10749, tv: null },
  { name: "Sci-Fi", movie: 878, tv: 10765 },
  { name: "Thriller", movie: 53, tv: null },
  { name: "War", movie: 10752, tv: 10768 },
  { name: "Western", movie: 37, tv: 37 },
];

const Sidebar = ({ setShowSideBar, showSideBar }) => {
  const refSideBar = useRef();
  const location = useLocation();
  const [showGenreMobile, setShowGenreMobile] = useState(false);

  // Close sidebar and reset genre state when navigating
  useEffect(() => {
    setShowSideBar(false);
    setShowGenreMobile(false);
  }, [location, setShowSideBar]);

  const handleClickOutside = (event) => {
    if (refSideBar.current && !refSideBar.current.contains(event.target)) {
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    if (showSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSideBar]);

  return (
    <AnimatePresence>
      {showSideBar && (
        <div className="fixed z-[200] h-screen inset-0 flex justify-end">
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            ref={refSideBar}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-zinc-950 h-full w-[75%] sm:w-[60%] flex flex-col border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            {/* Header / Brand in Sidebar */}
            <div className="p-8 border-b border-white/5">
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-[2px] uppercase text-white">
                  UP<span className="text-red-500">TO</span>MOVIE
                </span>
                <MdOutlineDoubleArrow className="text-red-500 text-2xl" />
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Menu Navigation</p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col p-4">
              <div className="flex flex-col space-y-2 mb-4">
                <MenuList theme={"sideButton"} />
              </div>

              {/* Mobile Genre Accordion */}
              <div className="border-t border-white/5 pt-4">
                <button
                  onClick={() => setShowGenreMobile(!showGenreMobile)}
                  className="flex items-center justify-between w-full p-4 text-slate-300 hover:bg-white/5 rounded-xl transition-all"
                >
                  <span className="text-sm font-bold uppercase tracking-widest">Explore Genres</span>
                  <MdOutlineKeyboardArrowDown
                    size={20}
                    className={`transition-transform duration-300 ${showGenreMobile ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showGenreMobile && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-white/5 rounded-xl mt-2 mx-2"
                    >
                      <div className="grid grid-cols-1 p-2">
                        {GENRES.map((genre) => (
                          <Link
                            key={genre.name}
                            to={`/genre/${genre.name.toLowerCase()}`}
                            className="px-4 py-3 text-xs text-slate-400 hover:text-white border-b border-white/5 last:border-none"
                          >
                            {genre.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-auto p-8 text-[10px] text-slate-600 uppercase tracking-widest text-center">
              © 2026 UPTOMOVIE
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;