import React from "react";

import {SegmentDisplayProps} from "./types";

export default function SegmentDisplay({
  segments,
  duration,
}: SegmentDisplayProps) {
  return (
    <div className="flex flex-col gap-1 py-2 text-center">
      <div className="flex flex-row gap-1 justify-center">
        {segments.map((segment, index) => (
          <div
            key={`sector-${index}`}
            className={`w-2 h-3 rounded-full ${
              segment === 2048
                ? "bg-yellow-500"
                : segment === 2049
                ? "bg-green-500"
                : segment === 2051
                ? "bg-purple-500"
                : "bg-gray-500"
            }`}
            title={`Segment ${index + 1}: ${segment}`}
          />
        ))}
      </div>
      <div>{duration.toFixed(3)}s</div>
    </div>
  );
}
