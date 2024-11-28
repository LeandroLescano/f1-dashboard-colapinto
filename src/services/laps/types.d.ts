import {CamelizeKeys} from "@interfaces/generic";

export interface LapDTO {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  // i1_speed: number;
  // i2_speed: number;
  st_speed: number;
  date_start: Date;
  lap_duration: number;
  is_pit_out_lap: boolean;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
  lap_number: number;
}

export type Lap = CamelizeKeys<LapDTO>;
