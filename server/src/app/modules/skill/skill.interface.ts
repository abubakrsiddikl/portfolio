export interface ISkill {
  name: string;
  level: SKILL_LEVEL;
  category: string;
  icon?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum SKILL_LEVEL {
  Beginner = "Beginner", 
  Intermediate = "Intermediate",
  Advanced = "Advanced",
  Expert = "Expert",
}
