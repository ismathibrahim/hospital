const router = require("express").Router();
import * as doctorsController from "../controllers/doctors.controller";
import * as authController from "../controllers/auth.controller";

router.post("/register", authController.validate, doctorsController.register);

router.post("/login", authController.validate, authController.login);

router.get(
  "/verify-login",
  authController.authorize,
  authController.verifyLogin
);

// router.get("/current-user", authController.authorize, usersController.getCurrentUser);

// router.get("/:id", authController.authorize, usersController.getUser);

export default router;
