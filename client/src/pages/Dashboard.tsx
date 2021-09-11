import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { Role } from "../lib/types/index";
import DoctorDashboard from "./doctor/DoctorDashboard";
import PatientDashboard from "./patient/PatientDashboard";
import AdminDashboard from "./admin/AdminDashboard";

const Dashboard = () => {
  const { user, loading, getCurrentUser } = useUserContext();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (loading) return <>Loading</>;
  if (user === null) return null;

  if (user?.role === Role.ADMIN) return <AdminDashboard />;
  if (user?.role === Role.DOCTOR) return <DoctorDashboard />;
  if (user?.role === Role.PATIENT) return <PatientDashboard />;
  return <div>You're not logged in</div>;
};

export default Dashboard;
