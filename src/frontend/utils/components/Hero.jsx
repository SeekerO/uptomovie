import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalDisplayMovieDetails from "./modal/ModalDisplayMovieDetails";
import { apiTMDB } from "../api/api";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MovieImageURL } from "../utils/url";

const Hero = ({ nowPlayingList }) => {
  const [open, setOpen] = useState(true);
  const [movieDetails, setmovieDetails] = useState([]);
  const imgURL = MovieImageURL();
  const [isFetching, setIsFetching] = useState(false);

  const movieSelection = async (id) => {
    setIsFetching(true); // Start loading
    const response = await apiTMDB.getSingleMovieData(id);
    setmovieDetails(response);
    setIsFetching(false); // Stop loading

    if (response) setOpen(true);


  };

  const backgroundImage = `${imgURL}${nowPlayingList?.backdrop_path}`;

  return (
    <div className="relative w-full min-h-[85vh] mt09 md:min-h-screen bg-black overflow-hidden">
      {/* Background Layer with Modern Cinematic Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Modern Gradient: Bottom-Heavy for text readability and Left-to-Right focus */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Content Layer */}
      <div className=" h-full flex items-center md:px-32 px-6 pt-20 absolute">
        <div className="flex flex-row items-center gap-10 max-w-7xl">

          {/* Poster: Modern 3D Card Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block shrink-0"
          >
            <img
              src={imgURL + nowPlayingList?.poster_path}
              className="h-[450px] w-[300px] rounded-2xl shadow-2xl border border-white/10 object-cover"
              alt={`${nowPlayingList?.title} poster`}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-red-600 text-[12px] font-bold text-white uppercase tracking-wider">
                Featured Content
              </span>
              <span className="text-gray-400 text-sm font-medium">
                {nowPlayingList?.release_date?.split('-')[0]}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
              {nowPlayingList?.title}
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-none">
              {nowPlayingList?.overview}
            </p>

            <div className="items-center gap-4 mt-4 hidden">
              <button
                onClick={() => movieSelection(nowPlayingList.id)}
                className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-red-600/20"
              >
                <BiSolidMoviePlay className="text-3xl transition-transform group-hover:rotate-12" />
                <span className="tracking-widest uppercase">{isFetching ? "Loading..." : "Watch Trailer"}</span>
              </button>

              <button className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all">
                More Info
              </button>
            </div>
          </motion.div>
        </div>
      </div>


      {/* Modal Integration */}
      <ModalDisplayMovieDetails
        openDetails={open}
        setopenDetails={setOpen}
        MovieData={nowPlayingList.id}
        imgURL={imgURL}
      />
    </div>
  );
};

export default Hero;