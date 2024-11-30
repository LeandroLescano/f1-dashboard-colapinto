import {CarData} from "@services/carsData/types";
import {Driver} from "@services/drivers/types";
import {Lap} from "@services/laps/types";
import {Meeting} from "@services/meetings/types";
import {Flag} from "@services/raceControl/types";
import {Session} from "@services/sessions/types";
import {Stint} from "@services/stints/types";

export interface LeaderboardProps {
  onChangeDriverSelected?: (driverNumber: number) => void;
  leaderboard: LeaderboardData;
  driverSelected?: number;
}

export interface LeaderboardData extends CurrentRace {
  drivers: LeaderboardDriver[];
}

interface LeaderboardDriver extends Driver, Partial<Lap>, Partial<CarData> {
  logo: string;
  currentLap: number;
  stints: Stint[];
  position: number;
  positionTrend: PositionTrend;
}

export interface CurrentRace {
  session?: Session;
  meeting?: Meeting;
  totalLaps?: number;
  currentLap?: number;
  currentFlag?: Flag;
}

export type PositionTrend = "UP" | "DOWN" | "SAME";
