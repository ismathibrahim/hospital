import React, { useEffect, useState } from "react";
import { getNumberOfAppointments } from "../../lib/api/appointments";
import { getNumberOfDoctors } from "../../lib/api/doctors";
import { getNumberOfPatients } from "../../lib/api/patients";

import "./AdminDashboard.scss";
const DashboardPage = () => {
  const [doctors, setDoctors] = useState<number | null>(null);
  const [patients, setPatients] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setDoctors(await getNumberOfDoctors());
    };

    const fetchPatients = async () => {
      setPatients(await getNumberOfPatients());
    };

    const fetchAppointments = async () => {
      setAppointments(await getNumberOfAppointments());
    };

    fetchAppointments();
    fetchDoctors();
    fetchPatients();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <div className="card dashboard-card">
          <strong>{appointments ? appointments : "0"}</strong> Appointments
        </div>
        <div className="card dashboard-card">
          <strong>{doctors ? doctors : "0"} </strong>Doctors
        </div>
        <div className="card dashboard-card">
          <strong>{patients ? patients : "0"} </strong>Patients
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
