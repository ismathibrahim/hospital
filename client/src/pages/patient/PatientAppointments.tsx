import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { getAppointmentsForPatient } from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";

import "./PatientAppointments.scss";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  let match = useRouteMatch();
  useEffect(() => {
    const fetchAPI = async () => {
      setAppointments(await getAppointmentsForPatient());
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (appointments === null) return <div>Loading...</div>;
  if (!appointments.length) return <div>No Appointments</div>;
  return (
    <div>
      <h1>Patient Appointments</h1>
      {appointments.map((item: Appointment) => (
        <Link to={`${match.url}/${item.id}`}>
          <div className="row card" key={item.id}>
            <div className="primary-attribute">{item.doctor?.name}</div>
            <div>{dayjs(item.date).format("ddd, MMM DD")}</div>
            <div>{item.time}</div>
            <div>{item.reason}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PatientAppointments;
