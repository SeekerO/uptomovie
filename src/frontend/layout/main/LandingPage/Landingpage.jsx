import React, { useEffect, useState } from "react";
import { apiTMDB } from "../../../utils/api/api";
import Hero from "../../../utils/components/Hero";
import DisplayMovieByCategory from "../../../utils/components/display_component/DisplayMovieByCategory";

const Landingpage = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const AllMovie = await apiTMDB.getAllMovieLists();
      setMovieList(AllMovie);
    };
    fetchList();
  }, []);




  return (
    <div className="h-full w-full bg-gradient-to-t from-[#690000] relative">
      {movieList.length !== 0 && (
        <>
          <Hero nowPlayingList={movieList?.nowPlayingList.results[0]} />

          <div className="h-auto w-full bg-black md:px-20 px-0 flex flex-col items-center justify-center z-40 -mt-20">
            <div className="w-full">
              <DisplayMovieByCategory
                meta_data={movieList?.nowPlayingList.results}
                title={"Now Playing"}
              />
            </div>
            <div className="mt-10 w-full">
              <DisplayMovieByCategory
                meta_data={movieList?.topRatedList.results}
                title={"Top Rated"}
              />
            </div>
            <div className="mt-10 w-full">
              <DisplayMovieByCategory
                meta_data={movieList?.popularList.results}
                title={"Popular"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Landingpage;
