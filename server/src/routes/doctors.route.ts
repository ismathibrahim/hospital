const router = require("express").Router();
import * as doctorsController from "../controllers/doctors.controller";
import * as authController from "../controllers/auth.controller";

router.get("/", authController.authorize, doctorsController.getAllDoctors);

router.post("/register", authController.validate, doctorsController.register);

router.post("/login", authController.validate, authController.login);

router.get(
  "/verify-login",
  authController.authorize,
  authController.verifyLogin
);

router.get("/:id", authController.authorize, doctorsController.getDoctor);

export default router;
