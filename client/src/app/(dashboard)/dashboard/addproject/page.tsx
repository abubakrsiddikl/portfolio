import AddProjectModal from "@/components/modules/Projects/Modal/AddProjectModal";
import ProjectTable from "@/components/modules/Projects/Table/ProjectTable";
import { getAllProjects } from "@/services";

export const dynamic = "force-dynamic"

export default async function AddProjectPage() {
  const projects = await getAllProjects();
  return (
    <div>
      {/* add project modal */}
      <div className="flex justify-end items-center mb-5">
        <AddProjectModal></AddProjectModal>
      </div>
      {/* project table */}
      <div>
        <ProjectTable projects={projects}></ProjectTable>
      </div>
    </div>
  );
}
