import { useState } from "react";
import { CiSearch, CiCircleRemove } from "react-icons/ci";
import { MdOutlineDoubleArrow } from "react-icons/md";
import SearchBar from "../../utils/components/SearchBar";
import { motion } from "framer-motion";
import Sidebar from "../sidebar/Sidebar";
import Hamburger from "hamburger-react";
import MenuList from "../../utils/utils/MenuList";
import { useLocation } from "react-router-dom";
const Header = () => {
  const [isShowBar, setShowBar] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const curentPage = useLocation();
  if (curentPage.pathname === "/siomaiadminpanel") return;
  else
    return (
      <div className="flex flex-col w-full justify-center items-center z-50">
        <div className="h-[60px] overflow-hidden top-0 bg-[#1D1F2B] backdrop-blur-[5px] bg-opacity-40 min-w-[80%] rounded-md items-center flex justify-between px-5">
          <div
            className={`${
              showSideBar ? "abosolute z-50" : ""
            } md:hidden block w-[20px]`}
          >
            <Hamburger
              label="Show menu"
              distance="md"
              toggled={showSideBar}
              toggle={setShowSideBar}
            />
          </div>
          <motion.div
            initial={{ x: -190 }}
            animate={{ x: 10 }}
            transition={{ duration: 1 }}
            className="text-[20px] flex items-center tracking-[6px]"
          >
            UPtoMovie
            <motion.div
              initial={{ rotate: 180 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="flex"
            >
              <MdOutlineDoubleArrow className="rotate-180 text-[30px] text-[#EE2B47]" />
            </motion.div>
          </motion.div>
          <div className="flex justify-between gap-10">
            <div className=" gap-10 justify-between md:flex hidden">
              <MenuList />
            </div>
            {!isShowBar ? (
              <CiSearch
                className="text-[25px] hover:text-blue-600 duration-300 cursor-pointer"
                onClick={() => setShowBar(!isShowBar)}
              />
            ) : (
              <CiCircleRemove
                className="text-[25px] hover:text-red-600 duration-300 cursor-pointer"
                onClick={() => setShowBar(!isShowBar)}
              />
            )}
          </div>
        </div>
        <SearchBar isShowBar={isShowBar} setShowBar={setShowBar} />
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      </div>
    );
};

export default Header;
