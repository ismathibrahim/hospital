import React from "react";

import "./TimeSlot.scss";
interface FreeSlotProps {
  time: string;
  showModal: ([string]: any) => any;
}

const FreeSlot = ({ time, showModal }: FreeSlotProps) => {
  return (
    <div className="free-slot" onClick={() => showModal(time)}>
      {time}
    </div>
  );
};

export default FreeSlot;
