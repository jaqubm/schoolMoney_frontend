"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";
import { Header } from "@/components/Header";
import { RegisterBody } from "@/app/register/Register.types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/app/register/validationRules";
import { clsx } from "clsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axiosInstance";

export default function Register() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
      surname: "",
      termsAndConditions: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    try {
      const response = await axiosInstance.post("/Auth/Register", data);

      if (response.status === 200) {
        router.push("/login");
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="flex flex-row h-screen w-full">
        <div className="relative flex-1 flex items-center justify-start flex-col text-white p-10">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/assets/mama_z_corka.jpeg')" }}
          >
            <Header />
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="flex flex-col items-center justify-start mt-32">
            <h1 className="relative z-10 text-5xl font-bold mb-2">
              Streamline School
            </h1>
            <h1 className="relative z-10 text-5xl font-bold">Fundraising</h1>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col justify-center gap-4">
            <h3 className="font-bold text-2xl">Create an account</h3>
            <p className="flex flex-row text-grayLight gap-1 font-poppins text-xs mx-auto">
              Already have an account?
              <a href="/login" className="text-accent font-bold">
                Sign in
              </a>
            </p>
          </div>

          <div className="w-[395px] flex flex-col justify-center gap-7">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="First name"
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
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="Last name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="Email"
                            type="email"
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
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            type="password"
                            placeholder="Password"
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
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            type="password"
                            placeholder="Repeat password"
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
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center p-2">
                      <div className="flex flex-row space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-grayLight"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-secondary cursor-pointer">
                          I accept the terms and conditions and privacy policy
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  className={clsx(
                    "font-poppins mt-5 rounded-bl font-semibold bg-blue text-primary shadow",
                    "hover:bg-blueLight",
                  )}
                >
                  Get Started
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
