import { z } from "zod";

export const createSkillZodSchema = z.object({
  name: z.string().min(2,"skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export const updateSkillZodSchema = z.object({
 name: z.string().min(2,"skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
  category: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
});
