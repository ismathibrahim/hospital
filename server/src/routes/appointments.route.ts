const router = require("express").Router();
import * as appointmentsController from "../controllers/appointments.controller";
import * as authController from "../controllers/auth.controller";
import { authorize } from "../controllers/auth.controller";

// Protect all routes after this middleware to logged in users
router.use(authorize);

router.post("/", appointmentsController.createAppointment);

router
  .route("/patient")
  .get(appointmentsController.getAllAppointmentsForPatient);

router
  .route("/:id")
  .put(appointmentsController.updateAppointment)
  .delete(appointmentsController.deleteAppointment);

export default router;
