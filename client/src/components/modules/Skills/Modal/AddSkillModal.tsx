"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import SingleImageUploader from "@/components/SingleImageUploader";
import { toast } from "sonner";
import { addNewSkill } from "@/services";

const formSchema = z.object({
  name: z.string().min(2, "Skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  category: z.string().optional(),
  description: z.string().optional(),
});

export type SkillFormValues = z.infer<typeof formSchema>;

export default function AddSkillModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: "Beginner",
      category: "",
      description: "",
    },
  });

  const onSubmit = async (data: SkillFormValues) => {
    if (!image) {
      toast.error("Please select a thumbnail image.");
      return;
    }
    const formData = new FormData();
    const payload = {
      ...data,
    };
    formData.append("data", JSON.stringify(payload));
    formData.append("file", image);

    const res = await addNewSkill(formData);
    if (res.success) {
      toast("✅ Skill Added Successful .");
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
      <DialogContent className="sm:max-w-lg bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] border border-purple-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-300">
            Add New Skill
          </DialogTitle>
          <DialogDescription className="text-sm text-purple-200/80">
            Fill out the form below to add a new skill.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 max-h-[80vh] overflow-y-auto"
          >
            {/* Skill Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. React.js"
                      {...field}
                      className="bg-transparent border-purple-700/40 focus:border-purple-400 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Level Select */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-purple-700/40 focus:border-purple-400 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#0a021f] border-purple-800 text-purple-200">
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Frontend, Backend, Database"
                      {...field}
                      className="bg-transparent border-purple-700/40 focus:border-purple-400 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Icon URL */}
            <SingleImageUploader onChange={setImage}></SingleImageUploader>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description..."
                      {...field}
                      className="bg-transparent border-purple-700/40 focus:border-purple-400 text-white min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white"
              >
                Save Skill
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
