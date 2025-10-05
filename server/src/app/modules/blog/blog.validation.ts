import z from "zod";

export const createBlogZodSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(2, "Content must be at least 20 characters"),
  thumbnail: z.string().optional().or(z.literal("")).optional(),
  category: z.string().optional().default("General"),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
  views: z.number().optional().default(0),
});

export const updateBlogZodSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(5).optional(),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});
