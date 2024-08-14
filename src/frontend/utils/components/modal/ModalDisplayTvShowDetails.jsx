import React, { useRef, useEffect, useState } from "react";
// Package
import { motion } from "framer-motion";
import moment from "moment";

// Utils
import { MovieImageURL } from "../../utils/url";
import { apiTMDB } from "../../api/api";
import MovieConfigPoster from "../../config/MovieConfigPoster";
import LoadingScreen from "../loading/LoadingScreen";
import CarouselTrailers from "../CarouselTrailers";
import PeopleConfigProfile from "../../config/PeopleConfigProfile";

// Icons
import { IoMdClose } from "react-icons/io";
import { MdImageNotSupported } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const imgURL = MovieImageURL();

function ModalDisplayTvShowsDetails({ inDisplay, setopenDetails, Movie_id }) {
  const ref = useRef(null);
  const [close, setClose] = useState(true);

  const [tvShowData, settvShowData] = useState([]);

  useEffect(() => {
    if (Movie_id) {
      tvshowSelection(Movie_id.id);
    }
  }, []);

  const tvshowSelection = async (id) => {
    const response = await apiTMDB.getSingleTvShowData(id);
    settvShowData(response);
  };

  const closeAnimation = () => {
    setClose(false);
    setTimeout(() => {
      setopenDetails(false);
      setClose(true);
    }, 1200);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      closeAnimation();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!inDisplay) return null;

  return (
    <>
      {tvShowData?.length === 0 ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={close ? { opacity: 1 } : { opacity: 0 }}
          transition={close ? { duration: 1 } : { duration: 1, delay: 1.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 h-screen rounded-sm w-screen flex justify-end z-50"
        >
          <motion.section
            initial={{ width: "0dvh" }}
            animate={close ? { width: "100%" } : { width: "0dvh" }}
            transition={{ duration: 0.8 }}
            ref={ref}
            className="h-full bg-[#1D1F2B] z-50 overflow-y-auto overflow-x-hidden relative items-center flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={close ? { opacity: 1 } : { opacity: 0 }}
              transition={
                close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
              }
              style={{
                backgroundImage: `linear-gradient(to top, rgb(29 31 43), rgb(0, 0, 0, 0.5)), url(${
                  imgURL + tvShowData?.backdrop_path
                })`,
                backgroundBlendMode: "darken",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              className="relative w-full h-full bg-cover bg-center flex flex-col "
            >
              <div
                onClick={() => closeAnimation()}
                className="w-full  justify-end items-end n flex top-0 px-2 mt-4"
              >
                <IoMdClose className="text-[40px] cursor-pointer hover:text-red-600" />
              </div>

              <div className="h-full w-full mt-40 z-20 flex flex-col md:px-10 items-center ">
                {/* Poster */}
                {Poster(tvShowData, close)}
                <div className="w-full md:flex mt-20  gap-5 bg-[#1D1F2B] px-5">
                  {/* Left Side*/}
                  {LeftSideLayout(tvShowData)}
                  {/* Right Side */}
                  {RightSideLayout(tvShowData)}
                </div>
              </div>
            </motion.div>
          </motion.section>
        </motion.div>
      )}
    </>
  );
}

export default ModalDisplayTvShowsDetails;

const Poster = (tvShowData, close) => {
  return (
    <>
      <div
        onClick={() => window.open(tvShowData.homepage)}
        className=" shadow-lg rounded-md shadow-black flex flex-col justify-center"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={close ? { opacity: 1 } : { opacity: 0 }}
          transition={close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }}
          src={imgURL + tvShowData?.poster_path}
          className="h-[400px] md:w-fit  w-[250px] z-50 md:mt-0 mt-10 items "
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={close ? { opacity: 1 } : { opacity: 0 }}
          className="w-full flex justify-center bg-slate-600 rounded-b-md p-2 "
        >
          <div className="flex gap-2 items-center">
            <img
              src={imgURL + tvShowData.networks[0].logo_path}
              className=" w-[60px] p-1 rounded-md"
            />
            <label className="text-[#c44357] font-bold">Watch Now</label>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-col">
        <h1 className="md:text-[40px] text-[30px] font-bold">
          {tvShowData.name}
        </h1>
        <em className="md:text-[20px] text-[10px] text-center w-full">
          {moment(tvShowData.first_air_date).format("YYYY")}
        </em>
      </div>
    </>
  );
};

const LeftSideLayout = (tvShowData) => {
  const LineDesign = () => {
    return (
      <div className="w-full bg-slate-500 h-[1px] mt-5 mb-5 bg-opacity-40" />
    );
  };

  return (
    <div className="md:w-[70%] w-full md:mb-20 mb-10 ">
      {tvShowData.overview !== "" && (
        <>
          <div className="w-full">
            <h1 className="font-semibold text-[25px]">Overview</h1>
            <p className="text-[18px] mt-2 ml-1">{tvShowData.overview}</p>
          </div>
          {LineDesign()}
        </>
      )}

      {tvShowData.videos.results.length !== 0 && (
        <>
          <div className="mt-5  w-full">
            <h1 className="font-semibold text-[25px]">Trailer</h1>
            <div className="mt-1">
              <CarouselTrailers data={tvShowData.videos.results} />
            </div>
          </div>{" "}
          {LineDesign()}
        </>
      )}

      {tvShowData.next_episode_to_air !== null && (
        <>
          <div className="w-full">
            <h1 className="font-semibold text-[25px]">Next Season</h1>
            <div className="w-full flex border-[1px] border-slate-700 border-opacity-40 gap-10 items-center">
              <div className="h-[200px] w-[150px] items-center justify-center flex bg-slate-500">
                <MdImageNotSupported className="text-[40px]" />
              </div>
              <div className="">
                <h1 className="text-[40px]">
                  Season {tvShowData.next_episode_to_air?.season_number}
                </h1>
                <label>
                  Season {tvShowData.next_episode_to_air?.season_number} of{" "}
                  {tvShowData.name} is set to premiere on{" "}
                  {moment(tvShowData.next_episode_to_air?.air_date).format(
                    "LL"
                  )}
                  .
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-col w-full mt-5">
        <h1 className="font-semibold text-[25px]">Seasons</h1>
        <div className="relative mt-1 p-2">
          <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-4">
            {tvShowData?.seasons.map((season, index) => (
              <div
                key={season.id}
                className="rounded-md flex-shrink-0 flex flex-col justify-center items-center min-w-[200px]"
              >
                <MovieConfigPoster
                  movie={season}
                  key={index}
                  displayPercentage={false}
                  film={"tv"}
                  forViewOnly={true}
                />
              </div>
            ))}
          </div>

          {tvShowData.seasons.length > 4 && (
            <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-[#1D1F2B]/95 to-transparent"></div>
          )}
        </div>
      </div>

      {LineDesign()}
      {tvShowData.credits.cast.length !== 0 && (
        <>
          <div className="w-full">
            <h1 className="font-semibold text-[25px]">Cast</h1>
            <div className="relative mt-1 p-2">
              <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-3">
                {tvShowData.credits.cast.map((cast) => (
                  <PeopleConfigProfile key={cast.id} people={cast} />
                ))}
                {tvShowData.credits.cast.length > 4 && (
                  <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-[#1D1F2B]/95 to-transparent"></div>
                )}
              </div>

              {tvShowData.seasons.length > 4 && (
                <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-[#1D1F2B]/95 to-transparent"></div>
              )}
            </div>
          </div>
          {LineDesign()}
        </>
      )}

      <div className="w-full">
        {tvShowData.reviews.results.length !== 0 && (
          <>
            <h1 className="font-semibold text-[25px]">Reviews</h1>
            <div className="h-[200px] w-full overflow-y-auto">
              {tvShowData.reviews.results.map((review) => (
                <div
                  key={review.id}
                  className="flex w-full bg-[#313549] mt-1 rounded-md items-center h-[80px] overflow-y-auto"
                >
                  <div className="bg-slate-500 flex h-full items-center px-5 rounded-l-md">
                    <IoPerson className="text-[30px] shrink-0" />
                  </div>

                  <div className="h-full w-full px-2 justify-center flex flex-col">
                    <div className="flex w-full justify-between items-center">
                      <h1 className="font-bold">{review.author}</h1>
                      <em className="text-xs">
                        {moment(review.updated_at).format("LLL")}
                      </em>
                    </div>

                    <p className="ml-1 mt-1 px-2">{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="w-full">
        <h1 className="font-semibold text-[25px]">Recommendations</h1>
        <div className="relative mt-1 p-2">
          <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-3">
            {tvShowData.recommendations.map((recom) => (
              <MovieConfigPoster
                key={recom.id}
                movie={recom}
                displayPercentage={false}
                film={"tv"}
              />
            ))}
          </div>

          {tvShowData.recommendations.length > 4 && (
            <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-[#1D1F2B]/95 to-transparent"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const RightSideLayout = (tvShowData) => {
  return (
    <div className="md:w-[30%] w-full flex flex-col  gap-y-5 ">
      <div className="flex flex-col w-full justify-start gap-2 ml-1 mt-2">
        <h1 className="font-semibold text-[20px]">Genre</h1>
        <div className="flex md:flex-col flex-wrap gap-2">
          {tvShowData.genres.map((genres) => (
            <em key={genres.id}>{genres.name}</em>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full justify-start gap-2 ml-1 mt-2">
        <h1 className="font-semibold text-[20px]">Status</h1>
        <em className="flex flex-col gap-2">{tvShowData.status}</em>
      </div>
      <div className="flex flex-col w-full justify-start gap-2 ml-1 mt-2">
        <h1 className="font-semibold text-[20px]">Type</h1>
        <em className="flex flex-col gap-2">{tvShowData.type}</em>
      </div>
      <div className="flex flex-col w-full justify-start gap-2 ml-1 mt-2">
        <h1 className="font-semibold text-[20px]">Languages</h1>
        <div className="flex flex-col gap-2">
          {tvShowData.spoken_languages.map((lang) => (
            <em key={lang.name}>{lang.name}</em>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full justify-start gap-2 ml-1 mt-2">
        <h1 className="font-semibold text-[25px]">Keywords</h1>
        <div className="flex flex-wrap gap-2 w-full">
          {tvShowData.keywords.results.map((keywords) => (
            <em
              key={keywords.id}
              className="bg-slate-300 text-black px-1 rounded-md"
            >
              {keywords.name}
            </em>
          ))}
        </div>
      </div>
    </div>
  );
};
