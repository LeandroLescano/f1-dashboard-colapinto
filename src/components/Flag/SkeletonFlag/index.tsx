import React from "react";
import clsx from "clsx";

import {Skeleton} from "@components/ui/skeleton";

import {SkeletonFlagProps} from "./types";

const SkeletonFlag = ({color}: SkeletonFlagProps) => {
  return (
    <div className={"relative"}>
      <Skeleton className={clsx("w-4 h-3 rounded-sm", color)} />
      <Skeleton className={clsx("w-1 h-3 absolute -bottom-0 left-0", color)} />
    </div>
  );
};

export default SkeletonFlag;
