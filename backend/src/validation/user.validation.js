const { z } = require("zod");

const userSchema = z.object({
  id: z.string().min(1, "id kerak (Clerk id)"),
  name: z.string().min(1).optional(),
  email: z.string().email("Email noto'g'ri").optional(),
  avatar: z.string().url().optional(),
});

const userUpdateSchema = userSchema.omit({ id: true });

module.exports = { userSchema, userUpdateSchema };
