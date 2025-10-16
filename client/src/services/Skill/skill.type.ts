export interface ISkill {
  _id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: string;
  icon: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
