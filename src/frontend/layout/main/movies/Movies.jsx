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
          <DisplayMovieByCategory
            meta_data={allMovies.results}
            title={"Discover Movies"}
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
