import { Client } from "pg";
import { ICategoryRepository } from "./category-repository-interace";
import { Category } from "./category";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
})

export class CategoryRepository implements ICategoryRepository {
    constructor() {
        client.connect();
    }
    
    async GetAll(): Promise<Category[]> {
        var query = 'SELECT Id, Nombre FROM Categorias'

        const result = await client.query(query);

        return result.rows.map(row => ({
            id: row.id,
            name: row.nombre,
        } as Category));
    }

    async GetById(id: number): Promise<Category | null> {
        const response = await client.query('SELECT * FROM Categorias WHERE Id = $1', [id]);

        return response.rows.map(row => ({
            id: row.id,
            name: row.nombre,
        } as Category))[0] || null;
    }
}