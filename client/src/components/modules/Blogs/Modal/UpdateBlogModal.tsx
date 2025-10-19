"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Edit } from "lucide-react";
import SingleImageUploader from "@/components/SingleImageUploader";
import { toast } from "sonner";

import { IBlog, updateBlog } from "@/services";
import { useRouter } from "next/navigation";

// Zod Schema
const blogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content is required"),
  category: z.string().min(2, "Category is required"),
  tags: z.string().min(1, "At least one tag required"),
  isPublished: z.boolean().catch(false),
  isFeatured: z.boolean().catch(false),
});

// Infer type
type BlogFormValues = z.infer<typeof blogSchema>;

interface UpdateBlogModalProps {
  blogData: IBlog;
}

export default function UpdateBlogModal({ blogData }: UpdateBlogModalProps) {
  const [open, setOpen] = useState(false);

  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blogData?.title || "",
      content: blogData?.content || "",
      category: blogData?.category || "",

      tags: blogData?.tags ? blogData.tags.join(", ") : "",
      isPublished: blogData?.isPublished ?? false,
      isFeatured: blogData?.isFeatured ?? false,
    },
  });
  const router = useRouter();

  const onSubmit = async (values: BlogFormValues) => {
    setIsLoading(true);

    const tagsArray = values.tags.split(",").map((t) => t.trim());

    const payload = {
      ...values,
      tags: tagsArray,

      blogId: blogData._id,

      existingPublicId: newImageFile ? undefined : blogData.thumbnail,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));

    if (newImageFile) {
      formData.append("file", newImageFile);
    }

    try {
      const res = await updateBlog(blogData._id, formData);

      if (res.success) {
        router.refresh();
        toast.success("✅ Blog Post Successfully Updated!");

        form.reset(values);
        setOpen(false);
      } else {
        toast.error(res.message || "Update Failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="text-indigo-600 hover:text-indigo-800"
        >
          <Edit size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl shadow-2xl p-6 my-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Update Blog: {blogData?.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            Edit the fields below to update the blog post.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[80vh] overflow-y-auto"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your blog content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SingleImageUploader
              onChange={setNewImageFile}
              initialImage={blogData.thumbnail}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Technology, Lifestyle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="react, nextjs, tailwind" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Published</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
