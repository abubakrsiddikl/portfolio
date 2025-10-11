"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (values: LoginFormValues) => {
  return  console.log(values)
    try {
      // const res = await login(values);
      // if (res.id) {
      //   toast.success("User Logged in successful");
      //   router.push("/dashboard");
      // }
      signIn("credentials", {
        ...values,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signIn();
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="space-y-6 w-full max-w-md  p-8 rounded-lg shadow-md border">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md"
          >
            <h2 className="text-3xl font-bold text-center">Login</h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="sm" className="bg-[#6f09b8] w-full">
              Login
            </Button>

            <div className="flex items-center justify-center space-x-2"></div>
          </form>
        </Form>
        {/* navigate to register */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-indigo-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
