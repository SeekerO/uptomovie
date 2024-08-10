import React, { useRef, useEffect, useState } from "react";
// Package
import { motion } from "framer-motion";
import moment from "moment";

// Utils
import CarouselTrailers from "../CarouselTrailers";
import MovieConfigPoster from "../../config/MovieConfigPoster";
import { MovieImageURL } from "../../utils/url";
import { apiTMDB } from "../../api/api";

// Icons
import { IoMdClose } from "react-icons/io";
import LoadingScreen from "../loading/LoadingScreen";
import ProductionCompanies from "../ProductionCompanies";

function DisplayMovieDetails({ inDisplay, setopenDetails, Movie_id, film }) {
  const ref = useRef(null);
  const [close, setClose] = useState(true);
  const imgURL = MovieImageURL();
  const [MovieData, setselectedMovie] = useState([]);

  useEffect(() => {
    if (Movie_id) {
      movieSelection(Movie_id.id);
    }
  }, [Movie_id]);

  const movieSelection = async (id) => {
    if (film === undefined) {
      const response = await apiTMDB.getSingleMovieData(id);
      setselectedMovie(response);
    } else {
      const response = await apiTMDB.getSingleTvShowData(id);
      setselectedMovie(response);
    }
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

  function volume(vol) {
    const result = vol?.toLocaleString("en-US", {
      maximumFractionDigits: 5,
      notation: "compact",
      compactDisplay: "short",
    });

    return result;
  }

  if (!inDisplay) return null;

  return (
    <>
      {MovieData?.length === 0 ? (
        <LoadingScreen />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={close ? { opacity: 1 } : { opacity: 0 }}
          transition={close ? { duration: 1 } : { duration: 1, delay: 1.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 h-full rounded-sm w-screen flex justify-end z-50"
        >
          <motion.section
            initial={{ width: "0dvh" }}
            animate={close ? { width: "120dvh" } : { width: "0dvh" }}
            transition={{ duration: 0.8 }}
            ref={ref}
            className="h-full w-full bg-[#1D1F2B] z-50 overflow-y-auto overflow-x-hidden relative items-center flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={close ? { opacity: 1 } : { opacity: 0 }}
              transition={
                close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
              }
              className="relative w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(to top, rgb(29 31 43), rgb(0, 0, 0, 0.3)), url(${
                  imgURL + MovieData?.backdrop_path
                })`,
                backgroundBlendMode: "darken",
              }}
            >
              <div
                onClick={() => closeAnimation()}
                className="w-full  justify-end items-end md:hidden flex top-0 px-2 mt-4"
              >
                <IoMdClose className="text-[25px]" />
              </div>
              <img
                src={imgURL + MovieData?.backdrop_path}
                alt="Movie Backdrop"
                className="w-full h-full object-cover opacity-0"
              />
            </motion.div>
            <div className="w-full items-center flex flex-col -mt-60">
              <motion.img
                initial={{ opacity: 0 }}
                animate={close ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                }
                src={imgURL + MovieData?.poster_path}
                className="h-[300px] md:w-fit  w-[200px] z-50 md:mt-0 mt-10"
              />
              <motion.h1
                initial={{ opacity: 0 }}
                animate={close ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                }
                className="text-[40px] font-bold text-center px-10"
              >
                {MovieData?.title}
              </motion.h1>
              <div className="px-10 flex flex-col gap-y-14 mt-10 mb-20 w-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={close ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                  }
                  className="w-full flex flex-col"
                >
                  <h2 className="text-[30px] font-bold">About</h2>
                  <p className="px-2">{MovieData?.overview}</p>
                </motion.div>
                <div className="flex gap-2 justify-between w-full items-start">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={close ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                    }
                    className="w-full flex flex-col"
                  >
                    <h2 className="text-[25px] font-semibold">Budget</h2>
                    <p className="px-2">
                      {volume(MovieData?.budget) === "0"
                        ? "No Budget Information"
                        : `$${volume(MovieData?.budget)}`}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={close ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                    }
                    className="w-full flex flex-col"
                  >
                    <h2 className="text-[25px] font-semibold">Genres</h2>
                    <div className="flex gap-2 px-2 flex-wrap">
                      {MovieData?.genres.map((gen) => (
                        <div key={gen.id}>{gen.name}</div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={close ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                    }
                    className="w-full flex flex-col gap-2"
                  >
                    <h2 className="text-[25px] font-semibold">Release Date</h2>
                    <label className="font-semibold px-2">
                      {moment(MovieData?.release_date).format("LL")}
                    </label>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={close ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                  }
                  className="w-full flex flex-col"
                >
                  {MovieData?.videos?.results && (
                    <>
                      <h1 className="text-[25px] font-semibold">
                        Official Trailer
                      </h1>
                      <CarouselTrailers data={MovieData?.videos.results} />{" "}
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={close ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                  }
                  className="w-full flex flex-col"
                >
                  <h2 className="text-[25px] font-semibold">
                    Production Companies
                  </h2>
                  <div className="flex gap-2 mt-2 items-start px-2">
                    {MovieData?.production_companies.map((comp, index) => (
                      <ProductionCompanies
                        key={index}
                        item={comp}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={close ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    close ? { duration: 1, delay: 1.5 } : { duration: 0.4 }
                  }
                  className="w-full flex flex-col"
                >
                  <h1 className="text-[25px] font-semibold">Cast</h1>
                  <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] mx-auto my-0 w-full px-0.5">
                    {MovieData?.credits.cast
                      .slice(0, 15)
                      .map((casts, castIdx) => (
                        <motion.div
                          key={casts.id}
                          initial={{ opacity: 0 }}
                          animate={close ? { opacity: 1 } : { opacity: 0 }}
                          transition={
                            close
                              ? { duration: 1, delay: 1.5 }
                              : { duration: 0.4 }
                          }
                          className="border-[1px] bg-slate-800 border-slate-600 rounded-sm flex flex-col justify-start items-center px-2 py-1"
                        >
                          <img
                            src={imgURL + casts.profile_path}
                            alt={"No Image"}
                            className="w-[100px] object-contain rounded-sm"
                          />
                          <label className="font-semibold">{casts.name}</label>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={close ? { opacity: 1 } : { opacity: 0 }}
                  transition={close ? { duration: 1 } : { duration: 0.4 }}
                  className="w-full"
                >
                  <h1 className="text-[25px] font-semibold">Recommendations</h1>
                  <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-2 mx-auto my-0 w-full px-0.5">
                    {MovieData.recommendations.map((recom, idx) => (
                      <div key={recom.id} className="mt-10">
                        <MovieConfigPoster
                          movie={recom}
                          displayPercentage={false}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </>
  );
}

export default DisplayMovieDetails;
