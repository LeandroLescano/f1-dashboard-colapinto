import React from "react";
import clsx from "clsx";

import {CompoundPitProps} from "./types";

const CompoundPit = ({driver, leaderboard}: CompoundPitProps) => {
  return (
    <div className="flex flex-row gap-1 justify-around">
      <div className="flex flex-row justify-start">
        <p
          className={clsx("w-5 text-center", {
            "text-red-500": driver.stints[0].compound === "SOFT",
            "text-yellow-400": driver.stints[0].compound === "MEDIUM",
            "text-white": driver.stints[0].compound === "HARD",
            "text-green-600": driver.stints[0].compound === "INTERMEDIATE",
            "text-blue-600": driver.stints[0].compound === "WET",
          })}
        >
          {driver.stints[0].compound.charAt(0)}
        </p>
        <p className="pl-1">-</p>
        <p className="text-center w-7 ">
          {leaderboard.currentLap
            ? leaderboard.currentLap - driver.stints[0].lapStart
            : "0"}
        </p>
      </div>
      <p className="text-gray-500">|</p>
      <p className="text-gray-500">PIT {driver.stints.length - 1}</p>
    </div>
  );
};

export default CompoundPit;
