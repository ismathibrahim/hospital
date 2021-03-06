const router = require("express").Router();
import * as doctorsController from "../controllers/doctors.controller";
import * as authController from "../controllers/auth.controller";

router.get("/", authController.authorize, doctorsController.getAllDoctors);

router.post("/register", doctorsController.register);

router.post("/login", authController.login);

router.get(
  "/verify-login",
  authController.authorize,
  authController.verifyLogin
);
router.get("/count", doctorsController.getNumberOfDoctors);

router.get("/:id", authController.authorize, doctorsController.getDoctor);

export default router;
