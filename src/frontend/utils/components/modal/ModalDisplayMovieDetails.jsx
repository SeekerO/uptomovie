import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

// Components & Utils
import CarouselTrailers from "../CarouselTrailers";
import MovieConfigPoster from "../../config/MovieConfigPoster";
import { MovieImageURL } from "../../utils/url";
import { apiTMDB } from "../../api/api";
import LoadingScreen from "../loading/LoadingScreen";
import ProductionCompanies from "../ProductionCompanies";

// Icons
import { IoMdClose, IoMdFilm } from "react-icons/io";
import { FaSackDollar, FaCalendar, FaStar, FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function DisplayMovieDetails({ inDisplay, setopenDetails, Movie_id, film }) {
  const scrollRef = useRef(null);
  const [close, setClose] = useState(true);
  const [activeId, setActiveId] = useState(Movie_id?.id || null);
  const [MovieData, setselectedMovie] = useState(null);
  const imgURL = MovieImageURL();

  console.log(Movie_id)


  const navigate = useNavigate();

  // Safety & Sync
  useEffect(() => {
    if (Movie_id?.id) setActiveId(Movie_id.id);
  }, [Movie_id]);

  useEffect(() => {
    if (activeId) fetchDetails(activeId);
  }, [activeId]);

  const fetchDetails = async (id) => {
    setselectedMovie(null); // Trigger loader
    const response = film === undefined || film === "movie"
      ? await apiTMDB.getSingleMovieData(id)
      : await apiTMDB.getSingleTvShowData(id);
    setselectedMovie(response);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAnimation = () => {
    setClose(false);
    setTimeout(() => {
      setopenDetails(false);
      setClose(true);
    }, 500);
  };

  const formatCurrency = (num) => {
    if (!num) return "N/A";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(num);
  };


  const handleRedirectToCastProfile = (id) => {
    // Navigates without refreshing the page
    navigate(`/person/${id}`);

    // Optional: Scroll to top if the new page is long
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!inDisplay || !Movie_id) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-end z-[100]"
      >
        <motion.section
          ref={scrollRef}
          initial={{ x: "100%" }}
          animate={close ? { x: 0 } : { x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="h-full w-full max-w-5xl bg-[#0f1115] text-slate-100 overflow-y-auto border-l border-white/10 shadow-2xl"
        >
          {!MovieData ? (
            <LoadingScreen />
          ) : (
            <div className="relative">
              {/* --- HERO SECTION --- */}
              <div className="relative h-[55vh] w-full">
                <motion.div
                  key={activeId + "bg"}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <img
                    src={`${imgURL}${MovieData.backdrop_path}`}
                    className="w-full h-full object-cover opacity-60"
                    alt="backdrop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-transparent to-transparent" />
                </motion.div>

                <button
                  onClick={closeAnimation}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 border border-white/10"
                >
                  <IoMdClose size={28} />
                </button>
              </div>

              {/* --- MAIN CONTENT --- */}
              <div className="px-6 md:px-12 -mt-32 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8 items-end">
                  <motion.img
                    key={activeId + "post"}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    src={`${imgURL}${MovieData.poster_path}`}
                    className="w-64 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10"
                    alt="poster"
                  />
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 text-yellow-500 font-bold text-sm bg-yellow-500/10 w-fit px-3 py-1 rounded-full border border-yellow-500/20">
                      <FaStar /> {MovieData.vote_average?.toFixed(1)} / 10
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                      {MovieData.title || MovieData.name}
                    </h1>
                    <p className="text-blue-400 font-medium tracking-widest text-sm uppercase">
                      {MovieData.tagline || "Global Release"}
                    </p>
                  </div>
                </div>

                {/* --- DETAILS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                  {/* Left Col: Info */}
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">The Story</h2>
                      <p className="text-slate-300 text-lg leading-relaxed font-light">
                        {MovieData.overview}
                      </p>
                    </section>

                    {MovieData.videos?.results?.length > 0 && (
                      <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                          <FaCirclePlay /> Media Gallery
                        </h2>
                        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/40">
                          <CarouselTrailers data={MovieData.videos.results} />
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Right Col: Stats Card */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><FaSackDollar /> Budget</span>
                        <span className="font-semibold text-emerald-400">{formatCurrency(MovieData.budget)}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><FaCalendar /> Release</span>
                        <span className="font-semibold">{moment(MovieData.release_date).format("MMM YYYY")}</span>
                      </div>
                      <div className="space-y-3">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><IoMdFilm /> Genres</span>
                        <div className="flex flex-wrap gap-2">
                          {MovieData.genres.map((g) => (
                            <span key={g.id} className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded uppercase font-bold">
                              {g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                      <h2 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-4">Production</h2>
                      <div className="flex flex-wrap gap-4">
                        {MovieData.production_companies.slice(0, 3).map((comp, i) => (
                          <ProductionCompanies key={i} item={comp} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CAST SECTION --- */}
                <section className="mt-20">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 text-center">Top Billed Cast</h2>
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {MovieData.credits?.cast?.slice(0, 10).map((actor) => (
                      <div onClick={() => handleRedirectToCastProfile(actor.id)} key={actor.id} className="min-w-[130px] group text-center">
                        <div className="h-40 rounded-full overflow-hidden mb-3 ring-2 ring-white/5 group-hover:ring-blue-500/50 transition-all">
                          <img
                            src={`${imgURL}${actor.profile_path}`}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            alt={actor.name}
                            onError={(e) => e.target.src = "https://via.placeholder.com/150x225?text=No+Image"}
                          />
                        </div>
                        <p className="text-xs font-bold truncate">{actor.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- RECOMMENDATIONS (Dynamic Navigation) --- */}
                <section className="mt-20 pt-10 border-t border-white/5">
                  <h2 className="text-[20px] font-bold mb-8">Because you liked this</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {MovieData.recommendations?.slice(0, 10).map((recom, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveId(recom.id)}
                        className="cursor-pointer hover:scale-105 transition-transform duration-300"
                      >
                        <MovieConfigPoster movie={recom} displayPercentage={false} forViewOnly={true} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
}

export default DisplayMovieDetails;