import React, { useEffect, useState } from "react";
import { generateTimeSlots, getDateString } from "../../lib/utils/time";
import { getAppointmentsForDoctorByDate } from "../../lib/api/appointments";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import Select from "react-select";
import "react-nice-dates/build/style.css";

interface RescheduleFormProps {
  doctorId: number | undefined;
  date: Date | undefined;
  onDateChange: ([string]: any) => any;
  onSlotChange: ([string]: any) => any;
}

interface BookedSlot {
  id: number;
  date: string;
  time: string;
}

type SelectOption = {
  value: any;
  label: any;
};
const RescheduleForm = ({
  doctorId,
  date,
  onDateChange,
  onSlotChange,
}: RescheduleFormProps) => {
  const allTimeSlots = generateTimeSlots();
  const [bookedSlots, setBookedSlots] = useState<string[] | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SelectOption[]>();

  useEffect(() => {
    const fetchAPI = async () => {
      if (date === undefined || doctorId === undefined) return;
      const appointments = await getAppointmentsForDoctorByDate(
        doctorId,
        getDateString(date)
      );
      const bookedSlots = await appointments.map(
        (item: BookedSlot) => item.time
      );
      setBookedSlots(bookedSlots);

      const temp: SelectOption[] = [];

      await allTimeSlots.forEach((item) => {
        if (!bookedSlots.includes(item)) {
          temp.push({ value: item, label: item });
        }
      });

      setAvailableSlots(temp);
    };
    fetchAPI();
    // eslint-disable-next-line
  }, [date]);

  if (bookedSlots === null) return <div>Loading...</div>;

  return (
    <div>
      Please select a date and time
      <DatePicker
        date={date}
        onDateChange={onDateChange}
        locale={enGB}
        minimumDate={new Date()}
      >
        {({ inputProps, focused }) => (
          <input
            className={"input" + (focused ? " -focused" : "")}
            {...inputProps}
          />
        )}
      </DatePicker>
      <Select options={availableSlots} onChange={onSlotChange} />
    </div>
  );
};

export default RescheduleForm;
