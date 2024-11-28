import React, {useState} from "react";
import {TableRaceControlsProps} from "./types";
import moment from "moment";
import Flag from "./components/Flag";
import clsx from "clsx";

const TableRaceControls = ({
  raceControls,
  className,
}: TableRaceControlsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={clsx("w-fit overflow-y-scroll", className)}>
      {raceControls.map((raceControl, i) => {
        return (
          <div className="bg-f1-black-400 p-2 flex flex-col gap-1" key={i}>
            <div className="flex flex-row justify-start gap-5">
              <p className="text-sm font-semibold text-slate-400">
                LAP {raceControl.lapNumber}
                {" • " + moment(raceControl.date).format("HH:mm:ss")}
              </p>
            </div>
            <div className="flex flex-row justify-start gap-1">
              {raceControl.flag && <Flag type={raceControl.flag} />}
              <h5 className="text-white/70 text-sm">{raceControl.message}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRaceControls;
