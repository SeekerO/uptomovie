import React from "react";

import MovieConfigPoster from "../config/MovieConfigPoster";
const DisplayMovieByCategory = ({ meta_data, title }) => {
  return (
    <>
      <h1 className="text-[30px] font-bold">{title}</h1>
      <div className="w-full flex flex-wrap gap-y-2 gap-x-4 mt-5 justify-center ">
        {meta_data?.map((movie, index) => (
          <MovieConfigPoster
            movie={movie}
            key={index}
            displayPercentage={true}
          />
        ))}
      </div>
    </>
  );
};

export default DisplayMovieByCategory;
