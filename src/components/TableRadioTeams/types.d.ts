import {TeamRadio} from "@services/teamRadio/types";

export interface TableRadioTeamsProps {
  sessionKey?: number | "latest";
  maxHeight?: number;
}
export interface TeamRadioExtend extends TeamRadio {
  driver?: Driver;
}
