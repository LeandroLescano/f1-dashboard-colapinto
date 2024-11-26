import {CamelizeKeys} from "@interfaces/generic";

export interface CarDataDTO {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  date: Date;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  drs: number;
  brake: number;
}

export type CarData = CamelizeKeys<CarDataDTO>;
