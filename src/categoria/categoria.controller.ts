import { CategoriaRepository } from "./categoria.repository";

export class CategoriaController{
    private repo : CategoriaRepository;
    
    constructor(repo: CategoriaRepository) {
        this.repo = repo;
     }

    async GetAll(): Promise<{ Id: number; Nombre: string }[]> {
        return await this.repo.GetAll();
    }
}