import * as React from "react";

import type { SvgIconProps } from "../../types";

interface Props extends SvgIconProps {
  fillColor?: string;
}

const Filter: React.FC<Props> = ({ fillColor = "#000000", ...restProps }) => (
  <svg
    fill="none"
    height={14}
    width={14}
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M.438 2.187H.5a1.742 1.742 0 0 0 3.375 0h8.813a.438.438 0 0 0 0-.875H3.874a1.742 1.742 0 0 0-3.375 0H.437a.437.437 0 1 0 0 .875ZM2.188.875a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75Zm10.5 4.812h-.063a1.742 1.742 0 0 0-3.375 0H.437a.437.437 0 1 0 0 .875H9.25a1.742 1.742 0 0 0 3.375 0h.063a.438.438 0 0 0 0-.875ZM10.938 7a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Zm1.75 3.062H8.25a1.742 1.742 0 0 0-3.375 0H.437a.438.438 0 0 0 0 .875h4.438a1.742 1.742 0 0 0 3.375 0h4.438a.438.438 0 0 0 0-.875Zm-6.126 1.313a.875.875 0 1 1 0-1.75.875.875 0 0 1 0 1.75Z"
      fill={fillColor}
    />
  </svg>
);

export default Filter;
