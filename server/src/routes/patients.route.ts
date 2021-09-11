const router = require("express").Router();
import * as patientsController from "../controllers/patients.controller";
import * as authController from "../controllers/auth.controller";

router.post("/register", patientsController.register);

router.post("/login", authController.login);

router.get("/count", patientsController.getNumberOfPatients);

export default router;
