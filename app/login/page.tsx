"use client";

import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useLogin } from "@/queries/auth";

import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { LoginFormValues, loginSchema } from "./loginValidationRules"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import {Spinner} from "@/components/Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) =>
  {
    setLoading(true);
    try {
      const result = await loginMutation.mutateAsync(data);
      if (result?.Token) {
        Cookies.set('access_token', result.Token, { expires: 1, secure: true });
        router.replace("/home");
      }
      else {
        toast({
          title: "Login failed: Invalid login details.",
          description: "An error occurred.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      toast({
        title: "Logging in failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      router.replace("/home");
    }

  }, [router]);

  return (
    <div className="flex w-screen h-screen">
      {/* Left side with image */}
      <div className="w-1/2 bg-cover bg-center relative">
        <Header />
        <Image
          src="/login_background.jpg"
          alt="School"
          fill={true}
          sizes="50vw"
          priority={true}
          className="object-cover opacity-70"
        />
        <div className="flex flex-col h-screen items-center pt-20">
          <div className="z-0 text-center mb-[350px] font-semibold text-white text-[72px]">
            <h1>Welcome Back!</h1>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16 pb-52">
        <h2 className="text-4xl font-semibold mb-4">Login</h2>
        <p className="mb-8 text-gray-600">
          Welcome back! Please login to your account.
        </p>
        <Form {...form}>
          <form
             onSubmit={async (event) => {
               event.preventDefault();

               try {
                 await form.handleSubmit(handleLogin)(event);
               }
               catch (error) {
                 console.error("Form submission error:", error);
               }
             }}
             className="w-full max-w-sm flex flex-col gap-5"
          >
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                           id="email"
                           placeholder="Email"
                           {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                           id="password"
                           placeholder="Password"
                           type="password"
                           {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
               )}
            />

            <Button
               type="submit"
               className="w-full bg-blue text-white py-2 rounded-lg"
               disabled={loading}
            >
              {loading ? (
                 <span className="flex items-center gap-2">
                   <Spinner />
                   Logging in..
                 </span>
              ) : (
                 "Login"
              )}
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-gray-600">
          New User?{" "}
          <a href="/register" className="text-blue hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
