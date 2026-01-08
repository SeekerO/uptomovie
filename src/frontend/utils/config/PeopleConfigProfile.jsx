import React from "react";
import { Link } from "react-router-dom";
import { AsyncImage } from "loadable-image";
import { MovieImageURL } from "../utils/url";
import { IoPerson } from "react-icons/io5";

const PeopleConfigProfile = ({ people }) => {
  const imgURL = MovieImageURL();
  const profileImage = people.profile_path
    ? `${imgURL}${people.profile_path}`
    : null;

  return (
    <Link
      to={`/person/${people.id}`}
      className="group relative flex flex-col items-center transition-all duration-300"
    >
      {/* Image Container: 2:3 Aspect Ratio */}
      <div className="relative aspect-[2/3] w-36 md:w-44 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-cyan-500/50">

        {profileImage ? (
          <AsyncImage
            src={profileImage}
            alt={people.name}
            loader={<div className="w-full h-full animate-pulse bg-neutral-800" />}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-800 text-neutral-500">
            <IoPerson size={48} />
            <span className="mt-2 text-[10px] uppercase tracking-widest">No Image</span>
          </div>
        )}

        {/* Modern Hover Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0 flex flex-col items-center">
            <div className="mb-2 rounded-full bg-cyan-500 p-2 text-white shadow-xl">
              <IoPerson size={20} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              View Profile
            </span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-4 w-full px-2 text-center">
        <h3 className="truncate text-sm font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-cyan-400">
          {people.name}
        </h3>
        {people.known_for_department && (
          <p className="mt-0.5 text-[11px] font-medium text-neutral-500 uppercase tracking-tighter">
            {people.known_for_department}
          </p>
        )}
      </div>
    </Link>
  );
};

export default PeopleConfigProfile;