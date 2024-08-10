import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../../utils/components/loading/LoadingScreen";
import Pagination from "../../../utils/components/Pagination";
import DisplayMovieByCategory from "../../../utils/components/display_component/DisplayMovieByCategory";
import { apiTMDB } from "../../../utils/api/api";
import { useNavigate, useParams } from "react-router-dom";
const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const tvshowsParams = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchTvShows = async () => {
      const response = await apiTMDB.getAllTvShows(tvshowsParams.page);
      setTvShows(response);
    };
    fetchTvShows();
  }, [tvshowsParams]);

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    nav("/tvshows/" + pageNumber);
  };

  return (
    <div className="w-full h-full md:px-20 px-10 flex flex-col">
      {tvShows?.length !== 0 ? (
        <div className="mt-24 flex flex-col">
          <DisplayMovieByCategory
            film="tv"
            meta_data={tvShows.results}
            title={"Discover Tv Shows"}
          />
          <div className="mt-10 w-full justify-center flex mb-10">
            <Pagination
              activePageNumber={parseInt(tvshowsParams.page) - 1}
              total_items={tvShows.total_results}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      ) : (
        <>
          <LoadingScreen />
        </>
      )}
    </div>
  );
};

export default TvShows;
