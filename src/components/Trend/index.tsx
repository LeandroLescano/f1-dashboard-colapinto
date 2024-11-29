import React from "react";
import clsx from "clsx";

import {TrendProps} from "./types";

export const Trend = ({direction: positionTrend}: TrendProps) => {
  if (positionTrend === "SAME") {
    return (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-gray-600"
        width={25}
        height={25}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M2 8a1 1 0 011-1h10a1 1 0 110 2H3a1 1 0 01-1-1z"
            className="fill-gray-600"
          ></path>{" "}
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      enableBackground="new 0 0 32 32"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 32 32"
      width={25}
      height={25}
      className={clsx("fill-green-400", {
        "fill-red-400 rotate-180": positionTrend === "DOWN",
      })}
    >
      <path d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z" />
    </svg>
  );
};
