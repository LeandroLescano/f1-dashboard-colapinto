import {CamelizeKeys} from "@interfaces/generic";

export interface LapsDTO {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  i1_speed: number;
  i2_speed: number;
  st_speed: number;
  date_start: null;
  lap_duration: null;
  is_pit_out_lap: boolean;
  duration_sector_1: null;
  duration_sector_2: number;
  duration_sector_3: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
  lap_number: number;
}

export type Laps = CamelizeKeys<LapsDTO>;
