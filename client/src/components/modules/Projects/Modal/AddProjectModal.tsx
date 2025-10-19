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
import { Plus } from "lucide-react";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { FileMetadata } from "@/hooks/use-file-upload";
import { addNewProject } from "@/services";
import { useRouter } from "next/navigation";

//  Zod Schema
const createProjectSchema = z.object({
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

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

export default function AddProjectModal() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  //  Setup form
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      features: "",
      technologies: "",
      githubFrontend: "",
      githubBackend: "",
      liveLink: "",
      isFeatured: false,
      isPublished: true,
    },
  });

  const router = useRouter();
  //  Handle submit
  const onSubmit = async (values: CreateProjectInput) => {
    try {
      setIsLoading(true);
      // Convert comma separated string -> array
      const featuresArr = values.features
        ? values.features
            .toString()
            .split(",")
            .map((f) => f.trim())
        : [];

      const technologiesArr = values.technologies
        ? values.technologies.split(",").map((t) => t.trim())
        : [];
      // Create FormData
      const formData = new FormData();

      // Append text fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.category) formData.append("category", values.category);
      formData.append("isFeatured", String(values.isFeatured || false));
      formData.append("isPublished", String(values.isPublished || false));

      if (values.githubFrontend)
        formData.append("githubFrontend", values.githubFrontend);
      if (values.githubBackend)
        formData.append("githubBackend", values.githubBackend);
      if (values.liveLink) formData.append("liveLink", values.liveLink);

      // Append arrays (backend should handle array parsing)
      featuresArr.forEach((f) => formData.append("features[]", f));
      technologiesArr.forEach((t) => formData.append("technologies[]", t));
      // Append images
      if (images && images.length > 0) {
        images.forEach((file) => {
          if (file instanceof File) {
            formData.append("files", file);
          } else if ("url" in file) {
            // already uploaded (metadata type)
            formData.append("existingImages[]", file.url);
          }
        });
      }
      // Send request
      const res = await addNewProject(formData);
      if (res.success) {
        router.refresh();
        toast.success("✅ Project added successfully!");
      }

      form.reset();
      setImages([]);
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Button to open modal */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-600 text-white cursor-pointer">
          <Plus size={16} /> Add Project
        </Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="max-w-lg w-full rounded-xl p-6 my-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Project
          </DialogTitle>
          <DialogDescription>
            Fill in the basic details for your project.
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
              <Label>Technologies</Label>
              <Input
                {...form.register("technologies")}
                placeholder="Next.js, Tailwind"
                className="mt-1"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.technologies?.message}
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
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.githubFrontend?.message}
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
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.githubBackend?.message}
                </p>
              )}
            </div>
          </div>

          {/* Live Link and Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Features</Label>
              <Input
                {...form.register("features")}
                placeholder="feature1, feature2, feature3"
                className="mt-1"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.features?.message}
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
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.liveLink?.message}
                </p>
              )}
            </div>
          </div>
          {/* Image Upload*/}
          <div>
            <Label>Project Images</Label>
            <MultipleImageUploader onChange={setImages}></MultipleImageUploader>
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
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              {isLoading ? "Add Project..." : "Add Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
