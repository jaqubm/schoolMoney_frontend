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

const EditFundraisePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: user } = useUserData();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: 0,
    startDate: "",
    endDate: "",
    imageIndex: 0,
    classId: "",
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

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
      setFormData({
        title: fundraiserDetails.title,
        description: fundraiserDetails.description,
        goalAmount: fundraiserDetails.goalAmount,
        startDate: fundraiserDetails.startDate,
        endDate: fundraiserDetails.endDate,
        imageIndex: fundraiserDetails.imageIndex,
        classId: fundraiserDetails.classId,
      });
      setSelectedClass(fundraiserDetails.className);
    }
  }, [fundraiserDetails]);

  const validateForm = () => {
    const titleRegex = /^[a-zA-ZÀ-Żà-ż\s]+$/;
    const descriptionRegex = /^[a-zA-ZÀ-Żà-ż\s]+$/;

    const isTitleValid =
      formData.title.trim().length >= 6 && titleRegex.test(formData.title);
    const isDescriptionValid =
      formData.description.trim().length >= 10 &&
      descriptionRegex.test(formData.description);
    const isGoalValid =
      !isNaN(Number(formData.goalAmount)) && Number(formData.goalAmount) > 0;
    const isDateValid =
      new Date(formData.startDate) < new Date(formData.endDate);
    const isClassSelected = selectedClass !== null;

    return (
      isTitleValid &&
      isDescriptionValid &&
      isGoalValid &&
      isDateValid &&
      isClassSelected
    );
  };

  useEffect(() => {
    setIsSubmitEnabled(validateForm());
  }, [formData, selectedClass]);

  const handleSubmit = () => {
    if (!isSubmitEnabled) return;

    updateFundraise.mutate(
      { fundraiseId: id as string, data: formData },
      {
        onSuccess: () => {
          toast({
            title: "Fundraiser updated successfully",
          });
          router.push(`/fundraise/${id}`);
        },
      },
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedClass(null);
  };

  const handleClassSelect = (classItem: any) => {
    setFormData((prev) => ({ ...prev, classId: classItem.classId }));
    setSelectedClass(classItem.name);
    setSearchTerm("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (date: string): string => {
    if (!date) return "";
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split("T")[0]; // YYYY-MM-DD
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

          <div className="flex items-start p-6 w-2/3 h-fit gap-6 shadow-lg rounded-md bg-white">
            <div className="flex w-[48%] flex-col justify-between gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Fundraiser Name
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  maxLength={15}
                  onChange={handleChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Give your fundraiser a short and clean name
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Fundraiser Goal
                </label>
                <Input
                  name="goalAmount"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Set a clear and achievable goal
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Fundraiser Description
                </label>
                <Textarea
                  name="description"
                  placeholder=""
                  maxLength={50}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe the purpose of the fundraiser and its impact
                </p>
              </div>
            </div>

            <div className="flex flex-col w-[48%] justify-between gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Class Name
                </label>
                <Input
                  name="className"
                  type="text"
                  placeholder=""
                  maxLength={20}
                  className="w-full p-2 border rounded-md"
                  value={selectedClass || searchTerm}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Assign this fundraiser to a specific class{" "}
                </p>

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
                      <li className="p-2 text-gray-500">No classes found</li>
                    )}
                  </ul>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Start Date
                </label>
                <Input
                  name="startDate"
                  placeholder=""
                  type="date"
                  value={formatDate(formData.startDate)}
                  onChange={handleChange}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select the starting date for your fundraiser{" "}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  End Date
                </label>
                <Input
                  name="endDate"
                  placeholder=""
                  type="date"
                  value={formatDate(formData.endDate)}
                  onChange={handleChange}
                  className="w-full resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select the ending date for your fundraiser{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-8">
            <Button
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
              className={`${
                isSubmitEnabled
                  ? "bg-blue text-white hover:bg-blueLight"
                  : "bg-grayLight text-secondary cursor-not-allowed"
              } px-6 py-2 rounded-md`}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFundraisePage;
