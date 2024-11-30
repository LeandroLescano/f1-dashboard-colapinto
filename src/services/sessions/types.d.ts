import {CamelizeKeys} from "@interfaces/generic";

export interface SessionDTO {
  circuit_key: number;
  circuit_short_name: string;
  country_code: string;
  country_key: number;
  country_name: string;
  date_end: Date;
  date_start: Date;
  gmt_offset: string;
  location: string;
  meeting_key: number;
  session_key: number;
  session_name: string;
  session_type: SessionType;
  year: number;
}

export type Session = CamelizeKeys<SessionDTO>;

export type SessionType = "Practice" | "Qualifying" | "Race";
