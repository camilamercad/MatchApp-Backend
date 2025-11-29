import { Category } from "./category";
import { CategoryRepository } from "./category-repository";
import { Request, Response } from 'express';

export class CategoryController{
    private repo : CategoryRepository;
    
    constructor(repo: CategoryRepository) {
        this.repo = repo;
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
     }

    async GetAll(req: Request, res: Response): Promise<any> {
        const categories: Category[] = await this.repo.GetAll();
        return res.status(200).json(categories);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(req.params.id);
        const category = await this.repo.GetById(id);
        if (!category) {
            return res.status(404).send("Category not found");
        }
        return res.status(200).json(category);
    }
}