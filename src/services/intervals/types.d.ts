import {CamelizeKeys} from "@interfaces/generic";

export interface IntervalDTO {
  date: Date;
  driver_number: number;
  gap_to_leader: number;
  interval: number;
  meeting_key: number;
  session_key: number;
}
export type Interval = CamelizeKeys<IntervalDTO>;
