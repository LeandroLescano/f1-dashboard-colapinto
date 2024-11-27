"use client";
import React, {useEffect, useState} from "react";
import {TableRadioTeamsProps} from "./types";
import {TeamRadio} from "@services/teamRadio/types";
import {getRadioExchanges} from "@services/teamRadio";
import {getDrivers} from "@services/drivers";
import {Driver} from "@services/drivers/types";
import {getContrastColor} from "@utils/colors";
import AudioPlayer from "./components/AudioPlayer";

interface TeamRadioExtend extends TeamRadio {
  driver?: Driver;
}

const TableRadioTeams = ({sessionKey = "latest"}: TableRadioTeamsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [radioExchanges, setRadioExchanges] = useState<TeamRadioExtend[]>([]);

  const handlerFetchData = () => {
    let radiosExchangeAux: TeamRadio[] = [];
    let driversAux: Driver[] = [];

    getRadioExchanges(sessionKey).then((radios) => {
      radiosExchangeAux = radios;
    });
    getDrivers(sessionKey)
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handlerFetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {!isLoading &&
        radioExchanges?.map((radioExchange, i) => {
          const driverColor =
            radioExchange.driverNumber === 43
              ? "#64C4FF"
              : radioExchange.driverNumber === 30
              ? "#6692FF"
              : "#" + radioExchange.driver?.teamColour;
          return (
            <div className="flex felx-row gap-7" key={i}>
              <h4
                className="px-2 py-1  text-lg font-bold text-center w-[70px]"
                style={{
                  borderColor: driverColor,
                  color: driverColor,
                  backgroundColor: getContrastColor(driverColor),
                  borderWidth: "5px",
                  borderRadius: "20px",
                }}
              >
                {radioExchange.driver?.nameAcronym}
              </h4>

              <AudioPlayer src={radioExchange.recordingUrl} />

              {radioExchange.driver?.driverNumber}
            </div>
          );
        })}
    </div>
  );
};

export default TableRadioTeams;
