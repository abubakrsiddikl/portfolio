export interface IProject {
  _id: string;
  title: string;
  description: string;
  projectImages: string[];
  features: string[];
  technologies: string[];
  githubFrontend: string;
  githubBackend: string;
  liveLink: string;
  category: string;
  isFeatured: boolean;
  isPublished: boolean;
  author: Author;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface Author {
  name: string;
  email: string;
}
