import { Blog } from "../blog/blog.model";
import { Project } from "../project/project.model";

const getStats = async () => {
  const totalBlogs = await Blog.countDocuments();
  const publishedBlogs = await Blog.countDocuments({ isPublished: true });

  const totalProjects = await Project.countDocuments();
  const publishedProjects = await Project.countDocuments({ isPublished: true });

  const totalFeaturedBlogs = await Blog.countDocuments({ isFeatured: true });
  const totalFeaturedProjects = await Project.countDocuments({ isFeatured: true });

  return {
    data: {
      totalBlogs,
      publishedBlogs,
      totalFeaturedBlogs,
      totalProjects,
      publishedProjects,
      totalFeaturedProjects,
    },
  };
};

export const StatsServices = {
  getStats,
};
