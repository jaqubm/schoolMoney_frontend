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
import { ArrowLeftIcon, Check, ChevronsUpDown } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { useSearchClasses } from "@/queries/class";

const editKidSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  classId: z.string(),
});

type EditKidFormValues = z.infer<typeof editKidSchema>;

const EditChildPage = () => {
  const { data: userData, isLoading: loadingUser } = useUserData();
  const router = useRouter();
  const { id } = useParams();
  const { data: childData, isLoading } = useGetChildProfile(id as string);
  const updateChildProfile = useUpdateChildProfile();
  const deleteChildProfile = useDeleteChildProfile();

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

  const form = useForm<EditKidFormValues>({
    resolver: zodResolver(editKidSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      classId: "",
    },
  });

  useEffect(() => {
    if (childData) {
      form.setValue("firstName", childData.name.split(" ")[0]);
      form.setValue("lastName", childData.name.split(" ")[1] || "");
      setEnteredClassName(childData.className);
    }
  }, [childData, form]);

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

  const handleUpdate = async (data: EditKidFormValues) => {
    await updateChildProfile.mutateAsync({
      childId: id as string,
      data: {
        name: `${data.firstName} ${data.lastName}`,
        classId: data.classId,
      },
    });
    router.push("/kids");
  };

  const handleDelete = async () => {
    await deleteChildProfile.mutateAsync(id as string);
    router.push("/kids");
  };

  if (isLoading) {
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
            <span className="text-xl font-bold">Kid's profile</span>
          </button>

          <div className="flex gap-10">
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
                  className="flex flex-col gap-5"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
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
                        <FormLabel>Last Name</FormLabel>
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Class</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? selectedClass : "Select class"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
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
                      Delete Profile
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
