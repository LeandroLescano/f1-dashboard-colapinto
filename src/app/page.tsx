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
import {Lap} from "@services/laps/types";
import {CarData} from "@services/carsData/types";
import {Stint} from "@services/stints/types";
import {Position} from "@services/positions/types";
import {Session, SessionType} from "@services/sessions/types";

const TableRaceControls = dynamic(
  () => import("../components/TableRaceControls"),
  {ssr: false}
);
const DEFAULT_POSITION = 20;

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>();
  const [selectedDriver, setSelectedDriver] = useState(43);
  const [raceControls, setRaceControls] = useState<RaceControl[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const currentRace = useRef<CurrentRace>({});
  // const [ongoingLap, setOngoingLap] = useState(2); //TODO: testing
  const [fetchingData, setFetchingData] = useState(false);
  const leaderboardDataRef = useRef<LeaderboardData>();
  const driversRef = useRef<Driver[]>([]);
  const lapsRef = useRef<Lap[]>([]);

  const updateLeaderboard = async () => {
    let localDrivers = driversRef.current;
    let localRace = currentRace.current;
    // const localOngoingLap = ongoingLap; //TODO: testing
    // setOngoingLap(localOngoingLap + 1); //TODO: testing
    if (driversRef.current?.length === 0) {
      localDrivers = await getDrivers("latest");
      driversRef.current = localDrivers;
      setDrivers(localDrivers);
    }

    let ongoingRace = false;
    if (!localRace.meeting?.meetingName || !localRace.session?.sessionName) {
      const [meetings, sessions] = await Promise.all([
        getMeetings("latest"),
        getSessions("latest"),
      ]);
      localRace = {
        meeting: meetings[0],
        session: sessions[0],
      };

      currentRace.current = localRace;
      if (
        moment().isAfter(session.dateStart) &&
        moment().isBefore(session.dateEnd)
      ) {
        ongoingRace = true;
      }
    }

    if ((!ongoingRace && leaderboardDataRef.current?.drivers) || !session) {
      return; // No current race
    }

    const fromLap =
      lapsRef.current.length === 0 ? 0 : leaderboardDataRef.current?.currentLap;

    const [laps, stints, positions, raceControlsData, carsData] =
      await Promise.all([
        getLaps("latest", undefined, fromLap),
        getStints("latest", undefined),
        getPosition("latest", undefined, new Date()),
        getRaceControls("latest"),
        getCarsData("latest", undefined, new Date()),
      ]);

    lapsRef.current = [...laps, ...lapsRef.current];

    const lastDriverData: LeaderboardDriver[] = getDriversData(
      localRace.session,
      localDrivers,
      carsData,
      stints,
      positions
    );

    if (localRace) {
      leaderboardDataRef.current = {
        ...localRace,
        currentLap: lapsRef.current[0]?.lapNumber || 0,
        currentFlag: raceControlsData[0]?.flag || "GREEN",
        drivers: lastDriverData,
      };
      setLeaderboardData(leaderboardDataRef.current);
    }

    setRaceControls(raceControlsData);
  };

  const getDriversData = (
    session: Session,
    drivers: Driver[],
    carsData: CarData[],
    stints: Stint[],
    positions: Position[]
  ) => {
    const lastDriversData: LeaderboardDriver[] = [];

    for (let driver of drivers) {
      if (DRIVERS[driver.driverNumber]) {
        driver = {
          ...driver,
          ...DRIVERS[driver.driverNumber],
        };
      }

      const driverLaps = lapsRef.current.filter(
        (lap) => lap.driverNumber === driver.driverNumber
      );
      const lastLap = driverLaps[0];

      const carData = carsData.find(
        (car) => car.driverNumber === driver.driverNumber
      );

      const driverStints = stints.filter(
        (stint) => stint.driverNumber === driver.driverNumber
      );

      let currentPos = leaderboardDataRef.current?.drivers.find(
        (d) => d.driverNumber === driver.driverNumber
      )?.position;
      let posTrend: PositionTrend = "SAME";

      if (session.sessionType === "Race") {
        ({currentPos, posTrend} = getDriverPositionAndTrend(
          driver,
          positions,
          session.sessionType
        ));
      }

      const driverLapDuration = getDriverLapDuration(
        lastLap,
        driverLaps,
        session.sessionType
      );

      lastDriversData.push({
        ...driver,
        ...lastLap,
        ...carData,
        lapDuration: driverLapDuration,
        logo: driver.teamName?.replaceAll(" ", "").toLowerCase(),
        currentLap: lastLap?.lapNumber || 0,
        stints: driverStints,
        position: currentPos ?? DEFAULT_POSITION,
        positionTrend: posTrend,
      });
    }

    return sortDrivers(lastDriversData, session.sessionType);
  };

  const sortDrivers = (
    drivers: LeaderboardDriver[],
    sessionType: SessionType
  ) => {
    if (sessionType === "Race") {
      drivers.sort((a, b) => a.position - b.position);
    } else {
      drivers = drivers
        .sort((a, b) => {
          a.lapDuration ??= 0;
          b.lapDuration ??= 0;

          if (a.lapDuration === 0 && b.lapDuration === 0) return 0;
          if (a.lapDuration === 0) return 1;
          if (b.lapDuration === 0) return -1;

          return a.lapDuration - b.lapDuration;
        })
        .map((d, i) => {
          console.log(
            i + 1 < d.position ? "UP" : i + 1 > d.position ? "DOWN" : "SAME",
            i + 1,
            d.position
          );
          return {
            ...d,
            position: i + 1,
            positionTrend:
              i + 1 < d.position ? "UP" : i + 1 > d.position ? "DOWN" : "SAME",
          };
        });
    }

    return drivers;
  };

  const getDriverPositionAndTrend = (
    driver: Driver,
    positions: Position[],
    sessionType: SessionType
  ): {currentPos: number; posTrend: PositionTrend} => {
    const driverPositions = positions.filter(
      (position) => position.driverNumber === driver.driverNumber
    );
    // If session is Practice or Qualifying the position is based on the better lap duration
    let currentPos = DEFAULT_POSITION;

    if (sessionType === "Race") {
      currentPos = driverPositions[0]?.position ?? DEFAULT_POSITION;
    }

    const prevPos =
      leaderboardDataRef.current?.drivers.find(
        (d) => d.driverNumber === driver.driverNumber
      )?.position ?? currentPos;

    const posTrend =
      currentPos < prevPos ? "UP" : currentPos > prevPos ? "DOWN" : "SAME";

    return {currentPos, posTrend};
  };

  const getDriverLapDuration = (
    lastLap: Lap,
    driverLaps: Lap[],
    sessionType: SessionType
  ): number => {
    let lapDuration = lastLap?.lapDuration ?? 0;

    if (sessionType !== "Race") {
      for (const driverLap of driverLaps) {
        if (driverLap?.lapDuration > 0 && driverLap.lapDuration < lapDuration) {
          lapDuration = driverLap.lapDuration;
        }
      }
    }

    return lapDuration;
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    updateLeaderboard().then(() => {
      intervalId = setInterval(async () => {
        setFetchingData(true);
        await updateLeaderboard();
        setFetchingData(false);
      }, 10000); // 10000ms = 10 seconds
    });

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
          <TableRadioTeams
            className="w-full h-72 lg:h-full"
            drivers={drivers}
          />
        </div>
      </div>
      {fetchingData && (
        <p className="absolute left-[550px] top-7 text-white text-2xl font-formula">
          Loading...
        </p>
      )}
    </div>
  );
}
