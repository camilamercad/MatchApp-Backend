import { User } from "./user-entity.js";

export interface IUserRepository {
    Add(user: User): Promise<number>;
    GetById(id: number): Promise<User | null>;
    DeleteById(id: number): Promise<void>
    UpdateById(id: number, user: User): Promise<void>;
    GetByName(name: string): Promise<User | null>;
}