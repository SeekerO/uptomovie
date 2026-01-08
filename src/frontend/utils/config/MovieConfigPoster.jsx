import React, { useState } from "react";
import { AsyncImage } from "loadable-image";
import { BiSolidCameraMovie } from "react-icons/bi";
import CircularProgress from "../components/CircularProgress";
import ModalDisplayMovieDetails from "../../utils/components/modal/ModalDisplayMovieDetails";
import ModalDisplayTvShowsDetails from "../components/modal/ModalDisplayTvShowDetails";
import { MovieImageURL } from "../utils/url";

const MovieConfig = ({ movie, displayPercentage, film, forViewOnly }) => {
  const [openDetails, setopenDetails] = useState(false);
  const imgURL = MovieImageURL();

  const isTvShow = () => {
    // Priority 1: Check media_type if available (from search/trending)
    if (movie.media_type) return movie.media_type === "tv";
    // Priority 2: Check the explicit 'film' prop passed to the component
    return film === "tv";
  };

  const handleOpenDetails = () => {
    // Only open if we aren't in 'view only' mode
    if (forViewOnly === undefined) {
      setopenDetails(true);
    }
  };

  return (
    <>
      <div
        className="flex flex-col group cursor-pointer w-full max-w-[200px] mx-auto relative"
        onClick={handleOpenDetails}
      >
        {/* --- POSTER CONTAINER --- */}
        <div className=" aspect-[2/3] w-full overflow-hidden rounded-xl bg-slate-900 border border-white/5 shadow-lg transition-all duration-500 group-hover:shadow-blue-500/20 group-hover:border-blue-500/30 group-hover:-translate-y-2">

          <AsyncImage
            src={imgURL + movie.poster_path}
            loader={<div className="w-full h-full bg-slate-800 animate-pulse" />}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
            alt={movie.title || movie.name}
          />

          {/* --- OVERLAY CONTENT --- */}
          {forViewOnly === undefined && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="bg-blue-600 p-3 rounded-full shadow-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <BiSolidCameraMovie className="text-white text-2xl" />
              </div>
              <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                View Details
              </span>
            </div>
          )}



          {/* Subtle Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* --- TEXT CONTENT --- */}
        <div className="mt-3 text-left">
          <h3 className="text-[13px] font-bold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
            {movie.title || movie.name}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {movie.release_date ? movie.release_date.split("-")[0] : movie.first_air_date?.split("-")[0] || "Release TBD"}
          </p>
        </div>

      </div>

      {/* --- MODAL LOGIC --- */}
      {openDetails && movie.id && (
        <>
          {!isTvShow() ? (
            <ModalDisplayMovieDetails
              inDisplay={openDetails}
              setopenDetails={setopenDetails}
              Movie_id={movie}
              film={film}
            />
          ) : (
            <ModalDisplayTvShowsDetails
              inDisplay={openDetails}
              setopenDetails={setopenDetails}
              Movie_id={movie}
            />
          )}
        </>
      )}
    </>
  );
};

export default MovieConfig;