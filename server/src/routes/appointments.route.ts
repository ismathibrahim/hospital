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

router.route("/cancel/:id").put(appointmentsController.cancelAppointment);
router.route("/noshow/:id").put(appointmentsController.noShowAppointment);
router.route("/complete/:id").put(appointmentsController.completeAppointment);
router
  .route("/reschedule/:id")
  .put(appointmentsController.rescheduleAppointment);

router
  .route("/upcoming/patient")
  .get(appointmentsController.getUpcomingAppointmentsForPatient);
router
  .route("/upcoming/doctor")
  .get(appointmentsController.getUpcomingAppointmentsForDoctor);

router.route("/count").get(appointmentsController.getNumberOfAppointments);

router.route("/:id").get(appointmentsController.getAppointment);

export default router;
