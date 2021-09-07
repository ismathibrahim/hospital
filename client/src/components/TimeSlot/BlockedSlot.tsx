import React from "react";

import "./TimeSlot.scss";
interface SlotProps {
  time: string;
}

const BlockedSlot = ({ time }: SlotProps) => {
  return <div className="blocked-slot">{time}</div>;
};

export default BlockedSlot;
