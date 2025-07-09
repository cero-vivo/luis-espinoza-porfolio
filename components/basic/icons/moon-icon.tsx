import React, { FC } from "react";
import { SvgIconProps } from "./icons.types";

export const MoonIcon: FC<SvgIconProps> = ({ color, width = 24, height = 24, classes, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
    className={classes}
    onClick={onClick}
  >
    <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
  </svg>
); 