const router = require("express").Router();
import * as adminController from "../controllers/admin.controller";
import * as authController from "../controllers/auth.controller";

router.post("/register", adminController.register);

router.post("/login", authController.login);

export default router;
