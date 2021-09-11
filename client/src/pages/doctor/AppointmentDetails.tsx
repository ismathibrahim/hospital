import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getAppointment } from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";

const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  let match = useRouteMatch<{ id: string }>();

  useEffect(() => {
    const fetchAPI = async () => {
      setAppointment(await getAppointment(Number(match.params.id)));
    };
    fetchAPI();
    // eslint-disable-next-line
  }, []);

  if (appointment === null) return <div>Loading...</div>;

  return (
    <div className="appointment-page">
      <div>{appointment.doctor.name}</div>
      <div>{appointment.patient.name}</div>
    </div>
  );
};

export default AppointmentDetails;
