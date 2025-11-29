import { Router } from "express";
import { UserController } from "./user-controller.js";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.Add);
userRouter.get("/:Id", userController.GetById);
userRouter.delete("/:Id", userController.DeleteById);
userRouter.put("/:Id", userController.UpdateById);
userRouter.get("/name/:name", userController.GetByName);