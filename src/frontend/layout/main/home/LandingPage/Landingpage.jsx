import React, { useEffect, useState } from "react";
import { apiTMDB } from "../../../../utils/api/api";
import Hero from "../hero/Hero";
import DisplayMovieByCategory from "../../../../utils/components/DisplayMovieByCategory";

const Landingpage = () => {
  const [movieParam, setmovieParam] = useState({
    pageParam: 1,
    languageParam: "en-US",
    searchParam: "",
  });
  const [nowPlayingList, setnowPlayingList] = useState([]);
  const [topRatedList, settopRatedList] = useState([]);
  const [popularList, setpopularList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const responseNowPlaying = await apiTMDB.getNowPlayingList();
      setnowPlayingList(responseNowPlaying?.results);

      const responseTopRated = await apiTMDB.getTopRatedList();
      settopRatedList(responseTopRated?.results);

      const responsePopular = await apiTMDB.getPopularList();
      setpopularList(responsePopular?.results);
    };
    fetchList();
  }, []);

  const checkIfAllFetched =
    nowPlayingList.length !== 0 &&
    topRatedList.length !== 0 &&
    popularList.length !== 0;

  return (
    <div className="h-full w-full bg-gradient-to-t from-[#E6E6E6] relative">
      {checkIfAllFetched && (
        <>
          <Hero nowPlayingList={nowPlayingList[0]} />

          <div className="h-auto w-full bg-black px-20 z-40">
            <div className="-mt-20">
              <DisplayMovieByCategory
                meta_data={nowPlayingList}
                title={"Now Playing"}
              />
            </div>
            <div className="mt-10">
              <DisplayMovieByCategory
                meta_data={topRatedList}
                title={"Top Rated"}
              />
            </div>
            <div className="mt-10">
              <DisplayMovieByCategory
                meta_data={popularList}
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
