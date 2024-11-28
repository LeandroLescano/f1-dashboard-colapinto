import {CamelizeKeys} from "@interfaces/generic";

export interface StintDTO {
  meeting_key: number;
  session_key: number;
  stint_number: number;
  driver_number: number;
  lap_start: number;
  lap_end: number;
  compound: Compound;
  tyre_age_at_start: number;
}

export type Stint = CamelizeKeys<StintDTO>;
export type Compound = "SOFT" | "MEDIUM" | "HARD" | "INTERMEDIATE" | "WET";
