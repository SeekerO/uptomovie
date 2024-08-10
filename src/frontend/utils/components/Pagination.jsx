import React from "react";
import ReactPaginate from "react-paginate";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({ total_items, handlePageChange, activePageNumber }) => {
  return (
    <>
      <ReactPaginate
        initialPage={activePageNumber}
        previousLabel={<IoIosArrowBack />}
        nextLabel={<IoIosArrowForward />}
        breakLabel={"..."}
        pageCount={Math.ceil(total_items / 20)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={"flex space-x-2 items-center"}
        pageClassName={
          "px-3 py-1 cursor-pointer rounded border border-gray-300"
        }
        pageLinkClassName={"text-white"}
        previousClassName={
          "px-3 py-1 cursor-pointer rounded border border-gray-300 text-center justify-center"
        }
        previousLinkClassName={"text-white"}
        nextClassName={
          "px-3 py-1 cursor-pointer rounded border border-gray-300"
        }
        nextLinkClassName={"text-white"}
        breakClassName={
          "px-3 py-1 cursor-pointer rounded border border-gray-300"
        }
        breakLinkClassName={"text-white"}
        activeClassName={"bg-blue-950 text-white"}
        activeLinkClassName={"text-white"}
      />
    </>
  );
};

export default Pagination;
