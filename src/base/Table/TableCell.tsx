import clsx from "clsx";
import React from "react";

const TableCell = (props: React.HTMLProps<HTMLTableCellElement>) => {
  const { children, className, ...propsToFwd } = props;
  return (
    <td
      className={clsx(
        "text-black-500 py-3 px-6 h-20 text-md font-medium",
        className
      )}
      {...propsToFwd}
    >
      {children}
    </td>
  );
};

export default React.memo(TableCell);
