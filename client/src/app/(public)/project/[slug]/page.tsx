import ProjectDetailsCard from "@/components/modules/Projects/ProjectDetailsCard";
import { getProjectBySlug } from "@/services";
import type { Metadata } from "next";

interface ProjectDetailsProps {
  params: { slug: string };
}

// \Dynamic SEO Metadata
export async function generateMetadata({
  params,
}: ProjectDetailsProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  return {
    title: project?.title || "Project Details",
    description:
      project?.description?.slice(0, 160) || "Explore this amazing project.",
    openGraph: {
      title: project?.title,
      description: project?.description,
      images: project?.projectImages?.[0]
        ? [{ url: project.projectImages[0], alt: project.title }]
        : [],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsProps) {
  const project = await getProjectBySlug(params.slug);

  return (
    <div>
      <ProjectDetailsCard project={project}></ProjectDetailsCard>
    </div>
  );
}
