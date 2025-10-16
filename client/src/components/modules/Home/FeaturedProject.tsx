import { getAllRecentProjects } from "@/services";
import ProjectCard from "../Projects/ProjectCard";


export default async function FeaturedProjects() {
  const getAllRecentProject = await getAllRecentProjects();
  
  return (
    <section >
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-15">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
         {
          getAllRecentProject.map((project)=><ProjectCard project={project} key={project._id}></ProjectCard>)
         }
        </div>
      </div>
    </section>
  );
}
