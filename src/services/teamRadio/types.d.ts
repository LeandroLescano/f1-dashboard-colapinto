import {CamelizeKeys} from "@interfaces/generic";

export interface TeamRadioDTO {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: Date;
  recording_url: string;
}
export type TeamRadio = CamelizeKeys<TeamRadioDTO>;
