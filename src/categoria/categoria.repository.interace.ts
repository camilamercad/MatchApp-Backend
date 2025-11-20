import { Categoria } from "./categoria";

export interface ICategoriaRepository {
    GetAll(): Promise<Categoria[]>;
}