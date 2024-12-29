"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetFundraiseById, useUpdateFundraise } from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/queries/user";
import images from "@/public/images";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchClassesByName } from "@/queries/classes/classes";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { clsx } from "clsx";
import "./edit.styles.css";

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
      .regex(
        /^[a-zA-Z\u00C0-\u017F\s]+$/,
        "Only letters and spaces are allowed.",
      ),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
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
    // const today = new Date();

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
  const { data: user } = useUserData();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
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
    mode: "onChange",
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

      setSelectedClass(fundraiserDetails.className);
    }
  }, [fundraiserDetails, setValue]);

  useEffect(() => {
    const storedImageId = getValues("imageIndex");
    if (storedImageId !== undefined && storedImageId !== null) {
      setSelectedImageId(storedImageId);
    }
  }, [getValues]);

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

  const handleSelectTempImage = (imageId: number) => {
    setTempImageId(imageId);
  };

  const handleSubmitImage = () => {
    if (tempImageId !== null) {
      setSelectedImageId(tempImageId);
      setValue("imageIndex", tempImageId, { shouldValidate: true });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImageId(null);
    setTempImageId(null);
    setValue("imageIndex", null, { shouldValidate: true });
  };

  if (isLoading) {
    return <div>Loading fundraiser details...</div>;
  }

  if (error || !fundraiserDetails) {
    return <div>Error fetching fundraiser details.</div>;
  }
  const imageSrc = images[fundraiserDetails.imageIndex] || images[0];

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <div className="flex items-center gap-4">
          <span className="text-base">Welcome, {user?.name || "User"}</span>
          <Avatar>
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full items-center overflow-y-auto">
          <div className="flex flex-col w-full h-fit p-3 pr-4 pl-6 pb-6 pt-6">
            <div className="flex justify-start items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-4 text-secondary"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>

              <div className="text-lg text-secondary">Edit Fundraiser</div>
            </div>
            <div>
              <div className="text-xs text-grayMedium pl-9 pt-1">
                Update your fundraiser &#34;{fundraiserDetails?.title}&#34;
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start p-6 w-2/3 h-fit gap-6 shadow-lg rounded-md bg-white"
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

            <div>
              <div className="flex flex-col w-full">
                <label className="justify-start text-sm font-medium text-secondary mb-1">
                  Fundraiser Image
                </label>

                {selectedImageId !== null ? (
                  <div className="flex items-center justify-start gap-4 border-2 border-dashed border-gray-200 h-20 p-3">
                    <img
                      src={images[selectedImageId]}
                      alt={`Selected image ${selectedImageId}`}
                      className="w-12 h-12 rounded-full"
                    />
                    <Button
                      onClick={handleDeleteImage}
                      className={clsx(
                        "border font-poppins bg-red text-primary",
                        "hover:bg-redLight",
                      )}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-start gap-4 border-2 border-dashed border-gray-200 h-20 p-3">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      {selectedImageId === null && (
                        <DialogTrigger asChild>
                          <Button
                            className={clsx(
                              "border font-poppins bg-blue text-primary",
                              "hover:bg-blueLight",
                            )}
                            onClick={() => setIsDialogOpen(true)}
                          >
                            Select Image
                          </Button>
                        </DialogTrigger>
                      )}

                      <DialogContent className="max-w-lg mx-auto">
                        <DialogHeader>
                          <h2 className="text-lg font-bold font-poppins">
                            Select an Image
                          </h2>
                        </DialogHeader>
                        {tempImageId !== null && (
                          <div className="mb-4">
                            <img
                              src={images[tempImageId]}
                              alt={`Selected image ${tempImageId}`}
                              className="w-[500px] h-[300px] object-cover rounded-md"
                            />
                          </div>
                        )}

                        <div className="flex justify-center gap-2 mb-4">
                          {images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Image ${index}`}
                              className={`w-16 h-16 rounded-md cursor-pointer border ${
                                tempImageId === index
                                  ? "border-blue-500"
                                  : "border-gray-300"
                              }`}
                              onClick={() => handleSelectTempImage(index)}
                            />
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={handleSubmitImage}
                        className={clsx(
                          "border font-poppins bg-blue text-primary",
                          "hover:bg-blueLight",
                        )}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isValid}
                className={`${
                  isValid
                    ? "bg-blue text-white hover:bg-blueLight"
                    : "bg-grayLight text-secondary cursor-not-allowed"
                } px-6 py-2 rounded-md`}
              >
                Submit
              </Button>
            </div>
          </form>

          {/*<div className="flex items-center justify-center pt-8">*/}
          {/*  */}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default EditFundraisePage;
