import React from "react";

import {Skeleton} from "@components/ui/skeleton";

import {SkeletonDriverDataProps} from "./types";

const SkeletonDisplaySegment = ({
  segmentQuantity,
}: {
  segmentQuantity: number;
}) => {
  return (
    <div className="flex flex-col text-center gap-1">
      <div className="flex flex-row gap-1 justify-center ">
        {[...Array(segmentQuantity)].map((_, index) => (
          <Skeleton
            key={`sector-${index}`}
            className="w-2 h-3 rounded-md bg-slate-400/50"
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Skeleton className="h-4 w-14 bg-slate-400/50" />
      </div>
    </div>
  );
};

const SkeletonDriverData = ({isLoading, children}: SkeletonDriverDataProps) => {
  if (!isLoading) return children;

  return (
    <div className="font-formula flex flex-col gap-4 p-4 rounded-none lg:rounded-s-lg h-fit text-white bg-f1-black-400">
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex items-start">
          <Skeleton
            style={{height: 80, width: 80}}
            className="bg-slate-400/50"
          />

          <div className="ml-4 gap-2 flex flex-col">
            <Skeleton className="h-7 w-64 bg-slate-400/50" />
            <div className="flex flex-row gap-2">
              <Skeleton
                style={{height: 25, width: 25}}
                className="bg-slate-400/50"
              />
              <Skeleton
                className=" bg-slate-400/50"
                style={{width: "3ch", height: 25}}
              />
            </div>
            <div></div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-8 w-14 bg-slate-400/50" />
          <Skeleton className="h-6 w-10 bg-slate-400/50" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24 bg-slate-400/50" />
          <div className="flex flex-row gap-2 items-center">
            <Skeleton className="h-6 w-8 bg-slate-400/50" />
            <Skeleton className="h-2 w-6 rounded-md bg-slate-400/50" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-12 bg-slate-400/50" />
          <Skeleton className="h-7 w-8 bg-slate-400/50" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-36 bg-slate-400/50" />
          <Skeleton className="h-7 w-28 bg-slate-400/50" />
        </div>
      </div>

      <div className="flex flex-row justify-around bg-f1-black-200 text-white rounded-md p-2">
        <SkeletonDisplaySegment segmentQuantity={9} />
        <SkeletonDisplaySegment segmentQuantity={7} />
        <SkeletonDisplaySegment segmentQuantity={7} />
      </div>

      <div className="flex flex-row justify-between mt-4 pt-4 border-t border-gray-700">
        <Skeleton className="h-7 w-36 bg-slate-400/50" />
        <div className="flex justify-between gap-2 lg:gap-4">
          <Skeleton className="h-7 w-12 bg-slate-400/50" />
          <Skeleton className="h-7 w-12 bg-slate-400/50" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDriverData;
