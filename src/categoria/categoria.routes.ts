import { Router } from "express";
import { CategoriaRepository } from "./categoria.repository.js";
import { CategoriaController } from "./categoria.controller.js";


export const proyectoRouter = Router();
const categoriaRepository = new CategoriaRepository();

const categoriaController = new CategoriaController(categoriaRepository);

proyectoRouter.get("/", categoriaController.GetAll);
