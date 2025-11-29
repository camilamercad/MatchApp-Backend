export class User{
    constructor(
        public name: string,
        public email: string,
        public dateBirth: string,
        public description?: string,
        public phone?: number,
        public gender?: boolean,
        public id?: number
    ) {}
}