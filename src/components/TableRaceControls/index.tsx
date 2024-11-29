import React from "react";
import clsx from "clsx";
import moment from "moment";

import Flag from "@components/Flag";

import SkeletonTable from "./components/SkeletonTableRaceControls";
import {TableRaceControlsProps} from "./types";

const TableRaceControls = ({
  raceControls,
  className,
  isLoading,
}: TableRaceControlsProps) => {
  return (
    <SkeletonTable isLoading={isLoading} rowNumber={20} className={className}>
      <div className={clsx("w-fit overflow-y-auto", className)}>
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
    </SkeletonTable>
  );
};

export default TableRaceControls;
