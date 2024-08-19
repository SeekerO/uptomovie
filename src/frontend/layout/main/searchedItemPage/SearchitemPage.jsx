import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiTMDB } from "../../../utils/api/api";
import Hero from "../../../utils/components/Hero";
import DisplayMovieByCategory from "../../../utils/components/display_component/DisplayMovieByCategory";
import Pagination from "../../../utils/components/Pagination";
const SearchitemPage = () => {
  const searchedParams = useParams();
  const nav = useNavigate();
  const { id, page, language } = useParams();
  const [searchedItems, setSearchedItems] = useState([]);

  const fetchRelatedTerm = async () => {
    const response = await apiTMDB.getSearchMovieByParam(searchedParams);
    setSearchedItems(response);
  };

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    nav("/searchedItem/" + id + "/" + pageNumber + "/" + language);
  };

  useEffect(() => {
    fetchRelatedTerm();
  }, [searchedParams]);

  return (
    <div className="h-full w-full bg-gradient-to-t from-[#E6E6E6] relative">
      {searchedItems?.results?.length !== 0 || searchedItems.length !== 0 ? (
        <>
          <Hero nowPlayingList={searchedItems?.results[0]} />

          <div className="h-auto w-full bg-black md:px-20 px-0 flex flex-col items-center justify-center z-40 -mt-20">
            <div className="w-full">
              <DisplayMovieByCategory
                meta_data={searchedItems?.results}
                title={`Total searched items is ${searchedItems.total_results}`}
                isSearch={true}
              />
            </div>

            <div className="mt-10 mb-10">
              <Pagination
                activePageNumber={parseInt(page) - 1}
                total_items={searchedItems.total_results}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-[30px] font-semibold text-[#952334]">
          NO ITEM SEARCHED
        </div>
      )}
    </div>
  );
};

export default SearchitemPage;
