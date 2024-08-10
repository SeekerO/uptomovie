import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AsyncImage } from "loadable-image";
import { MovieImageURL } from "../utils/url";
import { IoPerson } from "react-icons/io5";

const PeopleConfigProfile = ({ people }) => {
  const imgURL = MovieImageURL();
  return (
    <>
      <Link
        className="flex flex-col group text-center mt-4 justify-center items-center w-full"
        onClick={() => setopenDetails(true)}
      >
        <div className="relative md:h-[45dvh] md:w-[30dvh] h-[220px] w-[150px] flex justify-end  cursor-pointer ">
          <AsyncImage
            src={"" || imgURL + people.profile_path}
            loader={<div style={{ background: "#888" }} />}
            className="w-full h-full object-cover rounded-md border-[1px] bg-black  border-slate-800 group-hover:opacity-50  duration-300  group-hover:scale-105 "
          />

          <div className="absolute w-full h-full items-center  scale-105 z-0 justify-center hidden group-hover:flex flex-col ">
            <IoPerson className="text-[40px]" />
            View Profile
          </div>
        </div>
        <p className="text-[16px] md:w-[200px] w-[100px] font-semibold text-center mt-1 truncate overflow-hidden ">
          {people.name} {people.id}
        </p>
      </Link>
    </>
  );
};

export default PeopleConfigProfile;
