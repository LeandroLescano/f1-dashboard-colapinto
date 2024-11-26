import {Dispatch} from "react";

export interface DateRangeSelectorProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: Dispatch<React.SetStateAction<Date>>;
  onEndDateChange: Dispatch<React.SetStateAction<Date>>;
}
