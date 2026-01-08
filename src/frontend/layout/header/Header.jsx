import { useState, useEffect, useRef } from "react";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import { MdOutlineDoubleArrow, MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchBar from "../../utils/components/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../sidebar/Sidebar";
import Hamburger from "hamburger-react";
import MenuList from "../../utils/utils/MenuList";
import { useLocation, Link } from "react-router-dom";

// Updated GENRES with unique keys if needed
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

const Header = () => {
  const [isShowBar, setShowBar] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const genreRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setShowGenre(false);
      }
    };
    if (showGenre) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showGenre]);

  useEffect(() => {
    setShowGenre(false);
  }, [location]);

  if (location.pathname === "/siomaiadminpanel") return null;

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 md:py-6 bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="md:hidden">
            <Hamburger size={18} toggled={showSideBar} toggle={setShowSideBar} color="#fff" />
          </div>
          <Link to="/">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1 group">
              <span className="text-lg md:text-xl font-black tracking-[2px] md:tracking-[4px] uppercase text-white">
                UP<span className="text-red-500">TO</span>MOVIE
              </span>
              <MdOutlineDoubleArrow className="hidden sm:block text-red-500 text-2xl group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </div>

        {/* NAVIGATION - Hidden on Mobile, shown via Sidebar instead */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase z-[200]" >
          <MenuList />

          <div className="relative" ref={genreRef}>
            <button
              onClick={() => setShowGenre(!showGenre)}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              GENRES
              <MdOutlineKeyboardArrowDown className={`transition-transform duration-300 ${showGenre ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showGenre && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  // Responsive Positioning: center-aligned on small, left-aligned on large
                  className="absolute top-full -left-20 md:left-0 mt-4 w-[280px] md:w-[450px] bg-zinc-950/95 border border-white/10 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 p-3 gap-1">
                    {GENRES.map((genre) => (
                      <Link
                        key={genre.name}
                        to={`/genre/${genre.name.toLowerCase()}`}
                        className="px-3 py-2 text-[11px] md:text-[12px] text-slate-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-all"
                        onClick={() => setShowGenre(false)}
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 md:gap-6">
          <button onClick={() => setShowBar(!isShowBar)} className="p-2 text-slate-400 hover:text-white transition-colors">
            <AnimatePresence mode="wait">
              {!isShowBar ? (
                <motion.div key="search" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <CiSearch size={24} className="md:w-7 md:h-7" />
                </motion.div>
              ) : (
                <motion.div key="close" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-red-500">
                  <CiCircleRemove size={24} className="md:w-7 md:h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <SearchBar isShowBar={isShowBar} setShowBar={setShowBar} />
      <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
    </header>
  );
};

export default Header;