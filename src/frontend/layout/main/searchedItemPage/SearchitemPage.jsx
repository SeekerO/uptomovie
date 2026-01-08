import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiTMDB } from "../../../utils/api/api";
import Hero from "../../../utils/components/Hero";
import DisplayMovieByCategory from "../../../utils/components/display_component/DisplayMovieByCategory";
import Pagination from "../../../utils/components/Pagination";

const SearchitemPage = () => {
  const navigate = useNavigate();
  // Destructure params directly for cleaner code
  const { id, page, language } = useParams();
  const [searchedItems, setSearchedItems] = useState(null); // Changed to null for easier "loading" check
  const [loading, setLoading] = useState(true);

  const fetchRelatedTerm = async () => {
    setLoading(true);
    try {
      // Pass the params explicitly to your API utility
      const response = await apiTMDB.getSearchMovieByParam({ id, page, language });
      setSearchedItems(response);
    } catch (error) {
      console.error("Search Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => {
    const pageNumber = selected + 1;
    navigate(`/searchedItem/${id}/${pageNumber}/${language}`);
    // Scroll to top on page change so user sees new results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    fetchRelatedTerm();
  }, [id, page, language]); // Refetch when any param changes

  if (loading) return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black text-white">
      <div className="animate-pulse text-2xl font-bold tracking-widest">SEARCHING...</div>
    </div>
  );

  const hasResults = searchedItems?.results && searchedItems.results.length > 0;

  return (
    <div className="min-h-screen w-full bg-black relative pt-20">
      {/* pt-20 ensures content isn't hidden behind your fixed glass header */}

      {hasResults ? (
        <>
          {/* Hero section using the first result */}
          <Hero nowPlayingList={searchedItems.results[0]} />

          <div className="relative h-auto w-full bg-black md:px-20 px-4 flex flex-col items-center justify-center z-40 -mt-32">
            <div className="w-full">
              <DisplayMovieByCategory
                meta_data={searchedItems.results}
                title={`Search Results for "${id}"`}
                isSearch={true}
              />
            </div>

            <div className="mt-12 mb-20">
              <Pagination
                activePageNumber={parseInt(page) - 1}
                total_items={searchedItems.total_results}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-4">
          <div className="text-[30px] font-semibold text-[#EE2B47] tracking-tighter">
            NO ITEMS FOUND
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
          >
            Go Back Home
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchitemPage;