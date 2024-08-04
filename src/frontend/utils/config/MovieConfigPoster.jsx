import React, { useState } from "react";
import { AsyncImage } from "loadable-image";
import { apiTMDB } from "../api/api";
import { BiSolidCameraMovie } from "react-icons/bi";
import CircularProgress from "../components/CircularProgress";
import ModalDisplayMovieDetails from "../../utils/components/ModalDisplayMovieDetails";
import { MovieImageURL } from "../utils/url";
const MovieConfig = ({ movie, displayPercentage }) => {
  const [openDetails, setopenDetails] = useState(false);
  const [selectedMovie, setselectedMovie] = useState([]);
  const imgURL = MovieImageURL();

  const movieSelection = async (id) => {
    const response = await apiTMDB.getSingleMovieData(id);
    setselectedMovie(response);

    if (response?.length !== 0) setopenDetails(!openDetails);
  };
  return (
    <>
      <div
        className="flex flex-col group text-center mt-4"
        onClick={() => movieSelection(movie.id)}
      >
        <div className="relative h-[250px] w-[200px] flex justify-end  cursor-pointer ">
          <AsyncImage
            src={"" || imgURL + movie.poster_path}
            style={{ width: 200, height: 250 }}
            loader={<div style={{ background: "#888" }} />}
            className=" rounded-md border-[1px] bg-black  border-slate-800 group-hover:opacity-50  duration-300  group-hover:scale-105 "
          />

          {displayPercentage && (
            <CircularProgress percentage={Math.round(movie.vote_average)} />
          )}

          <div className="absolute w-full h-full items-center  scale-105 z-10 justify-center hidden group-hover:flex flex-col ">
            <BiSolidCameraMovie className="text-[50px]" />
            Watch Trailer
          </div>
        </div>
        <p className="text-[14px] w-[200px] font-semibold text-center mt-1 ">
          {movie.title}
        </p>
      </div>
      <ModalDisplayMovieDetails
        inDisplay={openDetails}
        setopenDetails={setopenDetails}
        MovieData={selectedMovie}
      />
    </>
  );
};

export default MovieConfig;
