import { Project } from "./project-entity.js";
import { ProjectRepository } from "./project-repository.js";
import { Request, Response } from 'express';
import { SchemaType } from '../validator/validator.schemaFactory.js'
import { validate, RequestPart } from '../validator/validator.js'

export class ProjectController {
    private projectRepository: ProjectRepository;

    constructor(projectRepository: ProjectRepository) 
    {
        this.projectRepository = projectRepository;
        this.Add = this.Add.bind(this);
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
        this.DeleteById = this.DeleteById.bind(this);
        this.UpdateById = this.UpdateById.bind(this);
    }

    async Add(req: Request, res: Response): Promise<any> {
        const input = validate(req, res, SchemaType.addProject, RequestPart.body);

        const project = new Project(input.title, input.description, input.idUser, input?.detailedDescription, undefined, input?.idCategory, input?.image);

        await this.projectRepository.Add(project);
        return res.status(201).send();
    }

    async GetAll(req: Request, res: Response): Promise<any> {
        const request = validate(req, res, SchemaType.filters, RequestPart.query);

        const projects = await this.projectRepository.GetAll(request?.title as string, request?.description as string, request?.username as string, request?.idCategory as string, request?.orderByDate as string);
        return res.status(200).json(projects);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);

        const project = await this.projectRepository.GetById(id);

        if (!project) {
            return res.status(404).send("Project not found");
        }
        return res.status(200).json(project);
    }

    async DeleteById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);
        await this.projectRepository.DeleteById(id);
        return res.status(204).send();
    }

    async UpdateById(req: Request, res: Response): Promise<any> {
        const id = parseInt(validate(req, res, SchemaType.id, RequestPart.params).Id);
        const input = validate(req, res, SchemaType.updateProject, RequestPart.body);

        const project = new Project(input.title, input.description, undefined, input?.detailedDescription, undefined, input?.idCategory, input?.image);
        
        await this.projectRepository.UpdateById(id, project);
        return res.status(204).send();
    }
}