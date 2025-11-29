import Joi from "joi";

export class SchemaFactory {
  static getSchema(type: SchemaType): Joi.ObjectSchema<any> {
    switch (type) {
      case SchemaType.addProject:
        return Joi.object({
          title: Joi.string().min(1).max(50).required(),
          description: Joi.string().min(1).max(255).required(),
          idUser: Joi.number().integer().min(1).required(),
          detailedDescription: Joi.string().max(500).optional(),
          idCategory: Joi.number().integer().min(1).optional(),
          image: Joi.string().uri().optional()
        });

      case SchemaType.updateProject:
        return Joi.object({
          title: Joi.string().min(1).max(50).required(),
          description: Joi.string().min(1).max(255).required(),
          detailedDescription: Joi.string().max(500).optional(),
          idCategory: Joi.number().integer().min(1).optional(),
          image: Joi.string().uri().optional()
        });

        case SchemaType.user:
          return Joi.object({
            name: Joi.string().min(1).max(20).required(),
            email: Joi.string().email().max(50).required(),
            dateBirth: Joi.string().required(),
            description: Joi.string().max(255).optional().allow(null),
            phone: Joi.number().integer().min(1000000).max(9999999999).optional().allow(null),
            gender: Joi.boolean().optional().allow(null)
          });

      case SchemaType.filters:
        return Joi.object({
          title: Joi.string().optional(),
          description: Joi.string().optional(),
          username: Joi.string().optional(),
          idCategory: Joi.string().pattern(/^[1-9]\d*$/).optional(),
          orderByDate: Joi.string().valid("true", "false").optional()
        }).unknown(false);

      case SchemaType.id:
        return Joi.object({
          Id: Joi.number().integer().min(1).required()
        }).unknown(false);

      default:
        throw new Error(`Schema not found for type: ${type}`);
    }
  }
}

export enum SchemaType {
    addProject = "addProject",
    updateProject = "updateProject",
    user = "user",
    filters = "filters",
    id = "id",
}  