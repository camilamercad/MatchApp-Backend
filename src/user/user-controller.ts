import { Request, Response } from "express";
import { RequestPart, validate } from "../validator/validator.js";
import { User } from "./user-entity.js";
import { UserRepository } from "./user-repository.js";
import { SchemaType } from "../validator/validator.schemaFactory.js";


const userRepository = new UserRepository();

export class UserController {
    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.user, RequestPart.body);
        
        const user = new User(input.name, input.email, input.dateBirth, input?.description, input?.phone, input?.gender);
        const result: number = await userRepository.Add(user);

        if(result === 2){
            return res.status(409).send("This name is already in use");
        }
        else if(result === 3){
            return res.status(409).send("This email is already in use");
        }
        else if(result === 4){
            return res.status(409).send("Duplicate error in Name or Email");
        }

        return res.status(201).send();
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);

        const user = await userRepository.GetById(id);

        if (!user) {
            return res.status(404).send("User not found");
        }
        return res.status(200).json(user);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);
        await userRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);
        const input = validate(req, res, SchemaType.user, RequestPart.body);

        const user = new User(input.name, input.email, input.dateBirth, input?.description, input?.phone, input?.gender);
        
        await userRepository.UpdateById(id, user);
        return res.status(204).send();
    }

    async GetByName(req: Request, res: Response): Promise<any> {
        const name = req.params.name as string;

        if(name == null){
            return res.status(400).send("The 'name' parameter is required");
        }

        const user = await userRepository.GetByName(name);

        if (!user) {
            return res.status(404).send("User not found");
        }
        
        return res.status(200).json({ user });
    }
}