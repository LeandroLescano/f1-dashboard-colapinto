import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {CarData, CarDataDTO} from "./types";

export const DRS_VALUES = {
  0: false,
  1: false,
  2: null,
  3: null,
  8: true,
  9: null,
  10: true,
  12: true,
  14: true,
};

/**
 * Returns a list of cars data
 * @param {number | "latest"} sessionKey ID of the session
 * @param {number} driverNumber number of the driver
 * @param {Date} date the start date for filtering data
 * @returns {CarData[]} array of cars data
 */
export const getCarsData = async (
  sessionKey?: number | "latest",
  driverNumber?: number,
  date?: Date
): Promise<CarData[]> => {
  const {data} = await f1Client.get<CarDataDTO[]>("/car_data", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
      "date<": date,
    },
  });

  return toCamel(data) as CarData[];
};
