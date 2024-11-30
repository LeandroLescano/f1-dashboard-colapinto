import React from "react";

import {FlagProps} from "./types";

const flags = {
  GREEN: "/images/svg/flags/green-flag.svg",
  CLEAR: "/images/svg/flags/green-flag.svg",
  YELLOW: "/images/svg/flags/yellow-flag.svg",
  BLUE: "/images/svg/flags/blue-flag.svg",
  "DOUBLE YELLOW": "/images/svg/flags/double-yellow-flag.svg",
  CHEQUERED: "/images/svg/flags/chequered.svg",
  RED: "/images/svg/flags/red-flag.svg",
};
const Flag = ({type, width = 20, height = 20}: FlagProps) => {
  return (
    <img alt={type} src={flags[type]} style={{width: width, height: height}} />
  );
};

export default Flag;
