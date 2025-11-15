import { Router } from "express";
import { CategoriaRepository } from "./categoria.repository.js";
import { CategoriaController } from "./categoria.controller.js";


export const categoriaRouter = Router();
const categoriaRepository = new CategoriaRepository();

const categoriaController = new CategoriaController(categoriaRepository);

categoriaRouter.get("/", categoriaController.GetAll.bind(categoriaController));