import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Session, SessionDTO} from "./types";

/**
 * Returns a list of sessions
 * @param {number | "latest"} meetingKey ID of the meeting
 * @param {number | "latest"} sessionKey ID of the session
 * @returns {Session[]} array of sessions
 */
export const getSessions = async (
  meetingKey?: number | "latest",
  sessionKey?: number | "latest"
): Promise<Session[]> => {
  const {data} = await f1Client.get<SessionDTO[]>("/sessions", {
    params: {
      meeting_key: meetingKey,
      session_key: sessionKey,
    },
  });

  return toCamel(data.reverse()) as Session[];
};
