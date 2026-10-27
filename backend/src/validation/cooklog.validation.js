const { z } = require("zod");

const cookLogSchema = z.object({
  recipeId: z.coerce.number().int().positive(),
  userId: z.string().min(1),
  cookedAt: z.coerce.date(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  note: z.string().max(500).optional(),
});

const cookLogUpdateSchema = cookLogSchema.omit({
  recipeId: true,
  userId: true,
});

module.exports = { cookLogSchema, cookLogUpdateSchema };
