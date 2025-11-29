import { Client } from "pg";
import { IUserRepository } from "./user-repository-interface.js";
import { User } from "./user-entity.js";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MatchApp',
    password: 'postgres',
    port: 5432,
})

export class UserRepository implements IUserRepository{
    constructor() {
        client.connect();
    }

    async Add(user: User): Promise<number> {
        try{
            await client.query(
                'INSERT INTO Usuarios (Nombre, Email, FechaDeNacimiento, Descripcion, Telefono, Genero) VALUES ($1, $2, $3, $4, $5, $6)',
                [
                    user.name,
                    user.email,
                    user.dateBirth,
                    user.description ?? null,
                    user.phone ?? null,
                    user.gender ?? null
                ]);

            return 1;
        }
        catch (error: any) {
            if (error.code === '23505') {
                if (error.constraint === 'usuarios_nombre_key') {
                    return 2;
                } else if (error.constraint === 'usuarios_email_key') {
                    return 3;
                } else {
                    return 4;
                }
            } else {
                throw error;
            }
        }
    }

    async GetById(id: number): Promise<User | null> {
        const response = await client.query('SELECT * FROM Usuarios WHERE Id = $1', [id]);

        if (response.rows.length === 0) {
            return null;
        }

        return response.rows.map(row => new User(row.nombre, row.email, row.fechadenacimiento, row.descripcion, row.telefono, row.genero, row.id))[0];
    }

    async DeleteById(id: number): Promise<void> {
        await client.query('DELETE FROM Usuarios WHERE Id = $1', [id]);
    }

    async UpdateById(id: number, user: User): Promise<void> {
        await client.query(
        'UPDATE Usuarios SET Nombre = $1, Email = $2, FechaDeNacimiento = $3, Descripcion = $4, Telefono = $5, Genero = $6 WHERE Id = $7',
        [
            user.name,
            user.email,
            user.dateBirth,
            user.description ?? null,
            user.phone ?? null,
            user.gender ?? null,
            id
        ]);
    }

    async GetByName(name: string): Promise<User | null> {
        const response = await client.query('SELECT * FROM Usuarios WHERE Nombre = $1', [name]);

        if (response.rows.length === 0) {
            return null;
        }

        return response.rows.map(row => new User(row.nombre, row.email, row.fechadenacimiento, row.descripcion, row.telefono, row.genero, row.id))[0];
    }
}