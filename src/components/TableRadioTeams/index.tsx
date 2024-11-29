"use client";
import React, {useEffect, useState} from "react";
import moment from "moment";
import clsx from "clsx";

import {TeamRadio} from "@services/teamRadio/types";
import {getRadioExchanges} from "@services/teamRadio";
import {getDrivers} from "@services/drivers";
import {Driver} from "@services/drivers/types";

import {TableRadioTeamsProps, TeamRadioExtend} from "./types";
import AudioPlayer from "./components/AudioPlayer";
import SkeletonTable from "./components/SkeletonTable";

/**
 * @param {number | "latest"} sessionKey ID of the Session
 * @param {string} className additional classes
 */
const TableRadioTeams = ({
  sessionKey = "latest",
  className,
}: TableRadioTeamsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [radioExchanges, setRadioExchanges] = useState<TeamRadioExtend[]>([]);

  const handlerFetchData = async () => {
    let radiosExchangeAux: TeamRadio[] = [];
    let driversAux: Driver[] = [];

    await getRadioExchanges(sessionKey).then((radios) => {
      radiosExchangeAux = radios;
    });

    await getDrivers(sessionKey)
      .then((drivers) => {
        driversAux = drivers;
      })
      .then(() => {
        setRadioExchanges(() => {
          const radioExchangesExtend = radiosExchangeAux.map((radio) => {
            return {
              ...radio,
              driver: driversAux.find(
                (driver) => driver.driverNumber === radio.driverNumber
              ),
            };
          });
          return radioExchangesExtend;
        });
      });

    setIsLoading(false);
  };

  useEffect(() => {
    handlerFetchData();
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 pt-2 px-2 w-fit overflow-y-auto",
        className
      )}
    >
      <SkeletonTable rowQuantity={10} isLoading={isLoading}>
        {radioExchanges &&
          radioExchanges.map((radioExchange, i) => {
            const driverColor =
              radioExchange.driverNumber === 43
                ? "#64C4FF"
                : radioExchange.driverNumber === 30
                ? "#6692FF"
                : "#" + radioExchange.driver?.teamColour;
            return (
              <div
                key={i}
                className={clsx("flex flex-col pb-4 w-full", {
                  "border-b-2 border-gray-500/50":
                    i !== radioExchanges.length - 1,
                })}
              >
                <p className="font-bold text-lg text-gray-500">
                  {moment(String(radioExchange.date)).format("HH:mm:ss")}
                </p>
                <div className="flex flex-row gap-4 justify-start">
                  <div
                    className="text-white px-2 py-1 font-bold text-lg flex flex-row justify-center gap-2 items-center border-2 border-black/40 rounded-md"
                    style={{
                      minWidth: "120px",
                      backgroundColor: driverColor + "28",
                    }}
                  >
                    <h6 className=" flex-1 text-center">
                      {radioExchange.driver?.driverNumber}
                    </h6>
                    <div className="flex-1 flex justify-center">
                      <canvas
                        className="paralelogramo"
                        style={{backgroundColor: driverColor}}
                      />
                    </div>
                    <h6 className=" flex-1 min-w-10 text-center">
                      {radioExchange.driver?.nameAcronym}
                    </h6>
                  </div>
                  <AudioPlayer src={radioExchange.recordingUrl} />
                </div>
              </div>
            );
          })}
      </SkeletonTable>
    </div>
  );
};

export default TableRadioTeams;
