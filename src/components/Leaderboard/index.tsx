import {LeaderboardData} from "@interfaces/Leaderboard";

import SegmentDisplay from "./components/Segments";

export default function Leaderboard({
  leaderboard,
}: {
  leaderboard: LeaderboardData;
}) {
  return (
    <div className="max-w-[1100px] font-formula">
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
              {/* Pasar tipo de Session dinamica */}
              <p className="text-4xl font-bold">RACE</p>
            </div>
            <div className="flex flex-row gap-4">
              {/* TODO Pasar GP dinamico */}
              <p className="text-xl">Grand Prix Las Vegas</p>
              {/* TODO Pasar vueltas dinamicas */}
              <p className="text-xl">Vuelta 8 / 50</p>
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
                <div>Pit Stops</div>
              </div>
              <div className="flex flex-col">
                {leaderboard.drivers.map((driver, index) => (
                  <div
                    key={driver.driverNumber}
                    className="grid grid-cols-8 gap-4 items-center font-semibold text-sm last:border-b-0"
                  >
                    <div className="text-center border-r border-f1-gray-300/20 py-2">
                      {index + 1}
                    </div>
                    <div className="text-center flex flex-row gap-2 justify-center">
                      <img
                        src={
                          driver.logo
                            ? `/images/svg/manufacturers/${driver.logo}.svg`
                            : "/images/svg/f1.svg"
                        }
                        width={20}
                        height={20}
                        alt="F1 logo"
                      />
                      <p>{driver.nameAcronym}</p>
                    </div>
                    <div className="text-center">
                      {driver.lapDuration ? driver.lapDuration.toFixed(3) : "0"}
                      s
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
                    {/* TODO Pasar cantidad de pit stops */}
                    <div className="text-center">
                      {driver.isPitOutLap ? "Yes" : "No"}
                    </div>
                    {/* TODO Faltan agregar ruedas y cantidad de vueltas con cada rueda */}
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
