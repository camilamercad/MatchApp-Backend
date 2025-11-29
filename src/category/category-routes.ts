import { Router } from "express";
import { CategoryRepository } from "./category-repository.js";
import { CategoryController } from "./category-controller.js";


export const categoryRouter = Router();
const categoryRepository = new CategoryRepository();

const categoryController = new CategoryController(categoryRepository);

categoryRouter.get("/", categoryController.GetAll);
categoryRouter.get("/:id", categoryController.GetById);