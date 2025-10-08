export interface IBlog {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    email: string;
  };
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
