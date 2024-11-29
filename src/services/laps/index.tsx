import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Lap, LapDTO} from "./types";

/**
 * Returns a list of laps
 * @param {number | "latest"} sessionKey ID of the session
 * @param {number} driverNumber the number of the driver
 * @returns {Lap[]} array of laps
 */
export const getLaps = async (
  sessionKey?: number | "latest",
  driverNumber?: number,
  lapNumber?: number
): Promise<Lap[]> => {
  const {data} = await f1Client.get<LapDTO[]>("/laps", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
      "lap_number<": lapNumber,
    },
  });

  return toCamel(data.reverse()) as Lap[];
};
