import React from "react";
import { tailspin } from "ldrs";
tailspin.register();

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 h-full rounded-sm w-screen flex items-center justify-center z-50">
      <l-tailspin
   
        size="50"
        stroke="5"
        speed="0.9"
        color="#EE2B47"
        className="w-fit h-fit"
      ></l-tailspin>
    </div>
  );
};

export default LoadingScreen;
