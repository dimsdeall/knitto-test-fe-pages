import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import React from "react";
import { DOTS, usePagination } from "./usePaginate";
type Props = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (val: number) => void;
  siblingCount?: number;
};

function Paginate({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 1,
  onPageChange,
}: Props) {
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`pagination-container justify-content-end mt-3`}>
      <li
        className={`pagination-item  ${
          currentPage === 1 && "opacity-3 disabled"
        }`}
        onClick={onPrevious}
      >
        <FaAngleLeft />
      </li>
      {paginationRange.map((pageNumber: any, key: any) => {
        if (pageNumber === DOTS) {
          return (
            <li key={key} className=" dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={key}
            className={`pagination-item  ${
              pageNumber === currentPage && "selected"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item  ${
          currentPage === lastPage && "opacity-3 disabled"
        }`}
        onClick={onNext}
      >
        <FaAngleRight />
      </li>
    </ul>
  );
}

export default Paginate;
