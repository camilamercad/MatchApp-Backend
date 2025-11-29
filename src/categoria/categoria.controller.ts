import { Categoria } from "./categoria";
import { CategoriaRepository } from "./categoria.repository";
import { Request, Response } from 'express';

export class CategoriaController{
    private repo : CategoriaRepository;
    
    constructor(repo: CategoriaRepository) {
        this.repo = repo;
        this.GetAll = this.GetAll.bind(this);
        this.GetById = this.GetById.bind(this);
     }

    async GetAll(req: Request, res: Response): Promise<any> {
        const categorias: Categoria[] = await this.repo.GetAll();
        return res.status(200).json(categorias);
    }

    async GetById(req: Request, res: Response): Promise<any> {
        const id = parseInt(req.params.id);
        const categoria = await this.repo.GetById(id);
        if (!categoria) {
            return res.status(404).send("Categoria no encontrada");
        }
        return res.status(200).json(categoria);
    }
}