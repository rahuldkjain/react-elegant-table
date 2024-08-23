import * as React from "react";
import { SvgIconProps } from "../../types";

interface Props extends SvgIconProps {
  strokeColor?: string;
}

const ArrowDown: React.FC<Props> = ({
  strokeColor = "#0D0D0D",
  ...restProps
}) => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M7.99998 3.33334V12.6667M7.99998 12.6667L12.6666 8.00001M7.99998 12.6667L3.33331 8.00001"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    />
  </svg>
);

export default ArrowDown;
