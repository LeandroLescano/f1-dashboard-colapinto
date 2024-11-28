import {CamelizeKeys} from "@interfaces/generic";

export interface RaceControlDTO {
  category: string;
  date: Date;
  driver_number: number;
  flag: string;
  lap_number: number;
  meeting_key: number;
  message: string;
  scope: string;
  sector: null;
  session_key: number;
}

export type Flag =
  | "GREEN"
  | "YELLOW"
  | "BLUE"
  | "DOUBLE YELLOW"
  | "CHEQUERED"
  | "RED";

export type RaceControl = CamelizeKeys<RaceControlDTO>;
