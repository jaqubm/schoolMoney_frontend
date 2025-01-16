"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Header } from "@/components/Header";
import {
  useCreateChildProfile,
  useGetClasses,
  useUserData,
} from "@/queries/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  registerKidSchema,
  RegisterFormValues,
} from "@/app/kids/registerKid/kidRegistrationRules";
import { toast } from "@/hooks/use-toast";
import { CreateChildPayload } from "@/app/user/User.types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function RegisterKidPage() {
  const router = useRouter();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { data: classes, isLoading: loadingClasses } = useGetClasses();
  const { mutate: createChild, isLoading: creatingChild } =
    useCreateChildProfile();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerKidSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      classId: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    const payload: CreateChildPayload = {
      name: `${data.firstName} ${data.lastName}`,
      classId: data.classId || null,
    };

    createChild(payload, {
      onSuccess: () => {
        toast({
          title: "Child registered",
          description: "Your child has been successfully registered.",
        });
        router.push("/kids");
      },
      onError: () => {
        toast({
          title: "Registration failed",
          description: `An error occurred during child registration. Payload:"${payload.classId}"`,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Header */}
      <Header withBorder>
        <div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser
              ? "Loading..."
              : `Welcome, ${userData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                  "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      {/* Main Content */}
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full h-full px-16 py-10">
          <button
            className="flex items-center gap-4 text-secondary hover:text-gray-800 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-xl font-bold">Register your kid</span>
          </button>

          {/* Registration Form */}
          <div className="flex w-full h-full gap-10 justify-center">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
              <Avatar className="w-52 h-52">
                <AvatarFallback className="text-4xl">
                  {`${form.watch("firstName")?.[0] || ""}${form.watch("lastName")?.[0] || ""}` ||
                    "..."}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Form Section */}
            <div className="w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <p>First Name</p>
                        <FormControl>
                          <Input
                            placeholder="Enter your kid's first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <p>Last Name</p>
                        <FormControl>
                          <Input
                            placeholder="Enter your kid's last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem>
                        <p>Class</p>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full border rounded-lg p-2"
                          >
                            <option value="" disabled>
                              Select a class
                            </option>
                            {loadingClasses ? (
                              <option>Loading classes...</option>
                            ) : (
                              classes?.map((classItem) => (
                                <option
                                  key={classItem.classId}
                                  value={classItem.classId}
                                >
                                  {classItem.name} - {classItem.schoolName}
                                </option>
                              ))
                            )}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-2 flex justify-center mt-4">
                    <Button
                      type="submit"
                      className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
                      disabled={creatingChild}
                    >
                      {creatingChild ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
