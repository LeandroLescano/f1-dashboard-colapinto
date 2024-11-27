import SegmentDisplay from "./components/Segments";

export default function Leaderboard() {
  const lap8 = [
    {
      meeting_key: 1250,
      session_key: 9644,
      driver_number: 63,
      i1_speed: 182,
      i2_speed: 208,
      st_speed: 319,
      date_start: "2024-11-24T06:43:24.463000+00:00",
      lap_duration: 97.724,
      is_pit_out_lap: false,
      duration_sector_1: 27.928,
      duration_sector_2: 32.843,
      duration_sector_3: 36.953,
      segments_sector_1: [null, 2048, 2048, 2048, 2048, 2048],
      segments_sector_2: [2048, 2048, 2048, 2048, 2048, 2048, 2048],
      segments_sector_3: [2048, 2048, 2048, 2048, 2048, 2048, 2049, 2049],
      lap_number: 25,
    },
  ];

  return (
    <div className="max-w-[1100px]">
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
              <p className="text-xl">8/50</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-8 gap-4 px-2 py-2 whitespace-nowrap border-y border-f1-gray-300 bg-gradient-to-t from-f1-gray-400 to-f1-black-400 text-center text-sm font-semibold">
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
                {lap8.map((lap, index) => (
                  <div
                    key={lap.driver_number}
                    className="grid grid-cols-8 gap-4 items-center font-semibold text-sm last:border-b-0"
                  >
                    <div className="text-center border-r border-f1-gray-300/20 py-2">
                      {index + 1}
                    </div>
                    <div className="text-center flex flex-row gap-2">
                      {/* TODO Pasar Logo dinamico */}
                      <img
                        src="/images/svg/manufacturers/mercedes.svg"
                        width={20}
                        height={20}
                        alt="F1 logo"
                      />
                      {/* TODO Pasar Conductor Dinamico */}
                      <p>HAM</p>
                    </div>
                    <div className="text-center">
                      {lap.lap_duration.toFixed(3)}s
                    </div>
                    <SegmentDisplay
                      segments={lap.segments_sector_1}
                      duration={lap.duration_sector_1}
                    />
                    <SegmentDisplay
                      segments={lap.segments_sector_2}
                      duration={lap.duration_sector_2}
                    />
                    <SegmentDisplay
                      segments={lap.segments_sector_3}
                      duration={lap.duration_sector_3}
                    />
                    <div className="text-center">{lap.st_speed} km/h</div>
                    {/* TODO Pasar cantidad de pit stops */}
                    <div className="text-center">
                      {lap.is_pit_out_lap ? "Yes" : "No"}
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
