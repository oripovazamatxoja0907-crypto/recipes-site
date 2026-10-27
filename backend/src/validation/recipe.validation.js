const { z } = require("zod");

const recipeSchema = z.object({
  title: z.string({ error: "Nom kerak" }).min(2, "Nom kamida 2 harf bo'lsin"),
  ingredients: z.string().min(1, "Masalliqlar kerak"),
  steps: z.string().min(1, "Tayyorlash yo'li kerak"),
  imageUrl: z.string().url("Rasm linki noto'g'ri").nullable().optional(),
  prepTime: z.coerce
    .number()
    .int()
    .positive("Vaqt musbat son bo'lsin")
    .optional(),
  userId: z.string().min(1, "userId kerak"),
});

const recipeUpdateSchema = recipeSchema.omit({ userId: true });

module.exports = { recipeSchema, recipeUpdateSchema };
