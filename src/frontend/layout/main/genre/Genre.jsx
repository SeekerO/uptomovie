import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiTMDB } from "../../../utils/api/api";
import { IoClose } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";

// Modal Imports
import ModalDisplayMovieDetails from "../../../utils/components/modal/ModalDisplayMovieDetails";
import ModalDisplayTvShowsDetails from "../../../utils/components/modal/ModalDisplayTvShowDetails";

const GENRES = [
    { name: "Action", movie: 28, tv: 10759 },
    { name: "Adventure", movie: 12, tv: 10759 },
    { name: "Animation", movie: 16, tv: 16 },
    { name: "Comedy", movie: 35, tv: 35 },
    { name: "Crime", movie: 80, tv: 80 },
    { name: "Documentary", movie: 99, tv: 99 },
    { name: "Drama", movie: 18, tv: 18 },
    { name: "Family", movie: 10751, tv: 10751 },
    { name: "Fantasy", movie: 14, tv: 10765 },
    { name: "History", movie: 36, tv: null },
    { name: "Horror", movie: 27, tv: null },
    { name: "Music", movie: 10402, tv: null },
    { name: "Mystery", movie: 9648, tv: 9648 },
    { name: "Romance", movie: 10749, tv: null },
    { name: "Sci-Fi", movie: 878, tv: 10765 },
    { name: "Thriller", movie: 53, tv: null },
    { name: "War", movie: 10752, tv: 10768 },
    { name: "Western", movie: 37, tv: 37 },
];

const GenrePage = () => {
    const { genreName } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Modal States
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    const getMediaType = (item) => {
        if (item.media_type) return item.media_type;
        return item.title ? "movie" : "tv";
    };

    // Main Fetch Function
    const fetchGenreData = async (pageNum, isInitial = false) => {
        if (!genreName) return;

        isInitial ? setLoading(true) : setLoadingMore(true);

        try {
            const genreObj = GENRES.find(g => g.name.toLowerCase() === genreName.toLowerCase());
            if (genreObj) {
                // We target movies primarily based on your list IDs
                const genreId = genreObj.movie || genreObj.tv;

                // IMPORTANT: Ensure your apiTMDB.getDiscoveryByGenre accepts a second argument for 'page'
                const data = await apiTMDB.getDiscoveryByGenre(genreId, pageNum);

                if (data && data.length > 0) {
                    setItems(prev => isInitial ? data : [...prev, ...data]);
                    setHasMore(data.length === 20); // TMDB returns 20 per page
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Trigger on Genre Change
    useEffect(() => {
        setPage(1);
        fetchGenreData(1, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [genreName]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchGenreData(nextPage, false);
    };

    const handleWatchTrailer = async (e, item) => {
        e.stopPropagation();
        const mediaType = getMediaType(item);
        try {
            const data = mediaType === "movie"
                ? await apiTMDB.getSingleMovieData(item.id)
                : await apiTMDB.getSingleTvShowData(item.id);

            const trailer = data.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube");
            if (trailer) {
                setTrailerKey(trailer.key);
                setShowTrailer(true);
            } else {
                alert("Trailer not found.");
            }
        } catch (err) { console.log(err); }
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 flex justify-between items-end">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
                    >
                        {genreName}<span className="text-red-600">.</span>
                    </motion.h1>
                    <p className="text-slate-500 font-medium text-sm hidden md:block">
                        Showing {items.length} titles
                    </p>
                </header>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="aspect-[2/3] bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {items.map((item) => {
                                const mediaType = getMediaType(item);
                                return (
                                    <motion.div
                                        key={`${mediaType}-${item.id}-${Math.random()}`} // Random added to ensure unique keys during pagination
                                        whileHover={{ y: -10 }}
                                        className="group relative cursor-pointer"
                                        onClick={() => { setSelectedItem(item); setOpenDetails(true); }}
                                    >
                                        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                alt={item.title || item.name}
                                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:blur-[2px]"
                                            />


                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                <div className="bg-blue-600 p-3 rounded-full shadow-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    <BiSolidCameraMovie className="text-white text-2xl" />
                                                </div>
                                                <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* --- PAGINATION BUTTON --- */}
                        {hasMore && (
                            <div className="mt-20 flex justify-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className="group relative px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50"
                                >
                                    {loadingMore ? "Loading more titles..." : "Load More Content"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modals remain the same... */}
            {/* --- TRAILER MODAL & DETAIL MODALS LOGIC --- */}
            <AnimatePresence>
                {showTrailer && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm" onClick={() => setShowTrailer(false)}>
                        <div className="relative w-full max-w-5xl aspect-video" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setShowTrailer(false)} className="absolute -top-12 right-0 text-white text-4xl hover:text-red-500"><IoClose /></button>
                            <iframe className="w-full h-full rounded-2xl border border-white/10" src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} allowFullScreen></iframe>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {openDetails && selectedItem && (
                getMediaType(selectedItem) === "movie" ? (
                    <ModalDisplayMovieDetails inDisplay={openDetails} setopenDetails={setOpenDetails} Movie_id={selectedItem} />
                ) : (
                    <ModalDisplayTvShowsDetails inDisplay={openDetails} setopenDetails={setOpenDetails} Movie_id={selectedItem} />
                )
            )}
        </div>
    );
};

export default GenrePage;