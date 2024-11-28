import moment from "moment";
import clsx from "clsx";

import {LeaderboardData} from "@interfaces/Leaderboard";

import SegmentDisplay from "./components/Segments";

export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: LeaderboardData;
}) {
  return (
    <div className="max-w-[1150px] font-formula">
      <div className="flex flex-col gap-4 text-white bg-f1-black-200 mx-auto p-1 rounded-xl">
        <div className="flex flex-col gap-1 bg-f1-black-300 rounded-lg border-2 border-f1-gray-300/50">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
            <div className="flex flex-row gap-1 items-center">
              <img
                src="/images/svg/f1.svg"
                width={100}
                height={100}
                alt="F1 logo"
              />
              <p className="text-4xl font-bold">{leaderboard.sessionName}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-2xl">{leaderboard.meetingName}</p>
              <p className="text-2xl">Vuelta {leaderboard.currentLap}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-8 gap-4 px-2 py-2 whitespace-nowrap border-y border-f1-gray-300 bg-gradient-to-t from-f1-gray-400 to-f1-black-400 text-center text-sm">
                <div>POS</div>
                <div>Conductor</div>
                <div>Tiempo de vuelta</div>
                <div>Sector 1</div>
                <div>Sector 2</div>
                <div>Sector 3</div>
                <div>Velocidad punta</div>
                <div>Compound / Pit</div>
              </div>
              <div className="flex flex-col">
                {leaderboard.drivers.map((driver, index) => (
                  <div
                    key={driver.driverNumber}
                    className="grid grid-cols-8 gap-4 items-center text-sm last:border-b-0"
                  >
                    <div className="text-center border-r border-f1-gray-300/20 py-3">
                      {index + 1}
                    </div>
                    <div
                      className="text-center flex flex-row gap-4
                    justify-between w-16 place-self-center"
                    >
                      <img
                        src={
                          driver.logo
                            ? `/images/svg/manufacturers/${driver.logo}.svg`
                            : "/images/svg/f1.svg"
                        }
                        width={25}
                        height={25}
                        alt="F1 logo"
                      />
                      <p>{driver.nameAcronym}</p>
                    </div>
                    <div className="text-center">
                      {driver.lapDuration
                        ? moment
                            .utc(driver.lapDuration * 1000)
                            .format("m:ss.SSS")
                        : "0:00.000"}
                    </div>
                    <SegmentDisplay
                      segments={driver.segmentsSector1}
                      duration={driver.durationSector1}
                    />
                    <SegmentDisplay
                      segments={driver.segmentsSector2}
                      duration={driver.durationSector2}
                    />
                    <SegmentDisplay
                      segments={driver.segmentsSector3}
                      duration={driver.durationSector3}
                    />
                    <div className="text-center">{driver.stSpeed} km/h</div>
                    <div className="justify-center flex flex-row gap-1">
                      <div className="flex flex-row gap-2">
                        <p
                          className={clsx("", {
                            "text-red-500":
                              driver.stints[0].compound === "SOFT",
                            "text-yellow-400":
                              driver.stints[0].compound === "MEDIUM",
                            "text-white": driver.stints[0].compound === "HARD",
                            "text-green-600":
                              driver.stints[0].compound === "INTERMEDIATE",
                            "text-blue-600":
                              driver.stints[0].compound === "WET",
                          })}
                        >
                          {driver.stints[0].compound.charAt(0)}
                        </p>
                        <p> -</p>
                        <p className="self-center">
                          {leaderboard.currentLap
                            ? leaderboard.currentLap - driver.stints[0].lapStart
                            : "0"}
                        </p>
                      </div>
                      <p className="text-f1-gray-300">|</p>
                      <p className="text-f1-gray-300">
                        PIT {driver.stints.length - 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
