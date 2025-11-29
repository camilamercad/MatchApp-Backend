export class Usuario{
    constructor(
        public Nombre: string,
        public Email: string,
        public FechaDeNacimiento: string,
        public Descripcion?: string,
        public Telefono?: number,
        public Genero?: boolean,
        public Id?: number
    ) {}
}