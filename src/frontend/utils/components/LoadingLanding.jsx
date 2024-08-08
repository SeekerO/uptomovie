import React from "react";

const LoadingLanding = () => {
  const placeHolderItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full h-screen px-20  flex items-center animate-pulse bg-slate-600 py-72">
        <div className="w-full min-h-full max-h-max flex ">
          <div className="h-[300px] w-[250px] rounded-sm bg-slate-500" />
          <div className="px-5 h-full w-full gap-2 flex flex-col">
            <div className="text-[50px] font-bold text-white bg-slate-500 p- animate-pulse2" />

            <div className="w-[40%] text-[20px] text-white bg-slate-500 p-2 animate-pulse" />
            <div className="text-white bg-slate-500 p-2 animate-pulse" />

            <button className=" text-white bg-[#EE2B47] w-fit shrink-0 animate-pulse px-5 py-1 text-[25px] rounded-sm font-bold cursor-pointer hover:scale-110 duration-300 hover:shadow-lg hover:shadow-black"></button>
          </div>
        </div>
      </div>

      <div className="h-auto w-full bg-black px-20 pt-20 flex flex-col">
        <h1 className="text-[30px] font-bold w-60 bg-slate-500 animate-pulse h-10 rounded-md"></h1>
        <div className="w-full flex flex-wrap gap-y-2 gap-x-4 mt-5 justify-center ">
          {placeHolderItems.map((movie, index) => (
            <div key={movie} className="flex flex-col ">
              <div className="relative h-[250px] w-[200px] flex justify-end">
                <div
                  style={{ width: 200, height: 250 }}
                  className=" rounded-md border-[1px] border-slate-800 bg-slate-500 animate-pulse"
                />
                <div className="h-14 w-14 rounded-full shrink-0 bg-slate-800 absolute -mt-3 -mr-2" />
              </div>
              <p className="text-[14px] p-3 w-[170px] break-all font-semibold"></p>
            </div>
          ))}
        </div>{" "}
      </div>
      <div className="h-auto w-full bg-black px-20 pt-20 flex flex-col">
        <h1 className="text-[30px] font-bold w-60 bg-slate-500 animate-pulse h-10 rounded-md"></h1>
        <div className="w-full flex flex-wrap gap-y-2 gap-x-4 mt-5 justify-center ">
          {placeHolderItems.map((movie, index) => (
            <div key={movie} className="flex flex-col ">
              <div className="relative h-[250px] w-[200px] flex justify-end">
                <div
                  style={{ width: 200, height: 250 }}
                  className=" rounded-md border-[1px] border-slate-800 bg-slate-500 animate-pulse"
                />
                <div className="h-14 w-14 rounded-full shrink-0 bg-slate-800 absolute -mt-3 -mr-2" />
              </div>
              <p className="text-[14px] p-3 w-[170px] break-all font-semibold"></p>
            </div>
          ))}
        </div>{" "}
      </div>
      <div className="h-auto w-full bg-black px-20 pt-20 flex flex-col">
        <h1 className="text-[30px] font-bold w-60 bg-slate-500 animate-pulse h-10 rounded-md"></h1>
        <div className="w-full flex flex-wrap gap-y-2 gap-x-4 mt-5 justify-center ">
          {placeHolderItems.map((movie, index) => (
            <div key={movie} className="flex flex-col ">
              <div className="relative h-[250px] w-[200px] flex justify-end">
                <div
                  style={{ width: 200, height: 250 }}
                  className=" rounded-md border-[1px] border-slate-800 bg-slate-500 animate-pulse"
                />
                <div className="h-14 w-14 rounded-full shrink-0 bg-slate-800 absolute -mt-3 -mr-2" />
              </div>
              <p className="text-[14px] p-3 w-[170px] break-all font-semibold"></p>
            </div>
          ))}
        </div>{" "}
      </div>
    </div>
  );
};

export default LoadingLanding;
