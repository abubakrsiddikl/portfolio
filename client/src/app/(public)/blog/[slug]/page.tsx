import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { getBlogBySlug } from "@/services";
import type { Metadata } from "next";

interface BlogDetailsProps {
  params: { slug: string };
}

//  SEO Metadata
export async function generateMetadata({
  params,
}: BlogDetailsProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  return {
    title: blog?.title || "Project Details",
    description:
      blog?.content?.slice(0, 160) || "Explore this amazing project.",
    openGraph: {
      title: blog?.title,
      description: blog?.content,
      images: blog?.thumbnail ? [{ url: blog.thumbnail, alt: blog.title }] : [],
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const blog = await getBlogBySlug(params.slug);

  return (
    <div>
      <BlogDetailsCard blog={blog}></BlogDetailsCard>
    </div>
  );
}
