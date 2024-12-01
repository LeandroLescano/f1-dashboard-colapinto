import {Lap} from "@services/laps/types";

export const mergeLaps = (recentLaps: Lap[], oldLaps: Lap[]) => {
  const mergedMap = new Map();

  oldLaps.forEach((lap) => {
    mergedMap.set(`${lap.lapNumber}-${lap.driverNumber}-${lap.dateStart}`, lap);
  });

  recentLaps.forEach((lap) => {
    mergedMap.set(`${lap.lapNumber}-${lap.driverNumber}-${lap.dateStart}`, lap);
  });

  return Array.from(mergedMap.values());
};
