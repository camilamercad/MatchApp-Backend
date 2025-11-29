import { ProjectListItemDto } from "./project-item-dto.js";
import { Project } from "./project-entity.js";

export interface IProjectRepository {
    Add(project: Project): Promise<void>;
    GetAll(title?: string, description?: string, username?: string, idCategory?: string, orderByDate?: string): Promise<ProjectListItemDto[]>
    GetById(id: number): Promise<Project | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, project: Project): Promise<void>;
}