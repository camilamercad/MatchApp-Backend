export interface ICategoriaRepository {
    GetAll(): Promise<{ Id: number; Nombre: string }[]>;
}