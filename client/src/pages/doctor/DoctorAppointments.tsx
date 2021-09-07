import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

import { getAppointmentsForDoctor } from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";
import { getAge } from "../../lib/utils/time";

import "./DoctorAppointments.scss";
const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    const fetchAPI = async () => {
      setAppointments(await getAppointmentsForDoctor());
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (appointments === null) return <div>Loading...</div>;
  if (!appointments.length) return <div>No Appointments</div>;
  return (
    <div>
      <h1>Doctor Appointments</h1>
      {appointments.map((item: Appointment) => (
        <div className="row card" key={item.id}>
          <div className="primary-attribute">{item.patient?.name}</div>
          <div>{dayjs(item.date).format("ddd, MMM DD")}</div>
          <div>{item.time}</div>
          <div>{getAge(new Date(item.patient?.birthday))}</div>
          <div>{item.patient?.gender}</div>
          <div>{item.reason}</div>
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointments;
