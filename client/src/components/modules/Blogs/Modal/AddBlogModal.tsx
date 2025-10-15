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
import { Plus } from "lucide-react";
import SingleImageUploader from "@/components/SingleImageUploader";
import { toast } from "sonner";
import { addNewBlog } from "@/services";

//  Zod Schema
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

export default function AddBlogModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: "",
      isPublished: false,
      isFeatured: false,
    },
  });

  const onSubmit = async (values: BlogFormValues) => {
    if (!image) {
      toast.error("Please select a thumbnail image.");
      return;
    }
    // Convert tags from comma-separated string → array
    const tagsArray = values.tags.split(",").map((t) => t.trim());
    console.log({ ...values, tags: tagsArray });
    const payload = {
      ...values,
      tags: tagsArray,
      isFeatured: values.isFeatured,
      isPublished: values.isPublished,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    formData.append("file", image as File);
    const res = await addNewBlog(formData);
    if (res.success) {
      toast.success("Blog Post Successfully Complete");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-600 text-white cursor-pointer">
          <Plus size={16} /> Add Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl shadow-2xl p-6 my-5">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Add New Blog
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            Fill the form below to create a new blog post.
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

            {/* Thumbnail */}
            <SingleImageUploader onChange={setImage}></SingleImageUploader>

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
              className={cn(
                "w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90"
              )}
            >
              Submit Blog
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
