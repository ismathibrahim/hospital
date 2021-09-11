import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import Header from "../../components/Layout/Header";

import "../Dashboard.scss";
import Doctors from "./Doctors";
import NewDoctor from "./NewDoctor";
import DoctorPage from "./DoctorPage";
import AppointmentDetails from "./AppointmentDetails";
import DashboardPage from "./DashboardPage";

const adminLinks = [
  {
    name: "Dashboard",
    path: "",
    exact: true,
  },
  {
    name: "Doctors",
    path: "/doctors",
    exact: true,
  },
];

const AdminDashboard = () => {
  const { user } = useUserContext();
  let match = useRouteMatch();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  if (user === null) return null;

  return (
    <div className="dashboard">
      <Header userName={user?.adminProfile?.name} links={adminLinks} />
      <div className="container">
        <Switch>
          <Route path={`${match.path}/appointments/:id`}>
            <AppointmentDetails />
          </Route>
          <Route exact path={`${match.path}/doctors`}>
            <Doctors />
          </Route>
          <Route exact path={`${match.path}/new-doctor`}>
            <NewDoctor />
          </Route>
          <Route path={`${match.path}/doctors/:id`}>
            <DoctorPage />
          </Route>
          <Route exact path={match.path}>
            <DashboardPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminDashboard;
