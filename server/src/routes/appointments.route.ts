const router = require("express").Router();
import * as appointmentsController from "../controllers/appointments.controller";
import { authorize } from "../controllers/auth.controller";

// Protect all routes after this middleware to logged in users
// router.use(authorize);

router
  .route("/")
  .get(appointmentsController.getAllAppointmentsForPatient)
  .post(appointmentsController.createAppointment);

router
  .route("/:id")
  .put(appointmentsController.updateAppointment)
  .delete(appointmentsController.deleteAppointment);

export default router;
