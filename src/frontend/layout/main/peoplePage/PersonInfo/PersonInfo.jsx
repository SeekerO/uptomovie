import React, { useLayoutEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsyncImage } from "loadable-image";
import moment from "moment";
import { FiChevronLeft, FiChevronRight, FiArrowLeft } from "react-icons/fi";

// Internal API/Utility imports (adjust paths if necessary)
import { apiTMDB } from "../../../../utils/api/api";
import { MovieImageURL } from "../../../../utils/utils/url";
import MovieConfigPoster from "../../../../utils/config/MovieConfigPoster";

const PersonInfo = () => {
  const [personInfo, setPersonInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const imgURL = MovieImageURL();
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    const fetchSinglePersonData = async () => {
      try {
        const response = await apiTMDB.getPersonAllData(id);
        setPersonInfo(response);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };
    fetchSinglePersonData();
    window.scrollTo(0, 0);
  }, [id]);

  // Netflix-style Scroll Logic
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!personInfo) {
    return (
      <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500/30">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-red-500 transition-all group"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
      </button>

      <div className="max-w-[1400px] mx-auto pt-32 pb-20 px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* SIDEBAR: Profile & Metadata */}
          <aside className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
            <div className="relative group self-center lg:self-start">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />
              <AsyncImage
                src={`${imgURL}${personInfo.profile_path}`}
                alt={personInfo.name}
                loader={<div className="w-64 h-96 bg-neutral-900 rounded-2xl animate-pulse" />}
                className="relative w-64 h-96 lg:w-80 lg:h-auto aspect-[2/3] object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>

            <div className="space-y-6 p-6 bg-neutral-900/30 rounded-3xl border border-white/5 backdrop-blur-xl">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-red-500 border-b border-white/10 pb-3">
                Personal Details
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                <InfoBlock label="Known For" value={personInfo.known_for_department} />
                <InfoBlock label="Birthday" value={personInfo.birthday ? moment(personInfo.birthday).format("LL") : "N/A"} />
                <InfoBlock label="Place of Birth" value={personInfo.place_of_birth} />

                {personInfo.also_known_as?.length > 0 && (
                  <div className="col-span-2 lg:col-span-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Aliases</p>
                    <div className="flex flex-wrap gap-2">
                      {personInfo.also_known_as.slice(0, 3).map((alias, i) => (
                        <span key={i} className="text-[11px] px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT: Bio & Slider */}
          <main className="flex-1 min-w-0">
            <header className="mb-10">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-tight">
                {personInfo.name}
              </h1>
              <div className="h-1 w-24 bg-red-500 rounded-full" />
            </header>

            <section className="mb-16">
              <h3 className="text-xl font-bold mb-4 text-gray-300 uppercase tracking-widest">Biography</h3>
              <p className="text-gray-400 leading-relaxed text-lg text-justify font-light max-w-4xl">
                {personInfo.biography || `Information about ${personInfo.name} is currently unavailable.`}
              </p>
            </section>

            {/* NETFLIX-STYLE SLIDER SECTION */}
            <section>
              <div className="flex items-end justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Known For</h3>
                <span className="text-xs font-mono text-red-500 bg-cyan-500/10 px-3 py-1 rounded-full uppercase">
                  {personInfo.credits?.cast?.length} Credits
                </span>
              </div>

              <div className="relative group/slider">
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-0 bottom-8 z-40 w-14 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-start"
                >
                  <div className="bg-white/10 p-2 rounded-full backdrop-blur-md ml-2 hover:bg-white/20 transition-colors">
                    <FiChevronLeft size={24} />
                  </div>
                </button>

                {/* The Track */}
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                >
                  {personInfo.credits?.cast
                    ?.sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 20)
                    .map((movie, index) => (
                      <div
                        key={index}
                        className="min-w-[160px] md:min-w-[200px] lg:min-w-[230px] snap-start transition-all duration-300 hover:scale-105"
                      >
                        <MovieConfigPoster movie={movie} displayPercentage={true} />
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-0 bottom-8 z-40 w-14 bg-gradient-to-l from-[#0a0a0a] to-transparent opacity-0 group-hover/slider:opacity-100 transition-opacity flex items-center justify-end"
                >
                  <div className="bg-white/10 p-2 rounded-full backdrop-blur-md mr-2 hover:bg-white/20 transition-colors">
                    <FiChevronRight size={24} />
                  </div>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

// Reusable Internal Component
const InfoBlock = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-sm md:text-base font-medium text-gray-200">{value || "Unknown"}</span>
  </div>
);

export default PersonInfo;