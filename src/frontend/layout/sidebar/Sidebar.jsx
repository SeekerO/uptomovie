import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MenuList from "../../utils/utils/MenuList";
const Sidebar = ({ setShowSideBar, showSideBar }) => {
  const refSideBar = useRef();
  const handleClickOutside = (event) => {
    if (refSideBar.current && !refSideBar.current.contains(event.target)) {
      setShowSideBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (!showSideBar) return null;
  return (
    <div className="h-screen  w-full inset-0 fixed left-0 flex justify-end">
      <motion.div
        initial={showSideBar && { width: "0%" }}
        animate={showSideBar ? { width: "60%" } : { width: "0%" }}
        transition={{}}
        ref={refSideBar}
        className="bg-[#1D1F2B] h-full flex flex-col items-center"
      >
        <h1 className="mt-5 font-semibold tracking-[5px]">MENU</h1>
        <div className="flex flex-col">
          <MenuList theme={"sideButton"} />
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
