"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { FileMetadata } from "@/hooks/use-file-upload";

import { IProject, updateProject } from "@/services";

// Zod Schema
const updateProjectSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  features: z.string().min(2, "Features is required"),
  technologies: z.string().min(2, "Technologies is required"),
  githubFrontend: z.string().min(2, "Github Frontend url is required"),
  githubBackend: z.string().min(2, "Github Backend url is required"),
  liveLink: z.string().min(2, "Live Site url is required"),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;

interface UpdateProjectModalProps {
  projectData: IProject;
  onUpdateSuccess?: () => void;
}

export default function UpdateProjectModal({
  projectData,
}: UpdateProjectModalProps) {
  const [open, setOpen] = useState(false);

  const initialImages: FileMetadata[] = projectData.projectImages.map(
    (url) => ({
      url: url,
      name: url.substring(url.lastIndexOf("/") + 1),
    })
  );

  const [images, setImages] = useState<(File | FileMetadata)[]>(initialImages);

  // Setup form
  const form = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      title: projectData.title || "",
      description: projectData.description || "",
      category: projectData.category || "",

      features: projectData.features ? projectData.features.join(", ") : "",
      technologies: projectData.technologies
        ? projectData.technologies.join(", ")
        : "",
      githubFrontend: projectData.githubFrontend || "",
      githubBackend: projectData.githubBackend || "",
      liveLink: projectData.liveLink || "",
      isFeatured: projectData.isFeatured ?? "false",
      isPublished: projectData.isPublished ?? "true",
    },
  });

  // Handle submit
  const onSubmit = async (values: UpdateProjectInput) => {
    try {
      const featuresArr = values.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const technologiesArr = values.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const formData = new FormData();

      const { filesToUpload, existingImageUrls } = images.reduce(
        (acc, file) => {
          if (file instanceof File) acc.filesToUpload.push(file);
          else if ("url" in file) acc.existingImageUrls.push(file.url);
          return acc;
        },
        { filesToUpload: [] as File[], existingImageUrls: [] as string[] }
      );
      

      const deletedImageUrls = projectData.projectImages.filter(
        (url) => !existingImageUrls.includes(url)
      );

      const payload = {
        ...values,

        features: featuresArr,
        technologies: technologiesArr,

        deleteImages: deletedImageUrls,
      };

      formData.append("data", JSON.stringify(payload));

      filesToUpload.forEach((file) => {
        formData.append("files", file);
      });

      const res = await updateProject(projectData._id, formData);
      console.log(res);
      if (res.success) {
        toast.success("✅ Project updated successfully!");
      }

      setOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-indigo-600 hover:text-indigo-800"
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="max-w-lg w-full rounded-xl p-6 my-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Update Project: {projectData.title}
          </DialogTitle>
          <DialogDescription>
            Edit the details to update your project.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-h-[80vh] overflow-y-auto"
        >
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              {...form.register("title")}
              placeholder="Project title"
              className="mt-1"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              {...form.register("description")}
              placeholder="Short description..."
              rows={4}
              className="mt-1"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Optional fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Input
                {...form.register("category")}
                placeholder="E.g. Web App"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Technologies (comma separated)</Label>
              <Input
                {...form.register("technologies")}
                placeholder="Next.js, Tailwind"
                className="mt-1"
              />
              {form.formState.errors.technologies && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.technologies.message}
                </p>
              )}
            </div>
          </div>

          {/* GitHub Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>GitHub Frontend</Label>
              <Input
                {...form.register("githubFrontend")}
                placeholder="https://github.com/frontend"
                className="mt-1"
              />
              {form.formState.errors.githubFrontend && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.githubFrontend.message}
                </p>
              )}
            </div>
            <div>
              <Label>GitHub Backend</Label>
              <Input
                {...form.register("githubBackend")}
                placeholder="https://github.com/backend"
                className="mt-1"
              />
              {form.formState.errors.githubBackend && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.githubBackend.message}
                </p>
              )}
            </div>
          </div>

          {/* Live Link and Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Features (comma separated)</Label>
              <Input
                {...form.register("features")}
                placeholder="feature1, feature2, feature3"
                className="mt-1"
              />
              {form.formState.errors.features && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.features.message}
                </p>
              )}
            </div>
            <div>
              <Label>Live Link</Label>
              <Input
                {...form.register("liveLink")}
                placeholder="https://live-site.com"
                className="mt-1"
              />
              {form.formState.errors.liveLink && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.liveLink.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload*/}
          <div>
            <Label>Project Images</Label>
            <MultipleImageUploader
              onChange={setImages}
              initialFiles={initialImages}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...form.register("isFeatured")}
                className="w-4 h-4"
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...form.register("isPublished")}
                className="w-4 h-4"
              />
              Published
            </label>
          </div>

          {/* Footer buttons */}
          <DialogFooter className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              {form.formState.isSubmitting ? "Updating..." : "Update Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
