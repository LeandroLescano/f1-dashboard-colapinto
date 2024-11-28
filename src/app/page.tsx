"use client";

import {useEffect, useState} from "react";

import Leaderboard from "@components/Leaderboard";
import {
  CurrentRace,
  LeaderboardData,
  LeaderboardDriver,
  PositionTrend,
} from "@interfaces/Leaderboard";
import {getDrivers} from "@services/drivers";
import {Driver} from "@services/drivers/types";
import {getLaps} from "@services/laps";
import {getMeetings} from "@services/meetings";
import {getSessions} from "@services/sessions";
import {getStints} from "@services/stints";
import {getPosition} from "@services/positions";
import {getRaceControls} from "@services/raceControl";

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>();
  const [drivers, setDrivers] = useState<Driver[]>([]);
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
    const [stints, positions, raceControls] = await Promise.all([
      getStints("latest", undefined, laps[0].lapNumber),
      getPosition("latest", undefined, laps[0].dateStart),
      getRaceControls("latest", laps[0].dateStart),
    ]);

    const lastDriverData: LeaderboardDriver[] = [];

    for (const driver of localDrivers) {
      const lastLap = laps.find(
        (lap) => lap.driverNumber === driver.driverNumber
      );
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
        const teamLogo = driver.teamName
          ? driver.teamName.replaceAll(" ", "").toLowerCase()
          : driver.nameAcronym === "COL"
          ? "williams"
          : "";
        lastDriverData.push({
          ...driver,
          ...lastLap,
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
        currentFlag: raceControls[0].flag,
        drivers: lastDriverData,
      });
    }
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    updateLeaderboard();
    // }, 5000); // 5000ms = 5 seconds //TODO: testing

    // // Cleanup the interval when the component unmounts
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      F1 Dashboard Colapinto
      {leaderboardData && <Leaderboard leaderboard={leaderboardData} />}
    </div>
  );
}
