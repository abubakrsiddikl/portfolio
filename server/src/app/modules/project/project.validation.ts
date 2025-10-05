import { z } from "zod";

export const createProjectZodSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required").optional(),
  description: z.string().min(2, "Description must be at least 10 characters"),
  projectIa: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  githubFrontend: z.string().optional(),
  githubBackend: z.string().optional(),
  liveLink: z.string().optional(),
  category: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export const updateProjectZodSchema = createProjectZodSchema.partial();
