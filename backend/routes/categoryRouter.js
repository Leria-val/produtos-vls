import express from "express";
import categoryController from "../controllers/categoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { categorySchema } from "../validations/categoryValidation.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.getById);


categoryRouter.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validateMiddleware(categorySchema),
  categoryController.create,
);
categoryRouter.put("/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validateMiddleware(categorySchema), 
  categoryController.update);

categoryRouter.delete("/:id",
  authMiddleware,
  roleMiddleware("admin"), 
  categoryController.delete);

export default categoryRouter;
