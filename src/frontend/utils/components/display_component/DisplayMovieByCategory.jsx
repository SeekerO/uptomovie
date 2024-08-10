import React from "react";
import MovieConfigPoster from "../../config/MovieConfigPoster";

const DisplayMovieByCategory = ({ meta_data, title, film }) => {
  return (
    <>
      <h1 className="text-[30px] font-bold md:px-0 px-5">{title}</h1>
      <div className="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(30dvh,1fr))] grid-cols-2 w-full mx-auto px-0.5 gap-y-2 gap-x-4 mt-5">
        {meta_data?.map((movie, index) => (
          <MovieConfigPoster
            movie={movie}
            key={index}
            displayPercentage={true}
            film={film}
          />
        ))}
      </div>
    </>
  );
};

export default DisplayMovieByCategory;
