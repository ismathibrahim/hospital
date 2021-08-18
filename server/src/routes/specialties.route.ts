const router = require("express").Router();
import * as specialtiesController from "../controllers/specialties.controller";
import { authorize } from "../controllers/auth.controller";

// Protect all routes after this middleware to logged in users
// router.use(authorize);

router
  .route("/")
  .get(specialtiesController.getAllSpecialties)
  .post(specialtiesController.createSpecialty);

router
  .route("/:id")
  .put(specialtiesController.updateSpecialty)
  .delete(specialtiesController.deleteSpecialty);

export default router;
