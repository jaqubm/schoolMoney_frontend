"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetFundraiseById, useUpdateFundraise } from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/queries/user";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchClassesByName } from "@/queries/classes/classes";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "./edit.styles.css";
import { StaticImagePicker } from "@/components/fundraiser/StaticImagePicker";
import PageHeader from "@/components/PageHeader/PageHeader";

type FundraiseFormData = {
  title: string;
  description: string;
  goalAmount: string;
  startDate: string;
  endDate: string;
  classId: string;
  imageIndex: number | null;
};

type FundraiseBackendData = {
  title: string;
  description: string;
  goalAmount: number;
  startDate: string;
  endDate: string;
  classId: string;
  imageIndex: number;
};

const schema = z
  .object({
    title: z
      .string()
      .min(6, "Title must be at least 6 characters long.")
      .max(255, "Title must be maximum 255 characters long")
      .regex(
        /^[a-zA-Z\u00C0-\u017F\s]+$/,
        "Only letters and spaces are allowed.",
      ),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
      .max(500, "Title must be maximum 500 characters long")
      .regex(
        /^[a-zA-Z\u00C0-\u017F\s]+$/,
        "Only letters and spaces are allowed.",
      ),
    goalAmount: z
      .string()
      .regex(/^\d+$/, "Goal amount must be a number.")
      .refine((value) => Number(value) > 0, {
        message: "Goal amount must be greater than zero.",
      })
      .refine((value) => Number(value) <= 10000, {
        message: "Goal amount must not exceed 10,000.",
      }),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().min(1, "End date is required."),
    classId: z.string().min(1, "Class name is required."),
    imageIndex: z.number().min(0),
  })
  .superRefine((data, ctx) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (endDate <= startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be after the start date.",
      });
    }
  });

const EditFundraisePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [tempImageId, setTempImageId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<FundraiseFormData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      goalAmount: "",
      startDate: "",
      endDate: "",
      classId: "",
      imageIndex: 0,
    },
  });

  const updateFundraise = useUpdateFundraise();
  const {
    data: fundraiserDetails,
    isLoading,
    error,
  } = useGetFundraiseById(id as string);
  const { data: classes, isLoading: isClassesLoading } =
    useFetchClassesByName(searchTerm);

  useEffect(() => {
    if (fundraiserDetails) {
      setValue("title", fundraiserDetails.title);
      setValue("description", fundraiserDetails.description);
      setValue("goalAmount", fundraiserDetails.goalAmount.toString());
      setValue("startDate", formatDate(fundraiserDetails.startDate));
      setValue("endDate", formatDate(fundraiserDetails.endDate));
      setValue("classId", fundraiserDetails.classId);
      setValue("imageIndex", fundraiserDetails.imageIndex);

      setSelectedClass(fundraiserDetails.className);
    }
  }, [fundraiserDetails, setValue]);

  const onSubmit = (data: FundraiseFormData) => {
    const backendData: FundraiseBackendData = {
      ...data,
      goalAmount: parseFloat(data.goalAmount),
      imageIndex: data.imageIndex ? data.imageIndex : 0,
    };

    updateFundraise.mutate(
      { fundraiseId: id as string, data: backendData },
      {
        onSuccess: () => {
          toast({ title: "Fundraiser updated successfully" });
          router.push(`/fundraise/${id}`);
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedClass(null);
    setValue("classId", "");
  };

  const handleClassSelect = (classItem: any) => {
    setValue("classId", classItem.classId, { shouldValidate: true });
    setSelectedClass(classItem.name);
    setSearchTerm("");
  };

  const formatDate = (date: string): string => {
    if (!date) return "";
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const handleImage = (imageValue: number | null) => {
    setTempImageId(imageValue);
    setValue("imageIndex", tempImageId, { shouldValidate: true });

    if (tempImageId !== null) {
      setIsDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h3>Loading fundraiser details...</h3>
        <Spinner size="large" show className="text-black" />
      </div>
    );
  }

  if (error || !fundraiserDetails) {
    return <div>Error fetching fundraiser details.</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen">
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

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full items-center overflow-y-auto">
          <PageHeader
            title={"Edit Fundraiser"}
            subtitle={`Update your fundraiser "${fundraiserDetails.title}"`}
          ></PageHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start p-6 w-2/3 h-fit gap-6 rounded-md border"
          >
            <div className="flex w-full gap-6">
              <div className="flex w-[48%] flex-col justify-between gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    Fundraiser Name
                  </label>
                  <Input {...register("title")} />
                  {errors.title ? (
                    <p className="text-red text-xs mt-1">
                      {errors.title.message}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Give your fundraiser a short and clean name
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    Fundraiser Goal
                  </label>
                  <Input type="text" {...register("goalAmount")} />
                  {errors.goalAmount ? (
                    <p className="text-red text-xs mt-1">
                      {errors.goalAmount.message}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-1">
                      Set a clear and achievable goal
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    Fundraiser Description
                  </label>
                  <Textarea
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                      pattern: {
                        value: /^[a-zA-ZÀ-Żà-ż\s]+$/,
                        message:
                          "Description can only contain alphabetic characters",
                      },
                    })}
                    className="w-full resize-none"
                  />
                  {errors.description ? (
                    <p className="text-red text-xs mt-1">
                      {errors.description.message}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-1">
                      Describe the purpose of the fundraiser and its impact
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col w-[48%] gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    Class Name
                  </label>
                  <div className="relative">
                    <Input
                      name="classId"
                      type="text"
                      placeholder=""
                      maxLength={20}
                      className="w-full p-2 border rounded-md"
                      value={selectedClass || searchTerm}
                      onChange={handleInputChange}
                    />
                    {errors.classId ? (
                      <p className="text-red text-xs mt-1">
                        {errors.classId.message}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-xs mt-1">
                        Assign this fundraiser to a specific class
                      </p>
                    )}

                    {searchTerm && (
                      <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-48 overflow-y-auto">
                        {isClassesLoading ? (
                          <li className="p-2 text-gray-500">Loading...</li>
                        ) : classes && classes.length > 0 ? (
                          classes.map((classItem: any) => (
                            <li
                              key={classItem.classId}
                              className="p-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => handleClassSelect(classItem)}
                            >
                              {classItem.name} ({classItem.schoolName})
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-500">
                            No classes found
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    {...register("startDate", {
                      required: "Start date is required",
                    })}
                    // className="w-full"
                  />
                  {errors.startDate ? (
                    <p className="text-red text-xs mt-1">
                      {errors.startDate.message}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-1">
                      {"Select the starting date for your fundraiser"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-secondary mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    {...register("endDate", {
                      required: "End date is required",
                      validate: (value) =>
                        new Date(value) > new Date() ||
                        "End date must be in the future",
                    })}
                    className="w-full"
                  />
                  {errors.endDate ? (
                    <p className="text-red text-xs mt-1">
                      {errors.endDate.message}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-xs mt-1">
                      {"Select the ending date for your fundraiser"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-6 justify-between items-end w-full">
              <div className="flex-1">
                <StaticImagePicker
                  imageIndex={getValues("imageIndex")}
                  onChange={handleImage}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </div>

              <div className="flex flex-1 justify-end items-center">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={`${
                    isValid
                      ? "bg-blue text-white hover:bg-blueLight"
                      : "bg-grayLight text-secondary cursor-not-allowed"
                  } px-6 py-2 rounded-md w-1/4`}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFundraisePage;
