import React, { useLayoutEffect, useState } from "react";
import { apiTMDB } from "../../../../utils/api/api";
import { useParams } from "react-router-dom";
import { AsyncImage } from "loadable-image";
import { MovieImageURL } from "../../../../utils/utils/url";
import MovieConfigPoster from "../../../../utils/config/MovieConfigPoster";
import moment from "moment";
const PersonInfo = () => {
  const [personInfo, setPersonInfo] = useState([]);
  const refParam = useParams();
  const imgURL = MovieImageURL();

  useLayoutEffect(() => {
    const fetchSinglePersonData = async () => {
      const response = await apiTMDB.getPersonAllData(refParam.id);
      setPersonInfo(response);
    };
    fetchSinglePersonData();
  }, []);

  console.log(personInfo);
  return (
    <div className="pt-32 md:px-20 px-10  h-screen w-screen overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-5 h-full w-full">
        <div className="grid w-full md:w-1/3 gap-y-1 md:justify-start justify-center">
          <div className="w-full items-center flex flex-col">
            <AsyncImage
              src={imgURL + personInfo.profile_path || ""}
              loader={<div style={{ background: "#888" }} />}
              className="w-[150px] h-[225px] md:w-[200px] md:h-[300px] object-cover rounded-md border-[1px] bg-black border-slate-800 group-hover:opacity-50 duration-300 group-hover:scale-105"
            />
            <h1 className="text-[24px] md:text-[30px] font-bold">
              {personInfo.name}
            </h1>
          </div>
          <div className="text-center md:text-left mt-3 grid gap-y-1">
            <div className="flex justify-center md:justify-start gap-3">
              <label className="font-semibold">BirthDate:</label>
              <label>{moment(personInfo.birthday).format("LL")}</label>
            </div>
            <div className="flex justify-center md:justify-start gap-3">
              <label className="font-semibold">BirthPlace:</label>
              <label>{personInfo.place_of_birth}</label>
            </div>
            <div className="flex justify-center md:justify-start gap-3">
              <label className="font-semibold">Known for:</label>
              <label>{personInfo.known_for_department}</label>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <label className="font-semibold">Also known as:</label>
              <label className="flex flex-col">
                {personInfo.also_known_as &&
                personInfo.also_known_as.length > 0 ? (
                  personInfo.also_known_as.map((alias, index) => (
                    <em key={index}>{alias}</em>
                  ))
                ) : (
                  <p>No aliases available</p>
                )}
              </label>
            </div>
            <a
              href={personInfo.homepage}
              className="text-blue-600 hover:underline block mt-2 text-center md:text-left"
            >
              {personInfo.homepage}
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="w-full mb-4">
            <label className="text-[24px] md:text-[35px] font-semibold">
              Biography
            </label>
            <p className="pl-2 text-justify">{personInfo.biography}</p>
          </div>
          <div className="w-full ">
            <h1 className="text-[30px] font-bold md:px-0 px-5">Other Films</h1>
            <div className="relative mt-1 py-3">
              <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap gap-5">
                {personInfo?.credits?.cast?.map((movie, index) => (
                  <MovieConfigPoster
                    movie={movie}
                    key={index}
                    displayPercentage={true}
                  />
                ))}
              </div>

              {personInfo.credits?.cast.length > 4 && (
                <div className="absolute top-0 right-0 h-full w-12 pointer-events-none bg-gradient-to-l from-black/95 to-transparent"></div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[100px]" />
      </div>
    </div>
  );
};

export default PersonInfo;
