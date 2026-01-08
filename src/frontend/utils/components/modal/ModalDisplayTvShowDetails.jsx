import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

// Utils & Components
import { MovieImageURL } from "../../utils/url";
import { apiTMDB } from "../../api/api";
import MovieConfigPoster from "../../config/MovieConfigPoster";
import LoadingScreen from "../loading/LoadingScreen";
import CarouselTrailers from "../CarouselTrailers";
import PeopleConfigProfile from "../../config/PeopleConfigProfile";
import ProductionCompanies from "../ProductionCompanies";

// Icons
import { IoMdClose } from "react-icons/io";
import { FaCalendar, FaStar, FaCirclePlay, FaTv, FaLanguage } from "react-icons/fa6";
import { MdImageNotSupported } from "react-icons/md";

function ModalDisplayTvShowsDetails({ inDisplay, setopenDetails, Movie_id }) {
  const scrollRef = useRef(null);
  const [close, setClose] = useState(true);
  const [activeId, setActiveId] = useState(Movie_id?.id || null);
  const [tvShowData, settvShowData] = useState(null);
  const imgURL = MovieImageURL();

  // Sync and fetch logic
  useEffect(() => {
    if (Movie_id?.id) setActiveId(Movie_id.id);
  }, [Movie_id]);

  useEffect(() => {
    if (activeId) fetchTvDetails(activeId);
  }, [activeId]);

  const fetchTvDetails = async (id) => {
    settvShowData(null);
    const response = await apiTMDB.getSingleTvShowData(id);
    settvShowData(response);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeAnimation = () => {
    setClose(false);
    setTimeout(() => {
      setopenDetails(false);
      setClose(true);
    }, 500);
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
          {!tvShowData ? (
            <div className="h-full w-full flex items-center justify-center">
              <LoadingScreen />
            </div>
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
                    src={`${imgURL}${tvShowData.backdrop_path}`}
                    className="w-full h-full object-cover opacity-50"
                    alt="backdrop"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-transparent to-transparent" />
                </motion.div>

                <button
                  onClick={closeAnimation}
                  className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-white/20 backdrop-blur-md rounded-full transition-all z-50 border border-white/10 text-white"
                >
                  <IoMdClose size={28} />
                </button>
              </div>

              {/* --- MAIN CONTENT --- */}
              <div className="px-6 md:px-12 -mt-32 relative z-10 pb-20">
                <div className="flex flex-col md:flex-row gap-8 items-end">
                  <motion.div className="relative group">
                    <motion.img
                      key={activeId + "post"}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      src={`${imgURL}${tvShowData.poster_path}`}
                      className="w-64 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/10 cursor-pointer"
                      alt="poster"
                      onClick={() => window.open(tvShowData.homepage)}
                    />
                    {tvShowData.networks?.[0] && (
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <img src={imgURL + tvShowData.networks[0].logo_path} className="h-4 brightness-200 invert" alt="network" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Stream Now</span>
                      </div>
                    )}
                  </motion.div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 text-yellow-500 font-bold text-sm bg-yellow-500/10 w-fit px-3 py-1 rounded-full border border-yellow-500/20">
                      <FaStar /> {tvShowData.vote_average?.toFixed(1)} / 10
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white">
                      {tvShowData.name}
                    </h1>
                    <p className="text-blue-400 font-medium tracking-widest text-sm uppercase">
                      {tvShowData.type} • {moment(tvShowData.first_air_date).format("YYYY")}
                    </p>
                  </div>
                </div>

                {/* --- DETAILS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-12">
                    <section>
                      <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Storyline</h2>
                      <p className="text-slate-300 text-lg leading-relaxed font-light">
                        {tvShowData.overview || "No overview available."}
                      </p>
                    </section>

                    {/* Next Episode Spotlight */}
                    {tvShowData.next_episode_to_air && (
                      <section className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                        <h2 className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                          <FaTv /> Up Next
                        </h2>
                        <div className="flex gap-6 items-center">
                          <div className="text-4xl font-black text-white/20">S{tvShowData.next_episode_to_air.season_number}</div>
                          <div>
                            <p className="text-lg font-bold">Season {tvShowData.next_episode_to_air.season_number} Premiere</p>
                            <p className="text-slate-400 text-sm">Airing on {moment(tvShowData.next_episode_to_air.air_date).format("LL")}</p>
                          </div>
                        </div>
                      </section>
                    )}

                    {tvShowData.videos?.results?.length > 0 && (
                      <section>
                        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                          <FaCirclePlay /> Trailers & Clips
                        </h2>
                        <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/40">
                          <CarouselTrailers data={tvShowData.videos.results} />
                        </div>
                      </section>
                    )}
                  </div>

                  {/* Right Column (Stats) */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md space-y-6">
                      <div className="flex justify-between items-center border-b border-white/5 pb-4 text-white">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">Status</span>
                        <span className="font-semibold text-blue-400">{tvShowData.status}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/5 pb-4 text-white">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><FaLanguage /> Audio</span>
                        <span className="font-semibold">{tvShowData.spoken_languages?.[0]?.name || "N/A"}</span>
                      </div>
                      <div className="space-y-3">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Genres</span>
                        <div className="flex flex-wrap gap-2">
                          {tvShowData.genres.map((g) => (
                            <span key={g.id} className="text-[10px] bg-white/5 text-slate-300 border border-white/10 px-2 py-1 rounded uppercase font-bold">
                              {g.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-4">
                      <h2 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Keywords</h2>
                      <div className="flex flex-wrap gap-2">
                        {tvShowData.keywords?.results?.slice(0, 8).map((k) => (
                          <span key={k.id} className="text-[10px] text-slate-500 bg-slate-800/50 px-2 py-1 rounded">#{k.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- SEASONS SCROLLER --- */}
                <section className="mt-20">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-8">All Seasons</h2>
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {tvShowData.seasons.map((season) => (
                      <div key={season.id} className="min-w-[160px]">
                        <MovieConfigPoster
                          movie={season}
                          displayPercentage={false}
                          film="tv"
                          forViewOnly={true}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* --- CAST SECTION --- */}
                <section className="mt-20">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 text-center">Featured Cast</h2>
                  <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                    {tvShowData.credits?.cast?.slice(0, 10).map((actor) => (
                      <div key={actor.id} className="min-w-[130px] group text-center">
                        <div className="h-40 rounded-full overflow-hidden mb-3 ring-2 ring-white/5 group-hover:ring-blue-500/50 transition-all">
                          <img
                            src={`${imgURL}${actor.profile_path}`}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            alt={actor.name}
                            onError={(e) => e.target.src = "https://via.placeholder.com/150x225?text=No+Image"}
                          />
                        </div>
                        <p className="text-xs font-bold truncate text-white">{actor.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </section>


                {/* --- RECOMMENDATIONS (Dynamic Navigation) --- */}
                <section className="mt-20 pt-10 border-t border-white/5">
                  <h2 className="text-[20px] font-bold mb-8">Because you liked this</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {tvShowData.recommendations?.slice(0, 10).map((recom, index) => (
                      <div
                        key={index}
                        onClick={() => setActiveId(recom.id)}
                        className="cursor-pointer hover:scale-105 transition-transform duration-300"
                      >
                        <MovieConfigPoster movie={recom} displayPercentage={false} forViewOnly={true} film="tv" />
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

export default ModalDisplayTvShowsDetails;