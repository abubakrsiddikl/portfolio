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
import { deleteBlog, IBlog } from "@/services";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import UpdateBlogModal from "../Modal/UpdateBlogModal";
import Link from "next/link";

interface Props {
  blogs: IBlog[];
}

export default function BlogTable({ blogs }: Props) {
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
        const res = await deleteBlog(id);
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
          {blogs.map((blog) => (
            <TableRow key={blog._id}>
              {/* image cell */}
              <TableCell className="p-2 border border-purple-700">
                <Image
                  src={blog.thumbnail || "/placeholder.png"}
                  alt={blog.title}
                  width={48}
                  height={64}
                  className=" object-cover rounded"
                />
              </TableCell>
              {/* title cell */}
              <TableCell className="p-2 border border-purple-700">
                <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-400 hover:underline">{blog.title}</Link>
              </TableCell>

              {/* Publish Date */}
              <TableCell className="text-white border border-purple-700">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>

              {/* action cell */}
              <TableCell className="p-2 border border-purple-700 text-center space-x-2">
                <UpdateBlogModal blogData={blog}></UpdateBlogModal>
                
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(blog._id, blog.title)}
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
