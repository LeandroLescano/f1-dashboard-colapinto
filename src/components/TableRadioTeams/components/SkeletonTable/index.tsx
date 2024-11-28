import React from "react";
import clsx from "clsx";

import {Skeleton} from "@/components/ui/skeleton";

import {SkeletonTableProps} from "./types";

const SkeletonTable = ({
  rowQuantity,
  children,
  isLoading,
}: SkeletonTableProps) => {
  return isLoading ? (
    <div className="flex flex-col gap-2">
      {Array(rowQuantity)
        .fill("")
        .map((_, index) => {
          return (
            <div
              key={index}
              className={clsx("flex flex-col pb-4 w-fit", {
                "border-b-2 border-gray-500/50": index !== rowQuantity - 1,
              })}
            >
              <Skeleton className="h-6 w-[90px] my-1" />
              <div className="flex flex-col" key={index}>
                <div className="flex flex-row gap-4 items-center">
                  <Skeleton className="h-8 w-[120px]" />
                  <div className="flex flex-row items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-3 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  ) : (
    children
  );
};

export default SkeletonTable;
