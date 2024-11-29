"use client";

import {useEffect, useRef, useState} from "react";
import moment from "moment";
import dynamic from "next/dynamic";

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
import {getCarsData} from "@services/carsData";
import TableRadioTeams from "@components/TableRadioTeams";
import {RaceControl} from "@services/raceControl/types";
import SkeletonLeaderboard from "@components/Leaderboard/components/SkeletonLeaderboard";
import SkeletonDriverData from "@components/DriverData/SkeletonDriverData";
const TableRaceControls = dynamic(
  () => import("../components/TableRaceControls"),
  {ssr: false}
);

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
  // const [ongoingLap, setOngoingLap] = useState(2); //TODO: testing
  const [fetchingData, setFetchingData] = useState(false);
  const leaderboardDataRef = useRef<LeaderboardData>();
  const driversRef = useRef<Driver[]>([]);

  const updateLeaderboard = async () => {
    let localDrivers = drivers;
    let localRace = currentRace;
    // const localOngoingLap = ongoingLap; //TODO: testing
    // setOngoingLap(localOngoingLap + 1); //TODO: testing

    if (driversRef.current?.length === 0) {
      localDrivers = await getDrivers("latest");
      driversRef.current = localDrivers;
      setDrivers(localDrivers);
    }
    let ongoingRace = false;
    if (!localRace.meetingName || !localRace.sessionName) {
      const meeting = await getMeetings("latest");
      const session = await getSessions("latest");
      localRace = {
        meetingName: meeting[0].meetingName,
        sessionName: session[0].sessionName,
        sessionDateStart: session[0].dateStart as Date,
      };
      setCurrentRace(localRace);
      if (
        moment().isAfter(session[0].dateStart) &&
        moment().isBefore(session[0].dateEnd)
      ) {
        ongoingRace = true;
      }
      console.log(
        ongoingRace,
        session[0],
        meeting[0],
        leaderboardDataRef.current?.drivers
      );
    }
    if (!ongoingRace && leaderboardDataRef.current?.drivers) return; // No current race

    const [laps, stints, positions, raceControlsData, carsData] =
      await Promise.all([
        getLaps("latest", undefined, leaderboardDataRef.current?.currentLap),
        getStints("latest", undefined),
        getPosition("latest", undefined, new Date()),
        getRaceControls("latest"),
        getCarsData("latest", undefined, new Date()),
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
      const carData = carsData.find(
        (car) => car.driverNumber === driver.driverNumber
      );
      const driverStints = stints.filter(
        (stint) => stint.driverNumber === driver.driverNumber
      );
      const driverPositions = positions.filter(
        (position) => position.driverNumber === driver.driverNumber
      );
      const currentPos = driverPositions[0]?.position ?? 0;
      const prevPos =
        leaderboardDataRef.current?.drivers.find(
          (d) => d.driverNumber === driver.driverNumber
        )?.position ?? currentPos;
      const posTrend: PositionTrend =
        currentPos < prevPos ? "UP" : currentPos > prevPos ? "DOWN" : "SAME";

      if (lastLap && carData) {
        const teamLogo = driver.teamName?.replaceAll(" ", "").toLowerCase();
        lastDriverData.push({
          ...driver,
          ...lastLap,
          ...carData,
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
      leaderboardDataRef.current = {
        ...localRace,
        currentLap: laps[0]?.lapNumber || 0,
        currentFlag: raceControlsData[0].flag,
        drivers: lastDriverData,
      };
      setLeaderboardData(leaderboardDataRef.current);
    }
    setRaceControls(raceControlsData);
  };

  useEffect(() => {
    updateLeaderboard();

    const intervalId = setInterval(async () => {
      setFetchingData(true);
      await updateLeaderboard();
      setFetchingData(false);
    }, 10000); // 10000ms = 10 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-row gap-2 flex-wrap-reverse 2xl:flex-wrap bg-f1-black-300 h-dvh min-h-0 overflow-y-auto lg:overflow-y-hidden">
      {/* <button
        onClick={() => {
          updateLeaderboard();
        }}
        className="bg-red-400 p-3 rounded-lg absolute"
      >
        Update
      </button>*/}
      <button
        onClick={() => {
          if (leaderboardData) {
            setLeaderboardData(undefined);
          } else updateLeaderboard();
        }}
        className="bg-blue-400 p-3 rounded-lg absolute left-32"
      >
        loading
      </button>

      <SkeletonLeaderboard isLoading={leaderboardData === undefined}>
        {leaderboardData ? (
          <Leaderboard
            leaderboard={leaderboardData}
            driverSelected={selectedDriver}
            onChangeDriverSelected={setSelectedDriver}
          />
        ) : (
          <></>
        )}
      </SkeletonLeaderboard>

      <div className="flex flex-col flex-1 min-h-0 h-auto lg:h-dvh">
        <SkeletonDriverData isLoading={leaderboardData === undefined}>
          <DriverData
            driver={leaderboardData?.drivers.find(
              (driver) => driver.driverNumber === selectedDriver
            )}
          />
        </SkeletonDriverData>
        <div className="flex flex-row flex-1 min-h-0 h-auto lg:h-100 flex-wrap lg:flex-nowrap">
          <TableRaceControls
            raceControls={raceControls}
            isLoading={!raceControls.length}
            className="w-full h-72 lg:h-full"
          />
          <TableRadioTeams className="w-full h-72 lg:h-full" />
        </div>
      </div>
      {fetchingData && (
        <p className="absolute left-96 top-7 text-white text-2xl font-formula">
          Loading...
        </p>
      )}
    </div>
  );
}
