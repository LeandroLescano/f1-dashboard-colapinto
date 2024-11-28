import {RaceControl} from "@services/raceControl/types";

export interface TableRaceControlsProps {
  raceControls: RaceControl[];
  className: string;
  isLoading: boolean;
}
