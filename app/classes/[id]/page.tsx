"use client";

import { useRouter, useParams } from "next/navigation";
import {
  useGetClassById,
  useUpdateClass,
  useDeleteClass,
} from "@/queries/class";
import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { useUserData } from "@/queries/user";

// Validation schema
const editClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  schoolName: z.string().min(1, "School name is required"),
});

type EditClassFormValues = z.infer<typeof editClassSchema>;

const EditClassPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();
  const { id } = useParams();
  const { data: classData, isLoading } = useGetClassById(id as string);
  const updateClass = useUpdateClass();
  const deleteClass = useDeleteClass();

  const form = useForm<EditClassFormValues>({
    resolver: zodResolver(editClassSchema),
    defaultValues: {
      name: "",
      schoolName: "",
    },
  });

  useEffect(() => {
    if (classData) {
      form.setValue("name", classData.name);
      form.setValue("schoolName", classData.schoolName);
    }
  }, [classData, form]);

  const handleUpdate = async (data: EditClassFormValues) => {
    if (userData?.email !== classData?.treasurer?.email) {
      alert("Only the treasurer can edit this class.");
      return;
    }

    await updateClass.mutateAsync({
      classId: id as string,
      data: { name: data.name, schoolName: data.schoolName },
    });
    router.push("/classes");
  };

  const handleDelete = async () => {
    if (userData?.email !== classData?.treasurer?.email) {
      alert("Only the treasurer can delete this class.");
      return;
    }

    await deleteClass.mutateAsync(id as string);
    router.push("/classes");
  };

  if (isLoading || loadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Upper screen */}
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

      <div className="flex w-full h-full">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full px-16 py-10 gap-10">
          <button
            className="flex items-center gap-4 text-secondary hover:text-gray-800 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-xl font-bold">Class</span>
          </button>

          <div className="flex gap-10">
            <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
              <Avatar className="w-52 h-52">
                <AvatarFallback className="text-4xl">
                  {form.watch("name")?.slice(0, 2)?.toUpperCase() || "..."}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="flex flex-col gap-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter class name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter school name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between mt-8">
                    <Button type="submit" className="bg-blue text-white w-40">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="bg-red text-white w-40"
                      onClick={handleDelete}
                    >
                      Delete Class
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
};

export default EditClassPage;
