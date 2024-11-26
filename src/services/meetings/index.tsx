import {f1Client} from "@services/axios";
import {toCamel} from "@utils/object";

import {Meeting, MeetingDTO} from "./types";

/**
 * Returns a list of meetings
 * @param {number | "latest"} meetingKey ID of the meeting
 * @param {number} year the year of the meetings
 * @returns {Meeting[]} array of meetings
 */
export const getMeetings = async (
  meetingKey?: number | "latest",
  year?: number
): Promise<Meeting[]> => {
  const {data} = await f1Client.get<MeetingDTO[]>("/meetings", {
    params: {
      meeting_key: meetingKey,
      year,
    },
  });

  return toCamel(data) as Meeting[];
};
