import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Driver, DriverDTO} from "./types";

/**
 * Returns a list of drivers
 * @param {number | "latest"} sessionKey ID of the meeting
 * @returns {Driver[]} array of drivers
 */
export const getDrivers = async (
  sessionKey?: number | "latest"
): Promise<Driver[]> => {
  const {data} = await f1Client.get<DriverDTO[]>("/drivers", {
    params: {
      session_key: sessionKey,
    },
  });

  return toCamel(data) as Driver[];
};
