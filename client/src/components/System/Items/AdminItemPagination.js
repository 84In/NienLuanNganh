import React, { memo, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const AdminItemPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  // hasNextPage,
  // hasPrevPage,
}) => {
  const [isNextPage, setIsNextPage] = useState(currentPage < totalPages - 1);
  const [isPrevPage, setIsPrePage] = useState(currentPage > 0);
  const maxPageButton = 5;
  const half = Math.floor(maxPageButton / 2);
  useEffect(() => {
    setIsNextPage(currentPage < totalPages - 1);
    setIsPrePage(currentPage > 0);
  }, [totalPages, currentPage]);
  let startPage = Math.max(0, currentPage - half);
  let endPage = Math.min(totalPages - 1, currentPage + half);

  // Ensure we have maxPageButton displayed when possible
  if (endPage - startPage < maxPageButton - 1) {
    if (startPage === 0) {
      endPage = Math.min(maxPageButton - 1, totalPages - 1);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - maxPageButton);
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {!(startPage === 0 && endPage === 0) && (
        <div className="pagination flex items-center gap-2 p-2">
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-full ${isPrevPage ? `text-primary-color hover:bg-blue-200` : `text-gray-500`}`}
            onClick={prevPage}
            disabled={!isPrevPage}
          >
            <IoIosArrowBack className={`h-5 w-5`} />
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={index}
              className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold ${startPage + index === currentPage ? `bg-blue-500 text-white` : `hover:bg-blue-200`}`}
              onClick={() => setCurrentPage(startPage + index)}
            >
              {startPage + index + 1}
            </button>
          ))}
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-full ${isNextPage ? `text-primary-color hover:bg-blue-200` : `text-gray-500`}`}
            onClick={nextPage}
            disabled={!isNextPage}
          >
            <IoIosArrowForward className={`h-5 w-5`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(AdminItemPagination);
