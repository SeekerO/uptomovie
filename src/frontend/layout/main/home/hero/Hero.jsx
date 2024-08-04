import React, { useState } from "react";
import ModalDisplayMovieDetails from "../../../../utils/components/ModalDisplayMovieDetails";
import { apiTMDB } from "../../../../utils/api/api";
import { BiSolidMoviePlay } from "react-icons/bi";
import { MovieImageURL } from "../../../../utils/utils/url";
const Hero = ({ nowPlayingList }) => {
  const [open, setOpen] = useState(false);
  const [movieDetails, setmovieDetails] = useState([]);
  const imgURL = MovieImageURL();

  const movieSelection = async (id) => {
    const response = await apiTMDB.getSingleMovieData(id);
    setmovieDetails(response);

    if (response.length !== 0) setOpen(!open);
  };

  const backgroundImage = `${imgURL}${nowPlayingList?.backdrop_path}`;

  const gradientOverlay =
    "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))"; // Gradient from dark to transparent
  return (
    <div className="w-full min-screen bg-black flex flex-col justify-center">
      <div
        className="w-full min-h-screen bg-cover bg-center items-center flex px-20 shadow-inner shadow-black "
        style={{
          backgroundImage: `${gradientOverlay}, url(${backgroundImage})`,
          backgroundBlendMode: "darken",
          backgroundSize: "cover", // Ensure the background image covers the entire container
          backgroundPosition: "center", // Center the background image
          width: "100%", // Adjust the width as needed
          height: "100%", // Adjust the height as needed
        }}
      >
        <div className="w-full min-h-full max-h-max flex ">
          <img
            src={imgURL + nowPlayingList?.poster_path}
            className="h-[300px] w-[200px] rounded-sm"
            alt={`${nowPlayingList?.title} poster`}
          />
          <div className="px-5 h-full w-full gap-2 flex flex-col">
            <h1 className="text-[50px] font-bold text-white">
              {nowPlayingList?.title}
            </h1>
            <p className="w-[80%] text-[20px] text-white">
              {nowPlayingList?.overview}
            </p>
            <label className="text-white">
              Release Date: {nowPlayingList?.release_date}
            </label>
            <button
              className=" text-white bg-[#EE2B47] flex overflow-hidden w-[55px] truncate hover:w-[260px] items-center gap-2 shrink-0 px-2 py-0.5 text-[25px] rounded-sm font-bold cursor-pointer hover:scale-110 duration-300 hover:shadow-lg hover:shadow-black"
              onClick={() => movieSelection(nowPlayingList.id)}
            >
              <BiSolidMoviePlay className="text-[40px] shrink-0" /> WATCH
              TRAILER
            </button>
          </div>
        </div>
      </div>
      <ModalDisplayMovieDetails
        openDetails={open}
        setopenDetails={setOpen}
        MovieData={movieDetails}
        imgURL={imgURL}
      />
    </div>
  );
};

export default Hero;
