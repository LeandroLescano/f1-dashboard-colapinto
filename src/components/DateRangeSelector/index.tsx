"use client";

import {useState} from "react";
import {Minus, Plus} from "lucide-react";
import moment from "moment";

import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {DateTimePicker} from "@/components/ui/dateTimePicker";

import {DateRangeSelectorProps} from "./types";

export function DateRangeSelector({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeSelectorProps) {
  const [interval, setInterval] = useState(10);

  const handleIntervalChange = (value: string) => {
    setInterval(parseInt(value, 10));
  };

  const handleStartChange = (date: Date | null) => {
    if (date) {
      onStartDateChange(date);
    }
  };

  const handleEndChange = (date: Date | null) => {
    if (date) {
      onEndDateChange(date);
    }
  };

  const incrementDate = (date: Date | null, increment: boolean): Date => {
    if (!date) return new Date();
    return increment
      ? moment(date).add(interval, "minutes").toDate()
      : moment(date).subtract(interval, "minutes").toDate();
  };

  return (
    <div className="flex flex-col space-y-4 w-fit bg-slate-200 p-1 rounded-lg">
      <div className="flex space-x-4">
        <DateTimePicker value={startDate} onChange={handleStartChange} />
        <DateTimePicker value={endDate} onChange={handleEndChange} />
      </div>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => onStartDateChange(incrementDate(startDate, false))}
          aria-label="Decrease start date"
        >
          <Minus className="mr-2 h-4 w-4" /> SD
        </Button>
        <Button
          onClick={() => onStartDateChange(incrementDate(startDate, true))}
          aria-label="Increase start date"
        >
          <Plus className="mr-2 h-4 w-4" /> SD
        </Button>
        <Select onValueChange={handleIntervalChange} defaultValue="10">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 minute</SelectItem>
            <SelectItem value="5">5 minutes</SelectItem>
            <SelectItem value="10">10 minutes</SelectItem>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => onEndDateChange(incrementDate(endDate, false))}
          aria-label="Decrease end date"
        >
          <Minus className="mr-2 h-4 w-4" /> ED
        </Button>
        <Button
          onClick={() => onEndDateChange(incrementDate(endDate, true))}
          aria-label="Increase end date"
        >
          <Plus className="mr-2 h-4 w-4" /> ED
        </Button>
      </div>
    </div>
  );
}
