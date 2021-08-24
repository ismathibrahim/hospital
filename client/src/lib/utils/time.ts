import dayjs from "dayjs";

export const generateTimeSlots = () => {
  let startTime = dayjs().hour(8).minute(0);
  let endTime = dayjs().hour(15).minute(0);

  let timeSlots = [];

  while (startTime <= endTime) {
    timeSlots.push(startTime.format("HH:mm"));
    startTime = startTime.add(15, "minutes");
  }

  console.log("timeSlots ", timeSlots);
};
