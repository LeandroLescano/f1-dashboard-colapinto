import {TeamRadio} from "@services/teamRadio/types";

export interface TableRadioTeamsProps {
  sessionKey?: number | "latest";
  className?: string;
}
export interface TeamRadioExtend extends TeamRadio {
  driver?: Driver;
}
