"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
// import { ID_TO_PICTURE } from "@/constants/pictures";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

const images = [
  "/images/computers.jpg",
  "/images/money.jpg",
  "/images/museum.jpg",
  "/images/train.jpg",
];

const FundraiserStep1Form = () => {
  const { register, formState, setValue, getValues } = useFormContext();
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [tempImageId, setTempImageId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <p className="text-xs text-red-500 mt-1">
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
            <p className="text-xs text-red-500 mt-1">
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
            <p className="text-xs text-red-500 mt-1">
              {formState.errors.goalAmount.message?.toString()}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Set a clear and achievable goal
            </p>
          )}
        </div>

        <div className="flex flex-col w-[48%] justify-end items-center">
          <div className="flex items-center gap-4">
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
              </DialogContent>
            </Dialog>
          </div>

          {selectedImageId !== null && (
            <div className="flex items-center gap-4 mt-4">
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
          )}
          {formState.errors.classId?.message &&
          typeof formState.errors.classId.message === "string" ? (
            <p className="text-xs text-red-500 mt-1">
              {formState.errors.classId.message?.toString()}
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Select an image for your fundraiser. You can remove it anytime.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundraiserStep1Form;
