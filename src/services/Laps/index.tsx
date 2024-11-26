import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Laps, LapsDTO} from "./types";

/**
 * Returns a list of laps
 * @param {number | "latest"} sessionKey ID of the session
 * @param {number} driverNumber the number of the driver
 * @returns {Laps[]} array of laps
 */
export const getLaps = async (
  sessionKey?: number | "latest",
  driverNumber?: number
): Promise<Laps[]> => {
  const {data} = await f1Client.get<LapsDTO[]>("/laps", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
    },
  });

  return toCamel(data) as Laps[];
};
