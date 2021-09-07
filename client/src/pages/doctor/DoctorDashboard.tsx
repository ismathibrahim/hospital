import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";
import DoctorAppointments from "./DoctorAppointments";

const doctorLinks = [
  {
    name: "Dashboard",
    path: "",
    exact: true,
  },
  {
    name: "Appointments",
    path: "/appointments",
    exact: true,
  },
  {
    name: "Settings",
    path: "/settings",
    exact: true,
  },
];

const DoctorDashboard = () => {
  const { user } = useUserContext();
  let match = useRouteMatch();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  if (user === null) return null;

  return (
    <div className="dashboard">
      <Header userName={user?.doctorProfile?.name} links={doctorLinks} />
      <div className="container">
        <Switch>
          <Route path={`${match.path}/appointments`}>
            <DoctorAppointments />
          </Route>
          <Route exact path={match.path}>
            Doctor Dashboard
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default DoctorDashboard;
