import dayjs from "dayjs";

export const generateTimeSlots = () => {
  let startTime = dayjs().hour(8).minute(0);
  let endTime = dayjs().hour(15).minute(0);

  let timeSlots = [];

  while (startTime <= endTime) {
    timeSlots.push(startTime.format("HH:mm"));
    startTime = startTime.add(15, "minutes");
  }

  return timeSlots;
};

export const getDateString = (date: Date) => {
  //If month/day is single digit value add perfix as 0
  function AddZero(obj: number) {
    let num = obj + "";

    if (num.length === 1) num = "0" + obj;
    return num;
  }

  var output = "";
  output += date.getFullYear();
  output += "-" + AddZero(date.getMonth() + 1);
  output += "-" + AddZero(date.getDate());

  return output;
};

export const getAge = (birthday: Date) => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const composeDateString = (year: string, month: string, day: string) => {
  return `${year}-${month}-${day}`;
};
