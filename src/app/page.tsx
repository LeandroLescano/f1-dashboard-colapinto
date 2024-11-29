"use client";

import {useEffect, useState} from "react";

import Leaderboard from "@components/Leaderboard";
import {
  CurrentRace,
  LeaderboardData,
  LeaderboardDriver,
  PositionTrend,
} from "@interfaces/Dashboard";
import {getDrivers} from "@services/drivers";
import {Driver} from "@services/drivers/types";
import {getLaps} from "@services/laps";
import {getMeetings} from "@services/meetings";
import {getSessions} from "@services/sessions";
import {getStints} from "@services/stints";
import {getPosition} from "@services/positions";
import {getRaceControls} from "@services/raceControl";
import {DRIVERS} from "@/constants/drivers";
import {DriverData} from "@components/DriverData";
// import {getCarsData} from "@services/carsData";
import TableRadioTeams from "@components/TableRadioTeams";
import TableRaceControls from "@components/TableRaceControls";
import {RaceControl} from "@services/raceControl/types";

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState(43);
  const [raceControls, setRaceControls] = useState<RaceControl[]>([]);
  const [currentRace, setCurrentRace] = useState<CurrentRace>({
    meetingName: "",
    sessionName: "",
    sessionDateStart: new Date(),
  });
  const [ongoingLap, setOngoingLap] = useState(2); //TODO: testing

  const updateLeaderboard = async () => {
    let localDrivers = drivers;
    let localRace = currentRace;
    const localOngoingLap = ongoingLap; //TODO: testing
    setOngoingLap(localOngoingLap + 1); //TODO: testing

    if (localDrivers.length === 0) {
      localDrivers = await getDrivers("latest");
      setDrivers(localDrivers);
    }
    if (!localRace.meetingName || !localRace.sessionName) {
      const meeting = await getMeetings("latest");
      const session = await getSessions("latest");
      localRace = {
        meetingName: meeting[0].meetingName,
        sessionName: session[0].sessionName,
        sessionDateStart: session[0].dateStart as Date,
      };
      setCurrentRace(localRace);
    }

    const laps = await getLaps("latest", undefined, ongoingLap);
    const [stints, positions, raceControlsData] = await Promise.all([
      getStints("latest", undefined, laps[0].lapNumber),
      getPosition("latest", undefined, laps[0].dateStart),
      getRaceControls("latest", laps[0].dateStart),
      // getCarsData("latest", undefined, laps[0].dateStart),
    ]);

    const lastDriverData: LeaderboardDriver[] = [];

    for (let driver of localDrivers) {
      if (DRIVERS[driver.driverNumber]) {
        driver = {
          ...driver,
          ...DRIVERS[driver.driverNumber],
        };
      }

      const lastLap = laps.find(
        (lap) => lap.driverNumber === driver.driverNumber
      );
      // const carData = carsData.find(
      //   (car) => car.driverNumber === driver.driverNumber
      // );
      const driverStints = stints.filter(
        (stint) => stint.driverNumber === driver.driverNumber
      );
      const driverPositions = positions.filter(
        (position) => position.driverNumber === driver.driverNumber
      );
      const currentPos = driverPositions[0]?.position ?? 0;
      const prevPos =
        leaderboardData?.drivers.find(
          (d) => d.driverNumber === driver.driverNumber
        )?.position ?? currentPos;
      const posTrend: PositionTrend =
        currentPos < prevPos ? "UP" : currentPos > prevPos ? "DOWN" : "SAME";

      if (lastLap) {
        const teamLogo = driver.teamName?.replaceAll(" ", "").toLowerCase();
        lastDriverData.push({
          ...driver,
          ...lastLap,
          // ...carData,
          logo: teamLogo,
          currentLap: lastLap?.lapNumber || 0,
          stints: driverStints,
          position: currentPos,
          positionTrend: posTrend,
        });
      }
    }

    lastDriverData.sort((a, b) => a.position - b.position);

    if (localRace) {
      setLeaderboardData({
        ...localRace,
        currentLap: laps[0].lapNumber,
        currentFlag: raceControlsData[0].flag,
        drivers: lastDriverData,
      });
    }
    setRaceControls(raceControlsData);
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    updateLeaderboard();
    // }, 5000); // 5000ms = 5 seconds //TODO: testing

    // // Cleanup the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row gap-2 flex-wrap-reverse 2xl:flex-wrap bg-f1-black-300 h-dvh min-h-0 overflow-y-auto lg:overflow-y-hidden">
      <button
        onClick={() => {
          updateLeaderboard();
        }}
        className="bg-red-400 p-3 rounded-lg absolute"
      >
        Update
      </button>
      {leaderboardData && (
        <Leaderboard
          leaderboard={leaderboardData}
          driverSelected={selectedDriver}
          onChangeDriverSelected={setSelectedDriver}
        />
      )}
      <div className="flex flex-col flex-1 min-h-0 h-auto lg:h-dvh">
        <DriverData
          driver={leaderboardData?.drivers.find(
            (driver) => driver.driverNumber === selectedDriver
          )}
        />
        <div className="flex flex-row flex-1 min-h-0 h-auto lg:h-100 flex-wrap lg:flex-nowrap">
          <TableRaceControls
            raceControls={raceControls ?? []}
            isLoading={!raceControls}
            className="w-full h-72 lg:h-full"
          />
          <TableRadioTeams className="w-full h-72 lg:h-full" />
        </div>
      </div>
    </div>
  );
}
