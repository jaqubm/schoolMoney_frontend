"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { StaticImagePicker } from "@/components/fundraiser/StaticImagePicker";

const FundraiserStep1Form = () => {
  const { register, formState, setValue, getValues } = useFormContext();
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [tempImageId, setTempImageId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImage = (imageValue: number | null) => {
    setTempImageId(imageValue);
    setValue("imageIndex", tempImageId, { shouldValidate: true });

    if (tempImageId !== null) {
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    const storedImageId = getValues("imageIndex");

    if (storedImageId !== undefined && storedImageId !== null) {
      setSelectedImageId(storedImageId);
      setTempImageId(storedImageId);
    }
  }, [getValues]);

  return (
    <div className="flex flex-col items-center p-6 shadow-lg rounded-md bg-white">
      <div className="flex flex-wrap justify-between w-full max-w-4xl gap-6">
        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Name
          </label>
          <Input
            {...register("title")}
            placeholder="Fundraiser Name"
            className="w-full"
          />
          {formState.errors.title?.message &&
          typeof formState.errors.title.message === "string" ? (
            <p className="text-xs text-red mt-1">
              {formState.errors.title.message?.toString()}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Give your fundraiser a short and clean name
            </p>
          )}
        </div>

        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Description
          </label>
          <Textarea
            {...register("description")}
            placeholder="Fundraiser Description"
            className="w-full resize-none"
          />
          {formState.errors.description?.message &&
          typeof formState.errors.description.message === "string" ? (
            <p className="text-xs text-red mt-1">
              {formState.errors.description.message?.toString()}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Describe the purpose of the fundraiser and its impact
            </p>
          )}
        </div>

        <div className="flex flex-col w-[48%]">
          <label className="text-sm font-medium text-secondary mb-1">
            Fundraiser Goal
          </label>
          <Input
            {...register("goalAmount", { valueAsNumber: true })}
            placeholder="Fundraiser Goal"
            className="w-full"
          />
          {formState.errors.goalAmount?.message &&
          typeof formState.errors.goalAmount.message === "string" ? (
            <p className="text-xs text-red mt-1">
              {formState.errors.goalAmount.message?.toString()}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Set a clear and achievable goal
            </p>
          )}
        </div>

        <div className="flex flex-col w-[48%] justify-end items-center">
          <div className="flex-1 w-full">
            <StaticImagePicker
              imageIndex={getValues("imageIndex")}
              onChange={handleImage}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserStep1Form;
