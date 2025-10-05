import { Types } from "mongoose";

export interface IBlog {
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  author: Types.ObjectId;
  isPublished: boolean;
  isFeatured: boolean;
  views?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
