import { Categoria } from "./categoria";

export interface ICategoriaRepository {
    GetAll(): Promise<Categoria[]>;
    GetById(id: number): Promise<Categoria | null>;
}