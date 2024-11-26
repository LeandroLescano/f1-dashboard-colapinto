import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {TeamRadio, TeamRadioDTO} from "./types";

/**
 * Returns a list of radio exchanges
 * @param {number | "latest"} sessionKey ID of the Session
 * @param {number} driverNumber the number of the driver
 * @returns {TeamRadio[]} array of radio exchanges
 */
export const getRadioExchanges = async (
  sessionKey?: number | "latest",
  driverNumber?: number
): Promise<TeamRadio[]> => {
  const {data} = await f1Client.get<TeamRadioDTO[]>("/team_radio", {
    params: {
      session_key: sessionKey,
      driver_number: driverNumber,
    },
  });

  return toCamel(data) as TeamRadio[];
};
