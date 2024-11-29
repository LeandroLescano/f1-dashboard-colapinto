import React from "react";

import clsx from "clsx";
import {SegmentDisplayProps} from "./types";

export default function SegmentDisplay({
  segments,
  duration,
  isSelected = false,
}: SegmentDisplayProps) {
  return (
    <div className={clsx("flex flex-col text-center", {"gap-1": isSelected})}>
      <div className="flex flex-row gap-1 justify-center">
        {segments?.map((segment, index) => (
          <div
            key={`sector-${index}`}
            className={clsx("w-2 h-3 rounded-full bg-gray-500", {
              "bg-yellow-500": segment === 2048,
              "bg-green-500": segment === 2049,
              "bg-purple-500": segment === 2051,
              "w-3 h-5 rounded-md": isSelected,
            })}
            title={`Segment ${index + 1}: ${segment}`}
          />
        ))}
      </div>
      <div>{duration?.toFixed(3)}s</div>
    </div>
  );
}
