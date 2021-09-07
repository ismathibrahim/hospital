import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

import Landing from "./pages/Landing";
import PublicRoute from "./components/Auth/PublicRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import PatientRegister from "./pages/patient/PatientRegister";
import PatientLogin from "./pages/patient/PatientLogin";
import DoctorRegister from "./pages/doctor/DoctorRegister";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import AdminLogin from "./pages/admin/AdminLogin";

import "./styles/main.scss";

function App() {
  const { isAuthenticated, verifyLogin } = useUserContext();

  useEffect(() => {
    verifyLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Not found</div>}>
        <Switch>
          <PublicRoute path="/" isAuthenticated={isAuthenticated} exact>
            <Landing />
          </PublicRoute>

          <PublicRoute path="/patient/login" isAuthenticated={isAuthenticated}>
            <PatientLogin />
          </PublicRoute>
          <PublicRoute
            path="/patient/register"
            isAuthenticated={isAuthenticated}
          >
            <PatientRegister />
          </PublicRoute>

          <PublicRoute path="/doctor/login" isAuthenticated={isAuthenticated}>
            <DoctorLogin />
          </PublicRoute>
          <PublicRoute
            path="/doctor/register"
            isAuthenticated={isAuthenticated}
          >
            <DoctorRegister />
          </PublicRoute>

          <PublicRoute path="/admin/login" isAuthenticated={isAuthenticated}>
            <AdminLogin />
          </PublicRoute>

          <PrivateRoute path="/portal" isAuthenticated={isAuthenticated}>
            <Dashboard />
          </PrivateRoute>
          <Route path="*">
            <div>Not found</div>
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
