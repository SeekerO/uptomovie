import React, { useState } from "react";
import { AsyncImage } from "loadable-image";

import { BiSolidCameraMovie } from "react-icons/bi";
import CircularProgress from "../components/CircularProgress";
import ModalDisplayMovieDetails from "../../utils/components/ModalDisplayMovieDetails";
import { MovieImageURL } from "../utils/url";
const MovieConfig = ({ movie, displayPercentage }) => {
  const [openDetails, setopenDetails] = useState(false);
  const imgURL = MovieImageURL();

  return (
    <>
      <div
        className="flex flex-col group text-center mt-4 justify-center items-center w-full"
        onClick={() => setopenDetails(true)}
      >
        <div className="relative md:h-[45dvh] md:w-[30dvh] h-[220px] w-[150px] flex justify-end  cursor-pointer ">
          <AsyncImage
            src={"" || imgURL + movie.poster_path}
            loader={<div style={{ background: "#888" }} />}
            className="w-full h-full object-cover rounded-md border-[1px] bg-black  border-slate-800 group-hover:opacity-50  duration-300  group-hover:scale-105 "
          />

          {displayPercentage && (
            <CircularProgress percentage={Math.round(movie.vote_average)} />
          )}

          <div className="absolute w-full h-full items-center  scale-105 z-0 justify-center hidden group-hover:flex flex-col ">
            <BiSolidCameraMovie className="text-[50px]" />
            Watch Trailer
          </div>
        </div>
        <p className="text-[14px] md:w-[200px] w-[100px] font-semibold text-center mt-1 truncate overflow-hidden ">
          {movie.title}
        </p>
      </div>

      {openDetails && movie.id && (
        <ModalDisplayMovieDetails
          inDisplay={openDetails}
          setopenDetails={setopenDetails}
          Movie_id={movie.id}
        />
      )}
    </>
  );
};

export default MovieConfig;
