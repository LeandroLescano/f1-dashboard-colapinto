import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {raceControl, raceControlDTO} from "./types";

/**
 * Returns a list of race control
 * @param {number | "latest"} sessionKey ID of the Session
 * @returns {raceControl[]} array of raceControl
 */
export const getRaceControls = async (
  sessionKey?: number | "latest"
): Promise<raceControl[]> => {
  const {data} = await f1Client.get<raceControlDTO[]>("/race_control", {
    params: {
      session_key: sessionKey,
    },
  });

  return toCamel(data.reverse()) as raceControl[];
};
