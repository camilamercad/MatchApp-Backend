import { Client } from "pg";
import { ICategoriaRepository } from "./categoria.repository.interace";
import { Categoria } from "./categoria";

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
    
    async GetAll(): Promise<Categoria[]> {
        var query = 'SELECT Id, Nombre FROM Categorias'

        const result = await client.query(query);

        return result.rows.map(row => ({
            id: row.id,
            nombre: row.nombre,
        } as Categoria));
    }
}