import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routes/users.route";
import appointmentRouter from "./routes/appointments.route";
import patientsRouter from "./routes/patients.route";
import doctorsRouter from "./routes/doctors.route";
import adminRouter from "./routes/admin.route";
import specialtiesRouter from "./routes/specialties.route";

const app = express();

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);
app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/admin", adminRouter);
app.use("/specialties", specialtiesRouter);

export default app;
