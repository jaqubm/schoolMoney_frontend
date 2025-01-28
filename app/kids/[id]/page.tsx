"use client";

import { useRouter, useParams } from "next/navigation";
import {
  useGetChildProfile,
  useUpdateChildProfile,
  useDeleteChildProfile,
  useUserData,
} from "@/queries/user";
import React, { useEffect, useState, useMemo } from "react";
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
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { useSearchClasses } from "@/queries/class";
import {
  KidFormValues,
  kidSchema,
} from "@/app/kids/registerKid/kidRegistrationRules";
import { Spinner } from "@/components/Spinner";

const EditChildPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();
  const { id } = useParams();
  const { data: childData, isLoading: loadingChild } = useGetChildProfile(
    id as string,
  );
  const { mutateAsync: updateChildProfile, isLoading: updatingChild } =
    useUpdateChildProfile();
  const { mutateAsync: deleteChildProfile, isLoading: deletingChild } =
    useDeleteChildProfile();

  const [editableFields, setEditableFields] = useState<Record<string, boolean>>(
    {
      firstName: false,
      lastName: false,
      className: false,
    },
  );

  const toggleFieldEditable = (field: string) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  const [enteredClassName, setEnteredClassName] = useState("");
  const { data: classes, isLoading: loadingClasses } =
    useSearchClasses(enteredClassName);
  const [selectedClass, setSelectedClass] = useState("");

  const uniqueClasses = useMemo(() => {
    if (!classes) return [];
    const seen = new Set();
    return classes.filter((classItem) => {
      const key = `${classItem.name}-${classItem.schoolName}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [classes]);

  const form = useForm<KidFormValues>({
    resolver: zodResolver(kidSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      classId: "",
    },
  });

  const { isDirty } = useFormState({ control: form.control });

  useEffect(() => {
    if (!loadingChild && childData) {
      form.reset({
        firstName: childData.name.split(" ")[0] || "",
        lastName: childData.name.split(" ")[1] || "",
        classId: "",
      });
      setEnteredClassName(childData.className);
    }
  }, [loadingChild, childData, form]);

  useEffect(() => {
    if (classes && childData) {
      const matchedClass = classes.find(
        (cls) =>
          cls.name === childData.className &&
          cls.schoolName === childData.schoolName,
      );
      if (matchedClass) {
        form.setValue("classId", matchedClass.classId);
        setSelectedClass(`${matchedClass.name} - ${matchedClass.schoolName}`);
      }
    }
  }, [classes, childData, form]);

  const handleUpdate = async (data: KidFormValues) => {
    await updateChildProfile(
      {
        childId: id as string,
        data: {
          name: `${data.firstName} ${data.lastName}`,
          classId: data.classId || null,
        },
      },
      {
        onSuccess: () => {
          form.reset(data);
          setEditableFields({
            firstName: false,
            lastName: false,
            className: false,
          });
        },
      },
    );
  };

  const handleDelete = async () => {
    await deleteChildProfile(id as string);
    router.push("/kids");
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
            className="flex items-center gap-4 text-secondary hover:text-gray-800 mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="text-xl font-bold">Kid&apos;s profile</span>
          </button>

          <div className="flex gap-10 w-full h-full justify-center">
            <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
              <Avatar className="w-52 h-52">
                <AvatarFallback className="text-4xl">
                  {`${form.watch("firstName")?.[0]?.toUpperCase() || ""}${
                    form.watch("lastName")?.[0]?.toUpperCase() || ""
                  }` || "..."}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="flex flex-col w-full h-full gap-5"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              placeholder="..."
                              readOnly={!editableFields.firstName}
                              className={
                                editableFields.firstName ? "" : "text-gray-500"
                              }
                            />
                            <button
                              className="flex w-6 h-6"
                              onClick={(event) => {
                                event.preventDefault();
                                toggleFieldEditable("firstName");
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              {...field}
                              placeholder="..."
                              readOnly={!editableFields.lastName}
                              className={
                                editableFields.lastName ? "" : "text-gray-500"
                              }
                            />
                            <button
                              className="flex w-6 h-6"
                              onClick={(event) => {
                                event.preventDefault();
                                toggleFieldEditable("lastName");
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
                    name="classId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Class</FormLabel>
                        <Popover>
                          <div className="flex items-center gap-2">
                            <PopoverTrigger
                              asChild
                              disabled={!editableFields.className}
                            >
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value
                                    ? selectedClass
                                    : loadingChild
                                      ? "..."
                                      : "Select class"}
                                  <ChevronsUpDown className="opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>

                            <button
                              className="flex w-6 h-6"
                              onClick={(event) => {
                                event.preventDefault();
                                toggleFieldEditable("className");
                              }}
                            >
                              <PencilIcon />
                            </button>
                          </div>

                          <PopoverContent className="w-full">
                            <Command>
                              <CommandInput
                                placeholder="Search class..."
                                className="h-9"
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  setEnteredClassName(e.target.value);
                                }}
                              />
                              <CommandList>
                                <CommandGroup>
                                  {enteredClassName ? (
                                    loadingClasses ? (
                                      <p>Loading...</p>
                                    ) : (
                                      uniqueClasses?.map((listElement) => (
                                        <CommandItem
                                          value={
                                            listElement.name +
                                            " - " +
                                            listElement.schoolName
                                          }
                                          key={listElement.classId}
                                          onSelect={(e) => {
                                            form.setValue(
                                              "classId",
                                              listElement.classId,
                                              { shouldDirty: true },
                                            );
                                            setSelectedClass(e);
                                          }}
                                        >
                                          {listElement.name +
                                            " - " +
                                            listElement.schoolName}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              listElement.name +
                                                " - " +
                                                listElement.schoolName ===
                                                selectedClass
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                        </CommandItem>
                                      ))
                                    )
                                  ) : (
                                    <CommandEmpty>
                                      Enter class name
                                    </CommandEmpty>
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col w-full gap-5 h-full justify-center items-center">
                    <Button
                      type="submit"
                      className="bg-blue py-2 hover:bg-blueLight text-white"
                      disabled={!(isDirty && !updatingChild)}
                    >
                      {updatingChild ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          Updating Profile..
                        </span>
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="bg-red hover:bg-redLight text-white py-2"
                      onClick={handleDelete}
                      disabled={deletingChild || loadingChild}
                    >
                      {deletingChild ? (
                        <span className="flex items-center gap-2">
                          <Spinner />
                          Deleting Profile..
                        </span>
                      ) : (
                        "Delete Profile"
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

export default EditChildPage;
