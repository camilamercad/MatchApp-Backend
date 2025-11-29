export class Project{
    constructor(
        public title: string,
        public description: string,
        public idUser?: number,
        public detailedDescription?: string,
        public creationDate?: Date,
        public idCategory?: number,
        public image?: string
    ) {}
}