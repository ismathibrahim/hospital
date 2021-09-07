import React, { useEffect, useState } from "react";
import { generateTimeSlots, getDateString } from "../../lib/utils/time";
import { getAppointmentsForDoctorByDate } from "../../lib/api/appointments";
import dayjs from "dayjs";

import "./Calendar.scss";
import FreeSlot from "../TimeSlot/FreeSlot";
import BlockedSlot from "../TimeSlot/BlockedSlot";
interface CalendarProps {
  doctorId: number;
  date: Date;
  showModal: ([string]: any) => any;
}

interface BookedSlot {
  id: number;
  date: string;
  time: string;
}
const Calendar = ({ doctorId, date, showModal }: CalendarProps) => {
  const allTimeSlots = generateTimeSlots();
  const [bookedSlots, setBookedSlots] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const appointments = await getAppointmentsForDoctorByDate(
        doctorId,
        getDateString(date)
      );
      const bookedSlots = await appointments.map(
        (item: BookedSlot) => item.time
      );
      setBookedSlots(bookedSlots);
    };
    fetchAPI();
    // eslint-disable-next-line
  }, [date]);

  if (bookedSlots === null) return <div>Loading...</div>;

  return (
    <div className="day">
      {allTimeSlots.map((item: string, idx: number) => {
        if (bookedSlots.includes(item)) {
          return <BlockedSlot key={idx} time={item} />;
        } else {
          return <FreeSlot key={idx} time={item} showModal={showModal} />;
        }
      })}
    </div>
  );
};

export default Calendar;
