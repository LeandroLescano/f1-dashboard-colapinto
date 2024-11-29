import {CarData} from "@services/carsData/types";
import {Driver} from "@services/drivers/types";
import {Lap} from "@services/laps/types";
import {Flag} from "@services/raceControl/types";
import {Stint} from "@services/stints/types";

export interface LeaderboardData extends CurrentRace {
  drivers: LeaderboardDriver[];
}

interface LeaderboardDriver extends Driver, Lap, CarData {
  logo: string;
  currentLap: number;
  stints: Stint[];
  position: number;
  positionTrend: PositionTrend;
}

export interface CurrentRace {
  meetingName: string;
  sessionName: string;
  sessionDateStart: Date;
  totalLaps?: number;
  currentLap?: number;
  currentFlag?: Flag;
}

export type PositionTrend = "UP" | "DOWN" | "SAME";
