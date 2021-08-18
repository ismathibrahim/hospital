const router = require("express").Router();
import * as authController from "../controllers/auth.controller";
import * as usersController from "../controllers/users.controller";

router.post("/register", authController.validate, authController.register);

router.post("/login", authController.validate, authController.login);

router.get("/verify-login", authController.authorize, authController.verifyLogin);

router.get("/current-user", authController.authorize, usersController.getCurrentUser);

router.get("/:id", authController.authorize, usersController.getUser);

export default router;
