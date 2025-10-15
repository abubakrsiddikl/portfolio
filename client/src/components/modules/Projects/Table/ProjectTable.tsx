"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  deleteProject, IProject } from "@/services";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

import Link from "next/link";
import UpdateProjectModal from "../Modal/UpdateProjectModal";

interface Props {
  projects: IProject[];
}

export default function ProjectTable({ projects }: Props) {
  // handle delete
  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${title} This Blog Was Delete`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProject(id);
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your blog has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            {/* Image Row */}
            <TableHead className="p-2 border border-purple-700 text-white">
              Image
            </TableHead>
            {/* Title Row */}
            <TableHead className="p-2 border border-purple-700 text-white">
              Title
            </TableHead>
            {/* Publish Date */}
            <TableHead className="p-2 border border-purple-700 text-white">
              Publish Date
            </TableHead>

            <TableHead className="p-2 border text-center border-purple-700 text-white">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              {/* image cell */}
              <TableCell className="p-2 border border-purple-700">
                <Image
                  src={project.projectImages[0] || "/placeholder.png"}
                  alt={project.title}
                  width={48}
                  height={64}
                  className=" object-cover rounded"
                />
              </TableCell>
              {/* title cell */}
              <TableCell className="p-2 border border-purple-700">
                <Link href={`/project/${project.slug}`} className="hover:text-blue-400 hover:underline">{project.title}</Link>
              </TableCell>

              {/* Publish Date */}
              <TableCell className="text-white border border-purple-700">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>

              {/* action cell */}
              <TableCell className="p-2 border border-purple-700 text-center space-x-2">
                <UpdateProjectModal projectData={project} ></UpdateProjectModal>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(project._id, project.title)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
