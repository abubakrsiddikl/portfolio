import { Schema, model } from "mongoose";
import { ISkill, SKILL_LEVEL } from "./skill.interface";

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: Object.values(SKILL_LEVEL),
      required: true,
    },
    category: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

export const Skill = model<ISkill>("Skill", skillSchema);
