import { Client } from "pg";
import { ICategoriaRepository } from "./categoria.repository.interace";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
})

export class CategoriaRepository implements ICategoriaRepository {
    constructor() {
        client.connect();
    }
    
    async GetAll(): Promise<{ Id: number; Nombre: string; }[]> {
        return await client.query('SELECT Id, Nombre FROM Categorias').then(response => response.rows);
    }
}