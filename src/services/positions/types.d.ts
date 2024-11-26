import {CamelizeKeys} from "@interfaces/generic";

export interface PositionDTO {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: Date;
  position: number;
}

export type Position = CamelizeKeys<PositionDTO>;
