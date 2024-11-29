import {useEffect, useState} from "react";
import moment from "moment";
import clsx from "clsx";
import {useAutoAnimate} from "@formkit/auto-animate/react";

import {LeaderboardProps} from "@interfaces/Leaderboard";
import {Trend} from "@components/Trend";

import SegmentDisplay from "./components/Segments";
import CompoundPit from "./components/CompoundPit";

export default function Leaderboard({
  leaderboard,
  onChangeDriverSelected,
}: LeaderboardProps) {
  const [parent, enableAnimations] = useAutoAnimate({
    duration: 750,
  });

  const [driverSelected, setDriverSelected] = useState(43);

  useEffect(() => {
    enableAnimations(true);
  }, []);

  return (
    <div className="max-w-[1250px] font-formula">
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
            <div className="min-w-[1200px]">
              <div className="grid grid-cols-[100px,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 pr-2 py-2 whitespace-nowrap border-y border-f1-gray-300 bg-gradient-to-t from-f1-gray-400 to-f1-black-400 text-sm">
                <h5 className="text-center">POS</h5>
                <h5 className="text-center">Conductor</h5>
                <h5 className="text-center">Tiempo de vuelta</h5>
                <h5 className="text-center">Velocidad punta</h5>
                <h5 className="text-center">Sector 2</h5>
                <h5 className="text-center">Sector 3</h5>
                <h5 className="text-center">Sector 1</h5>
                <h5 className="text-center">Compound / Pit</h5>
              </div>
              <div className="flex flex-col" ref={parent}>
                {leaderboard.drivers.map((driver, index) => {
                  const driverColor =
                    driver.driverNumber === 43
                      ? "#64C4FF50"
                      : driver.driverNumber === 30
                      ? "#6692FF50"
                      : "#" + driver.teamColour + "50";

                  const isDriverSelected =
                    driver.driverNumber === driverSelected;

                  return (
                    <div
                      key={driver.driverNumber}
                      className={clsx(
                        "transition-all grid grid-cols-[100px,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 items-center text-sm last:border-b-0 cursor-pointer hover:bg-f1-gray-300/30",
                        {
                          "py-2 text-[17px]": isDriverSelected,
                        }
                      )}
                      style={{
                        backgroundColor: isDriverSelected ? driverColor : "",
                      }}
                      onClick={() => {
                        setDriverSelected(driver.driverNumber);
                        onChangeDriverSelected(driver.driverNumber);
                      }}
                    >
                      <div className="text-center border-r border-f1-gray-300/20 py-3">
                        {index + 1}
                      </div>
                      <div
                        className="text-center flex flex-row
                    justify-around w-full place-self-center items-center"
                      >
                        <Trend direction={driver.positionTrend} />
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
                        <p className="min-w-11 text-center">
                          {driver.nameAcronym}
                        </p>
                      </div>
                      <div className="text-center">
                        {driver.lapDuration
                          ? moment
                              .utc(driver.lapDuration * 1000)
                              .format("m:ss.SSS")
                          : "0:00.000"}
                      </div>
                      <div className="text-center">{driver.stSpeed} km/h</div>

                      <SegmentDisplay
                        isSelected={isDriverSelected}
                        segments={driver.segmentsSector1}
                        duration={driver.durationSector1}
                      />
                      <SegmentDisplay
                        isSelected={isDriverSelected}
                        segments={driver.segmentsSector2}
                        duration={driver.durationSector2}
                      />
                      <SegmentDisplay
                        isSelected={isDriverSelected}
                        segments={driver.segmentsSector3}
                        duration={driver.durationSector3}
                      />

                      <CompoundPit leaderboard={leaderboard} driver={driver} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
