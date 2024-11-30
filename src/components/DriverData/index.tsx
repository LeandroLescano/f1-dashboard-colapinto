import React from "react";
import moment from "moment";
import clsx from "clsx";

import {Trend} from "@components/Trend";
import SegmentDisplay from "@components/Leaderboard/components/Segments";
import CompoundPit from "@components/Leaderboard/components/CompoundPit";

import {DriverDataProps} from "./types";

export const DriverData = ({driver}: DriverDataProps) => {
  if (!driver) return null;

  return (
    <div
      className="font-formula flex flex-col gap-4 p-4 rounded-none lg:rounded-s-lg h-fit text-white"
      style={{backgroundColor: "#" + driver.teamColour + "90"}}
    >
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex items-start">
          <img
            src={driver.headshotUrl}
            alt={driver.fullName}
            width={80}
            height={80}
            className="rounded-xl aspect-square object-cover w-20 h-20 border-white border-2"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold">{driver?.fullName}</h2>
            <div className="flex flex-row gap-2">
              <img
                src={
                  driver?.logo
                    ? `/images/svg/manufacturers/${driver.logo}.svg`
                    : "/images/svg/f1.svg"
                }
                width={25}
                height={25}
                alt="F1 logo"
              />
              <p>{driver?.nameAcronym}</p>
            </div>
            <div></div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-4xl font-bold">{driver.driverNumber}</span>
          <p className="text-sm opacity-75">{driver.countryCode}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm opacity-75">Posición</p>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xl font-bold">{driver?.position}</p>
            <Trend direction={driver?.positionTrend || "SAME"} />
          </div>
        </div>
        <div>
          <p className="text-sm opacity-75">Vuelta</p>
          <p className="text-xl font-bold">{driver.currentLap}</p>
        </div>
        <div>
          <p className="text-sm opacity-75">Tiempo de vuelta</p>
          <p
            className={clsx("text-xl font-bold", {
              "text-violet-400": driver.hasBestLap,
            })}
          >
            {driver.lapDuration
              ? moment.utc(driver.lapDuration * 1000).format("m:ss.SSS")
              : "0:00.000"}
          </p>
        </div>
      </div>

      <div className="flex flex-row justify-around bg-f1-black-200 text-white rounded-md p-2">
        <SegmentDisplay
          segments={driver?.segmentsSector1 || []}
          duration={driver?.durationSector1 || 0}
        />
        <SegmentDisplay
          segments={driver?.segmentsSector2 || []}
          duration={driver?.durationSector2 || 0}
        />
        <SegmentDisplay
          segments={driver?.segmentsSector3 || []}
          duration={driver?.durationSector3 || 0}
        />
      </div>

      <div className="flex flex-row justify-between mt-4 pt-4 border-t border-gray-700">
        <CompoundPit driver={driver} className="text-white" />
        <div className="flex justify-between gap-2 lg:gap-4">
          <span className="text-sm opacity-75">Velocidad punta</span>
          <span className="font-bold">{driver.stSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};
