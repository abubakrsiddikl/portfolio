import { Types } from "mongoose";

export interface IProject {
  title: string;
  slug: string;
  description: string;
  projectImages?: string[];
  features?: string[];
  technologies?: string[];
  githubFrontend?: string;
  githubBackend?: string;
  liveLink?: string;
  category?: string;
  isFeatured?: boolean;
  author: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  deleteImages?: string[];
}
