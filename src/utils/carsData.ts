import {CarData} from "@services/carsData/types";

export const mergeCarsData = (
  recentCarsData: CarData[],
  oldCarsData: CarData[]
) => {
  const mergedMap = new Map();

  recentCarsData.forEach((carData) => {
    mergedMap.set(`${carData.date}-${carData.driverNumber}`, carData);
  });

  oldCarsData.forEach((carData) => {
    mergedMap.set(`${carData.date}-${carData.driverNumber}`, carData);
  });

  return Array.from(mergedMap.values());
};
