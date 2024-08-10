import React from "react";
import { motion } from "framer-motion";
import { MovieImageURL } from "../utils/url";

const ProductionCompanies = ({ item, index }) => {
  const imgURL = MovieImageURL();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={close ? { opacity: 1 } : { opacity: 0 }}
      transition={close ? { duration: 1, delay: index } : { duration: 0.4 }}
      key={item.id}
      className="flex flex-col"
    >
      {item.logo_path !== null ? (
        <img
          src={imgURL + item.logo_path}
          className="w-[100px] bg-white p-1 rounded-md "
        />
      ) : (
        <div className="min-w-[100px] max-w-[150px] bg-white text-black font-semibold p-1 rounded-md text-center">
          {item.name}
        </div>
      )}
    </motion.div>
  );
};

export default ProductionCompanies;
