import { Category } from "./category";

export interface ICategoryRepository {
    GetAll(): Promise<Category[]>;
    GetById(id: number): Promise<Category | null>;
}