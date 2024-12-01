import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Stint, StintDTO} from "./types";

/**
 * Returns a list of stints
 * @param {number | "latest"} sessionKey ID of the Session
 * @param {number} driverNumber the number of the driver
 * @returns {Stint[]} array of stints
 */
export const getStints = async (
  sessionKey?: number | "latest",
  driverNumber?: number,
  lapStart?: number
): Promise<Stint[]> => {
  const {data} = await f1Client.get<StintDTO[]>("/stints", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
      "lap_start>": lapStart,
    },
  });

  return toCamel(data.reverse()) as Stint[];
};
