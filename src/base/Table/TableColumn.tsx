import clsx from "clsx";
import React from "react";

const TableColumn = (props: React.HTMLProps<HTMLTableCellElement>) => {
  const { children, className, ...propsToFwd } = props;
  return (
    <th
      className={clsx("py-3 px-6 font-bold text-left h-11", className)}
      {...propsToFwd}
    >
      {children}
    </th>
  );
};

export default React.memo(TableColumn);
