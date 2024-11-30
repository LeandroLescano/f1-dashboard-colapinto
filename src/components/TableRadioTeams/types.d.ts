import {TeamRadio} from "@services/teamRadio/types";

export interface TableRadioTeamsProps {
  drivers: Driver[];
  sessionKey?: number | "latest";
  className?: string;
}
export interface TeamRadioExtend extends TeamRadio {
  driver?: Driver;
}
