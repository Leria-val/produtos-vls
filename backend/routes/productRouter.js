import express from "express";
import productController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import validateMiddleware from "../middlewares/validateMiddleware.js";
import { productSchema } from "../validations/productValidation.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const productRouter = express.Router();
productRouter.use(authMiddleware)

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getById)
productRouter.post('/', authMiddleware, validateMiddleware(productSchema), productController.create)
productRouter.put('/:id', authMiddleware, roleMiddleware('admin'), productController.update)
productRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), productController.delete)

export default productRouter;