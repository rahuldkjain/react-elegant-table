import clsx from "clsx";
import React from "react";

import { isNumberInRange } from "../../utils";
import { TablePaginationProps } from "./types";

const TablePagination: React.FC<TablePaginationProps> = ({
  className = "",
  currentPage = 1,
  disabled = false,
  hasNextPage = false,
  onPageChange,
  totalPageCount,
}) => {
  const showPage = (index: number) => {
    if (totalPageCount) {
      return (
        index === 0 ||
        index === totalPageCount - 1 ||
        isNumberInRange(index, currentPage - 2, currentPage)
      );
    }
    return false;
  };

  const showDots = (index: number) => {
    if (totalPageCount) {
      if (
        isNumberInRange(index, currentPage - 3, currentPage + 1, [
          currentPage,
        ]) &&
        index > 0 &&
        index < totalPageCount - 1
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      className={clsx(
        "w-full flex justify-between px-6 py-3 border-t border-black-500/10",
        className
      )}
    >
      <button
        className={clsx(
          "px-4 border rounded h-10",
          currentPage === 1 || disabled
            ? "cursor-not-allowed border-black/30 text-black/30"
            : "border-black/70 cursor-pointer"
        )}
        disabled={currentPage === 1 || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {totalPageCount ? (
        <div className="flex items-center justify-center gap-1">
          {Array.from({ length: totalPageCount }, (_, index) => {
            if (showPage(index)) {
              return (
                <button
                  className={clsx(
                    "w-10 h-10 flex items-center justify-center rounded-sm text-black-500 disabled:cursor-not-allowed",
                    index + 1 === currentPage
                      ? "bg-white-300 font-bold"
                      : "bg-white-500 text-opacity-60",
                    !disabled && "hover:text-black-500"
                  )}
                  disabled={disabled}
                  key={`pagination-btn-${index}`}
                  onClick={() => {
                    onPageChange(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              );
            } else if (showDots(index)) {
              return (
                <div
                  className="text-black-500/50"
                  key={`pagination-btn-${index}`}
                >
                  ...
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : null}
      <button
        className={clsx(
          "px-4 border rounded h-10",
          !hasNextPage || disabled
            ? "cursor-not-allowed border-black/30 text-black/30"
            : "border-black/70 cursor-pointer"
        )}
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default React.memo(TablePagination);
