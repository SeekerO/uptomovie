import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiTMDB } from "../../../utils/api/api";

// Components
import LoadingScreen from "../../../utils/components/loading/LoadingScreen";
import DisplayPeople from "../../../utils/components/display_component/DisplayPeople";
import Pagination from "../../../utils/components/Pagination";

const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pageNumber: pageParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const response = await apiTMDB.getPeopleList({ page: pageParam || 1 });
        setPeople(response);
      } catch (error) {
        console.error("Failed to fetch people:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPeople();
  }, [pageParam]);

  const handlePageChange = ({ selected }) => {
    const nextPage = selected + 1;
    navigate(`/people/${nextPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading && people.length === 0) return <LoadingScreen />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30 z-10">
      {/* Hero Section / Header */}
      <div className="relative pt-32 pb-12 px-6 md:px-20 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-900/10 to-transparent opacity-50 pointer-events-none" />

        <header className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#701705]">People</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-md">
              Discover the trending actors and creators shaping the entertainment industry today.
            </p>
          </div>

          <div className="text-sm font-mono text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            TOTAL RESULTS: {people.total_results?.toLocaleString()}
          </div>
        </header>
      </div>

      {/* Grid Content */}
      <section className="px-6 md:px-20 pb-20">
        <div className="transition-all duration-500 ease-in-out">
          <DisplayPeople meta_data={people} />
        </div>

        {/* Modern Pagination Container */}
        <footer className="mt-20 py-10 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
            Navigate through pages
          </p>
          <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-colors">
            <Pagination
              activePageNumber={parseInt(people.page || 1) - 1}
              total_items={people.total_results}
              handlePageChange={handlePageChange}
            />
          </div>
        </footer>
      </section>
    </main>
  );
};

export default PeoplePage;