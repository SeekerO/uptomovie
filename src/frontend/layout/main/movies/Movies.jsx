import React, { useEffect, useState } from "react";
import { apiTMDB } from "../../../utils/api/api";
import DisplayMovieByCategory from "../../../utils/components/display_component/DisplayMovieByCategory";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../../utils/components/Pagination";
import LoadingScreen from "../../../utils/components/loading/LoadingScreen";

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const moviesParams = useParams();
  const nav = useNavigate();
  useEffect(() => {
    const fetchAllMovies = async () => {
      const response = await apiTMDB.getAllTrendingMovies(moviesParams.page);
      setAllMovies(response);
    };
    fetchAllMovies();
  }, [moviesParams]);

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    nav("/movies/" + pageNumber);
  };

  return (
    <div className="w-full h-full md:px-20 px-10 flex flex-col">

      {allMovies.length !== 0 ? (
        <div className="mt-24 flex flex-col">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#701705]">Movie</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-md">
              Discover the trending movies.
            </p>
          </div>
          <DisplayMovieByCategory
            meta_data={allMovies.results}
            title={""}
          />
          <div className="mt-10 w-full justify-center flex mb-10">
            <Pagination
              activePageNumber={parseInt(moviesParams.page) - 1}
              total_items={allMovies.total_results}
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

export default Movies;
