"use client";

import { useRouter, useParams } from "next/navigation";
import {
  useGetClassById,
  useUpdateClass,
  useDeleteClass,
} from "@/queries/class";
import React, { useEffect, useState } from "react";
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
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { useUserData } from "@/queries/user";
import { ClassFormValues, classSchema } from "@/app/classes/create/classRules";
import { Spinner } from "@/components/Spinner";

const EditClassPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();
  const { id } = useParams();
  const { data: classData, isLoading: loadingClass } = useGetClassById(
    id as string,
  );
  const { mutateAsync: updateClass, isLoading: updatingClass } =
    useUpdateClass();
  const { mutateAsync: deleteClass, isLoading: deletingClass } =
    useDeleteClass();

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {
      name: false,
      schoolName: false,
    },
  );

  const toggleFieldEditable = (field: string) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      schoolName: "",
    },
  });

  const [initialValues, setInitialValues] = useState({
    name: "",
    schoolName: "",
  });

  const handleBlur = (field: keyof typeof initialValues) => {
    const currentValue = form.getValues(field);
    if (currentValue === initialValues[field]) {
      setEditableFields((prev) => ({ ...prev, [field]: false }));
    }
  };

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    if (!loadingClass && classData) {
      form.reset({
        name: classData.name,
        schoolName: classData.schoolName,
      });
      setInitialValues({
        name: classData.name,
        schoolName: classData.schoolName,
      });
    }
  }, [loadingClass, classData, form]);

  const handleUpdate = async (data: ClassFormValues) => {
    if (userData?.email !== classData?.treasurer?.email) {
      alert("Only the treasurer can edit this class.");
      return;
    }

    await updateClass(
      {
        classId: id as string,
        data: { name: data.name, schoolName: data.schoolName },
      },
      {
        onSuccess: () => {
          form.reset(data);
          setEditableFields({ name: false, schoolName: false });
        },
      },
    );
  };

  const handleDelete = async () => {
    if (userData?.email !== classData?.treasurer?.email) {
      alert("Only the treasurer can delete this class.");
      return;
    }

    await deleteClass(id as string);
    router.push("/classes");
  };

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
            className="flex w-fit items-center gap-4 text-secondary hover:text-gray-800 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-xl font-bold">Class</span>
          </button>

          <div className="flex gap-10 w-full h-full justify-center">
            <div className="flex items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
              <Avatar className="w-52 h-52">
                <AvatarFallback className="text-4xl">
                  {form.watch("name")?.slice(0, 2)?.toUpperCase() || "..."}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="flex flex-col w-full h-full gap-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              placeholder="..."
                              readOnly={!editableFields.name}
                              className={
                                editableFields.name ? "" : "text-gray-500"
                              }
                              onBlur={() => handleBlur("name")}
                            />
                            <button
                              className="flex w-6 h-6"
                              onClick={(event) => {
                                event.preventDefault();
                                toggleFieldEditable("name");
                              }}
                            >
                              <PencilIcon />
                            </button>
                          </div>
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
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              placeholder="..."
                              readOnly={!editableFields.schoolName}
                              className={
                                editableFields.schoolName ? "" : "text-gray-500"
                              }
                              onBlur={() => handleBlur("schoolName")}
                            />
                            <button
                              className="flex w-6 h-6"
                              onClick={(event) => {
                                event.preventDefault();
                                toggleFieldEditable("schoolName");
                              }}
                            >
                              <PencilIcon />
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col w-full gap-5 h-full justify-center items-center">
                    <Button
                      type="submit"
                      className="bg-blue hover:bg-blueLight text-white py-2"
                      disabled={!(isDirty && !updatingClass)}
                    >
                      {updatingClass ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          Updating Class..
                        </span>
                      ) : (
                        "Update Class"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="bg-red hover:bg-redLight text-white py-2"
                      onClick={handleDelete}
                      disabled={deletingClass || loadingClass}
                    >
                      {deletingClass ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          Deleting Class..
                        </span>
                      ) : (
                        "Delete Class"
                      )}
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
