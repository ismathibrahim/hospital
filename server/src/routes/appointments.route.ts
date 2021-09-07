const router = require("express").Router();
import * as appointmentsController from "../controllers/appointments.controller";
import { authorize } from "../controllers/auth.controller";

// Protect all routes after this middleware to logged in users
router.use(authorize);

router.post("/", appointmentsController.createAppointment);

router
  .route("/patient")
  .get(appointmentsController.getAllAppointmentsForPatient);

router
  .route("/doctor/:doctorId/:date")
  .get(appointmentsController.getAppointmentsForDoctorByDate);

router.route("/doctor").get(appointmentsController.getAllAppointmentsForDoctor);

router.route("/:id").get(appointmentsController.getAppointment);

router.route("/cancel/:id").get(appointmentsController.cancelAppointment);
router.route("/noshow/:id").get(appointmentsController.noShowAppointment);
router.route("/reschedule/:id").get(appointmentsController.noShowAppointment);

export default router;
