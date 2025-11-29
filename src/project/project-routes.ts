import { Router } from "express";
import { ProjectController } from "./project-controller.js";
import { ProjectRepository } from "./project-repository.js";


export const projectRouter = Router();
const projectRepository = new ProjectRepository();

const projectController = new ProjectController(projectRepository);

projectRouter.post("/", projectController.Add);
projectRouter.get("/", projectController.GetAll);
projectRouter.get("/:Id", projectController.GetById);
projectRouter.delete("/:Id", projectController.DeleteById);
projectRouter.put("/:Id", projectController.UpdateById);