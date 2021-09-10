import React, { useEffect, useState } from "react";
import { Appointment } from "../../lib/types";

import { getAppointmentsForPatient } from "../../lib/api/appointments";
import AppointmentCard from "./Appointment";

const DashboardPage = () => {
  //State
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    const fetchAPI = async () => {
      //API Call
      setAppointments(await getAppointmentsForPatient());
    };
    fetchAPI();
  }, []);

  if (appointments === null) return <div>Loading...</div>;
  if (!appointments.length) return <div>No Appointments</div>;

  return (
    <div>
      <h1>Upcoming Appointments</h1>

      {appointments.map((item: Appointment) => (
        <AppointmentCard key={item.id} appointment={item}></AppointmentCard>
      ))}
    </div>
  );
};

export default DashboardPage;
