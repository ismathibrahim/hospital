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
          {appointments ? appointments : "0"}
          Appointments
        </div>
        <div className="card dashboard-card">
          {doctors ? doctors : "0"} Doctors
        </div>
        <div className="card dashboard-card">
          {patients ? patients : "0"} Patients
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
