import React from "react";
import Carousel from "react-multi-carousel";
import { YoutubeVideoURL } from "../utils/url";
const CarouselTrailers = ({ data }) => {
  const oneData = data[0];
  const YTurl = YoutubeVideoURL();

  return (
    <iframe
      key={oneData.id}
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

{
  /**   const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


      <Carousel responsive={responsive} className="flex w-full">
      {data
        .filter((items) => items.official === true)
        .map((videos) => (

        ))}
    </Carousel>
*/
}
