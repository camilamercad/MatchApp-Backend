import { ProyectoListItemDto } from "./proyecto-item-dto.js";
import { Proyecto } from "./proyecto.entity.js";

export interface IProyectoRepository {
    Add(proyecto: Proyecto): Promise<void>;
    GetAll(titulo?: string, descripcion?: string, nombreUsuario?: string, idCategoria?: string, ordenarPorFecha?: string): Promise<ProyectoListItemDto[]>
    GetById(id: number): Promise<Proyecto | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, proyecto: Proyecto): Promise<void>;
}