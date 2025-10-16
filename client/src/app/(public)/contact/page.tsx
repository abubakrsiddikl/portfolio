"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Contact form data:", values);
    toast.success("Message sent successfully!");
    form.reset();
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden flex items-center justify-center px-4 py-20">
      {/* Background Glow Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>

      {/* Motion Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-white py-5">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold tracking-tight text-white">
              Get In Touch ✨
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          className="bg-white/10 border-white/30 text-white placeholder-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="bg-white/10 border-white/30 text-white placeholder-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          {...field}
                          className="bg-white/10 border-white/30 text-white placeholder-gray-300 min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Button */}
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
