import { Client } from "pg";
import { IProjectRepository } from "./project-repository-interface.js";
import { Project } from "./project-entity.js";
import { ProjectListItemDto } from "./project-item-dto.js";

export class ProjectRepository implements IProjectRepository {
  private client: Client;
  private readonly ownsClient: boolean;

  constructor(client?: Client) {
    this.ownsClient = !client;
    this.client =
      client ??
      new Client({
        user: "postgres",
        host: "localhost",
        database: "MatchApp",
        password: "postgres",
        port: 5432,
      });

    if (this.ownsClient) {
      void this.client.connect();
    }
  }

    public async Add(proyecto: Project): Promise<void> {
        await this.client.query(
        'INSERT INTO Proyecto (Titulo, Descripcion, IdUsuario, DescripcionDetallada, IdCategoria, Imagen) VALUES ($1, $2, $3, $4, $5, $6)',
        [
            proyecto.title,
            proyecto.description,
            proyecto.idUser,
            proyecto.detailedDescription ?? null,
            proyecto.idCategory ?? null,
            proyecto.image ?? null
        ]);
    }

    public async GetAll(title?: string, description?: string, username?: string, idCategory?: string, orderByDate?: string): Promise<ProjectListItemDto[]> {
        var query = 'SELECT p.Id, p.Titulo, p.Descripcion, p.IdUsuario, u.Nombre as nombreUsuario, p.FechaCreacion, p.Imagen, p.IdCategoria, c.Nombre as categoria FROM Proyecto p JOIN Categorias c ON p.IdCategoria = c.Id JOIN Usuarios u ON p.IdUsuario = u.Id';
        
        if(title || description || username || idCategory) {
            query += ` WHERE `;
            const conditions = [];

            if (title) {
                conditions.push(`p.Titulo ILIKE '%${title}%'`);
            }
            if (description) {
                conditions.push(`p.Descripcion ILIKE '%${description}%'`);
            }
            if (username) {
                conditions.push(`u.Nombre ILIKE '%${username}%'`);
            }
            if (idCategory) {
                conditions.push(`p.IdCategoria = '${idCategory}'`);
            }

            query += conditions.join(' AND ');
        }
        if (orderByDate == 'true') {
            query += ' ORDER BY p.FechaCreacion DESC';
        }
        if (orderByDate == 'false') {
            query += ' ORDER BY p.FechaCreacion ASC';
        }

        const result = await this.client.query(query);
        return result.rows.map(row => ({
            id: row.id,
            title: row.titulo,
            description: row.descripcion,
            idUser: row.idusuario,
            username: row.nombreusuario,
            creationDate: row.fechacreacion,
            idCategory: row.idcategoria,
            category: row.categoria,
            image: row.imagen
        } as ProjectListItemDto));
    }

    async GetById(id: number): Promise<Project | null>{
        const response = await this.client.query('SELECT * FROM Proyecto WHERE Id = $1', [id]);

        if(response.rowCount === 0){
            return null;
        }

        return response.rows.map(row => new Project(row.titulo, row.descripcion, row.idusuario, row.descripciondetallada, row.fechacreacion, row.idcategoria, row.imagen))[0];
    }

    async DeleteById(id: number): Promise<void>{
        await this.client.query('DELETE FROM Proyecto WHERE Id = $1', [id]);
    }

    async UpdateById(id: number, project: Project): Promise<void>{
        await this.client.query('UPDATE Proyecto SET Titulo = $1, Descripcion = $2, DescripcionDetallada = $3, IdCategoria = $4, Imagen = $5 WHERE Id = $6', 
        [
            project.title,
            project.description,
            project.detailedDescription ?? null,
            project.idCategory ?? null,
            project.image ?? null,
            id
        ]);
    }           
}