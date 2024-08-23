import clsx from "clsx";
import React from "react";

const TableContainer = ({
  children,
  className,
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "w-full max-w-full h-fit border border-black-500/10 rounded bg-white-500 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TableContainer;
