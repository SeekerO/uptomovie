import React, { useState } from "react";
import { AsyncImage } from "loadable-image";
import { BiSolidCameraMovie } from "react-icons/bi";
import CircularProgress from "../components/CircularProgress";
import ModalDisplayMovieDetails from "../../utils/components/modal/ModalDisplayMovieDetails";
import { MovieImageURL } from "../utils/url";
import ModalDisplayTvShowsDetails from "../components/modal/ModalDisplayTvShowDetails";
const MovieConfig = ({ movie, displayPercentage, film, forViewOnly }) => {
  const [openDetails, setopenDetails] = useState(false);
  const imgURL = MovieImageURL();

  const isFilm = () => {
    if (movie.media_type === undefined && film === "tv") {
      return film === "tv" ? true : false;
    } else {
      return movie.media_type === "tv" ? true : false;
    }
  };

  const functionOpenDetails = () => {
    forViewOnly === undefined && setopenDetails(true);
  };

  return (
    <>
      <div
        className="flex flex-col group text-center mt-4 justify-center items-center w-full"
        onClick={() => functionOpenDetails()}
      >
        <div className="relative md:h-[45dvh] md:w-[30dvh] h-[220px] w-[150px] flex justify-end  cursor-pointer ">
          <AsyncImage
            src={"" || imgURL + movie.poster_path}
            loader={<div style={{ background: "#888" }} />}
            className="w-full h-full object-cover rounded-md border-[1px] bg-black  border-slate-800 group-hover:opacity-50  duration-300  group-hover:scale-105 "
          />

          {displayPercentage && (
            <>
              {Math.round(movie.vote_average) === 0 ? (
                <div className="absolute text-[#EE2B47] bg-slate-100 rounded-md -mt-2 p-1 font-semibold -mr-2">
                  Upcoming
                </div>
              ) : (
                <CircularProgress percentage={Math.round(movie.vote_average)} />
              )}
            </>
          )}
          {forViewOnly === undefined && (
            <div className="absolute w-full h-full items-center  scale-105 z-0 justify-center hidden group-hover:flex flex-col ">
              <BiSolidCameraMovie className="text-[50px]" />
              {Math.round(movie.vote_average) === 0
                ? "Upcoming No Trailer"
                : "Watch Trailer"}
            </div>
          )}
        </div>
        <p className="text-[14px] md:w-[200px] w-[100px] font-semibold text-center mt-1 truncate overflow-hidden ">
          {movie.title} {movie.name}
        </p>
      </div>

      {openDetails && movie.id && Math.round(movie.vote_average) !== 0 && (
        <>
          {!isFilm() ? (
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
