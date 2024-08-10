import React from "react";

const CarouselTrailers = ({ data }) => {
  const oneData = data[0];

  return (
    <iframe
      id={`iframe-${oneData.id}`}
      src={`https://www.youtube.com/embed/${oneData.key}`}
      title={`YouTube video player for ${oneData.key}`}
      className="w-full h-[50dvh]"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
};

export default CarouselTrailers;
