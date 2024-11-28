"use client";

import {useEffect, useState} from "react";

import Leaderboard from "@components/Leaderboard";
import {
  CurrentRace,
  LeaderboardData,
  LeaderboardDriver,
} from "@interfaces/Leaderboard";
import {getDrivers} from "@services/drivers";
import {Driver} from "@services/drivers/types";
import {getLaps} from "@services/laps";
import {getMeetings} from "@services/meetings";
import {getSessions} from "@services/sessions";
import {getStints} from "@services/stints";

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [currentRace, setCurrentRace] = useState<CurrentRace>({
    meetingName: "",
    sessionName: "",
    sessionDateStart: new Date(),
  });

  const updateLeaderboard = async () => {
    let localDrivers = drivers;
    let localRace = currentRace;

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

    const laps = await getLaps("latest");
    const stints = await getStints("latest");

    const lastDriverData: LeaderboardDriver[] = [];

    for (const driver of localDrivers) {
      const lastLap = laps.find(
        (lap) => lap.driverNumber === driver.driverNumber
      );
      const driverStints = stints.filter(
        (stint) => stint.driverNumber === driver.driverNumber
      );

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
        });
      }
    }

    if (localRace) {
      setLeaderboardData({
        ...localRace,
        drivers: lastDriverData,
      });
    }
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  return (
    <div>
      F1 Dashboard Colapinto
      {leaderboardData && <Leaderboard leaderboard={leaderboardData} />}
    </div>
  );
}
