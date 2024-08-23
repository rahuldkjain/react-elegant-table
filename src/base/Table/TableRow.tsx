import React from "react";

const Row = (props: React.HTMLProps<HTMLTableRowElement>) => {
  const { children, ...propsToFwd } = props;
  return <tr {...propsToFwd}>{children}</tr>;
};

export default React.memo(Row);
