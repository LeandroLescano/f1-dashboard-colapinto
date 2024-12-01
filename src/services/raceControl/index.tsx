import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {RaceControl, RaceControlDTO} from "./types";

/**
 * Returns a list of race control
 * @param {number | "latest"} sessionKey ID of the Session
 * @returns {RaceControl[]} array of raceControl
 */
export const getRaceControls = async (
  sessionKey?: number | "latest",
  date?: Date
): Promise<RaceControl[]> => {
  const {data} = await f1Client.get<RaceControlDTO[]>("/race_control", {
    params: {
      session_key: sessionKey,
      "date>": date,
    },
  });

  return toCamel(data.reverse()) as RaceControl[];
};
