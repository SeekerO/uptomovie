import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Router from "../../routes/router";

const Main = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-y-auto text-[#F0EEE2] bg-black">
      <header className="w-full justify-center flex mt-2 fixed  z-10">
        <Header />
      </header>

      <main className="h-full w-full flex flex-col overflow-y-auto">
        <div className="h-screen bg-black">
          <Router />
        </div>
        <div className="">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Main;
