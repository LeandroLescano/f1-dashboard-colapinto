import {Skeleton} from "@components/ui/skeleton";
import React from "react";
import {SkeletonLeaderboardProps} from "./types";

const SkeletonDisplaySegment = ({
  segmentQuantity,
}: {
  segmentQuantity: number;
}) => {
  return (
    <div className={"flex flex-col text-center gap-1"}>
      <div className="flex flex-row gap-1 justify-center ">
        {[...Array(segmentQuantity)].map((_, index) => (
          <Skeleton
            key={`sector-${index}`}
            className={"w-2 h-3 rounded-md bg-slate-400/50"}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Skeleton className="h-4 w-14 bg-slate-400/50" />
      </div>
    </div>
  );
};

const SkeletonLeaderboard = ({
  isLoading,
  children,
}: SkeletonLeaderboardProps) => {
  if (!isLoading) return children;

  return (
    <div className="max-w-full font-formula lg:max-w-[1250px]">
      <div className="flex flex-col gap-4 text-white bg-f1-black-200 mx-auto p-1 rounded-xl">
        <div className="flex flex-col gap-1 bg-f1-black-300 rounded-lg border-2 border-f1-gray-300/50">
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
            <div className="flex flex-row gap-1 items-center">
              <img
                src="/images/svg/f1.svg"
                width={100}
                height={100}
                alt="F1 logo"
              />
              <Skeleton className="ml-2 w-52 h-9 bg-slate-400/50" />
            </div>
            <div className="flex flex-row gap-4">
              <Skeleton className="ml-2 w-56 h-8 bg-slate-400/50" />
              <Skeleton className="ml-2 w-32 h-8 bg-slate-400/50" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              <div className="grid grid-cols-[100px,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 pr-2 py-2 whitespace-nowrap border-y border-f1-gray-300 bg-gradient-to-t from-f1-gray-400 to-f1-black-400 text-sm">
                <h5 className="text-center">POS</h5>
                <h5 className="text-center">Conductor</h5>
                <h5 className="text-center">Tiempo de vuelta</h5>
                <h5 className="text-center">Velocidad punta</h5>
                <h5 className="text-center">Sector 1</h5>
                <h5 className="text-center">Sector 2</h5>
                <h5 className="text-center">Sector 3</h5>
                <h5 className="text-center">Compound / Pit</h5>
              </div>
              <div className="flex flex-col">
                {[...Array(20)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      style={{height: "44px"}}
                      className={
                        "transition-all grid grid-cols-[100px,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-4 items-center text-sm last:border-b-0 "
                      }
                    >
                      <div className="text-center border-r border-f1-gray-300/20 py-3">
                        {index + 1}
                      </div>
                      <div
                        className="text-center flex flex-row
                justify-around w-full place-self-center items-center"
                      >
                        <div className="w-4 h-4 flex justify-center items-center">
                          <Skeleton className="h-1 w-2 rounded-md bg-slate-400/50" />
                        </div>
                        <Skeleton
                          style={{width: "25px", height: "25px"}}
                          className="rounded-sm bg-slate-400/50"
                        />
                        {/* driver Img  */}
                        <Skeleton className="w-11 h-4 bg-slate-400/50" />
                      </div>

                      <Skeleton className="h-4 bg-slate-400/50 w-full" />

                      {/* Top speed */}
                      <Skeleton className="h-4 bg-slate-400/50 w-full" />

                      <SkeletonDisplaySegment segmentQuantity={9} />
                      <SkeletonDisplaySegment segmentQuantity={7} />
                      <SkeletonDisplaySegment segmentQuantity={7} />

                      <div className="flex justify-between px-2">
                        <Skeleton className="h-5 w-12 bg-slate-400/50" />
                        <Skeleton className="h-5 w-2 bg-slate-400/50" />
                        <Skeleton className="h-5 w-12 bg-slate-400/50" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLeaderboard;
