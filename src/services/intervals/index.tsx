import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Interval, IntervalDTO} from "./types";

/**
 * Returns a list of interval
 * @param {number | "latest"} sessionKey ID of the session
 * @param {number} driverNumber number of the driver
 * @param {Date} date the start date for filtering data
 * @returns {Interval[]} array of interval
 */
export const getIntervals = async (
  sessionKey?: number | "latest",
  driverNumber?: number,
  date?: Date
): Promise<Interval[]> => {
  const {data} = await f1Client.get<IntervalDTO[]>("/intervals", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
      "date>": date,
    },
  });

  return toCamel(data.reverse()) as Interval[];
};
