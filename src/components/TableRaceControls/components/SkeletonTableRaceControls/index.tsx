import React from "react";
import clsx from "clsx";

import {Skeleton} from "@components/ui/skeleton";
import SkeletonFlag from "@components/Flag/SkeletonFlag";

import {SkeletonTableProps} from "./types";

const SkeletonTable = ({
  isLoading,
  children,
  rowNumber,
  className,
}: SkeletonTableProps) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className={clsx("w-fit overflow-y-scroll", className)}>
      {[...Array(rowNumber)].map((_, i) => {
        return (
          <div className="bg-f1-black-300 p-2 flex flex-col gap-1" key={i}>
            <div className="flex flex-row justify-start">
              <Skeleton className="h-5 w-24 bg-gray-500" />
            </div>
            <div className="flex flex-row justify-start gap-1">
              {i % 3 === 0 && i !== 0 && <SkeletonFlag color="bg-gray-500" />}
              <Skeleton
                className="h-5 bg-gray-500"
                style={{width: `${Math.random() * (47 - 13) + 13}ch`}}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonTable;
