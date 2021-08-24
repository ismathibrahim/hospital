import React, { useEffect, useState } from "react";

import { getAppointmentsForPatient } from "../../lib/api/appointments";
import { Appointment } from "../../lib/types";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

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
        <div>{item.id}</div>
      ))}
    </div>
  );
};

export default PatientAppointments;
