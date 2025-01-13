import images from "@/public/images";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import Image from "next/image";

type StaticImagePickerProps = {
  imageIndex: number | null;
  onChange: (value: number | null) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};

const DEFAULT_VALUE = 0;

export const StaticImagePicker = ({
  imageIndex,
  onChange,
  setIsDialogOpen,
  isDialogOpen,
}: StaticImagePickerProps) => {
  const [localValue, setLocalValue] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    if (!imageIndex) {
      return;
    }

    setLocalValue(imageIndex);
  }, [imageIndex]);

  const handleDeleteImage = () => {
    onChange(null);
    setLocalValue(DEFAULT_VALUE);
  };

  const handleSubmitImage = () => onChange(localValue);

  return (
    <div className="flex flex-col w-full">
      <label className="justify-start text-sm font-medium text-secondary mb-1">
        Fundraiser Image
      </label>

      {imageIndex != null ? (
        <div className="flex items-center justify-between gap-4 border-2 border-dashed border-gray-200 h-20 p-3">
          {/*<img*/}
          {/*    src={images[imageIndex]}*/}
          {/*    alt={`Selected image ${imageIndex}`}*/}
          {/*    className="w-12 h-12 rounded-full"*/}
          {/*/>*/}
          <Image
            src={images[imageIndex]}
            alt={`Selected image ${imageIndex}`}
            className="w-12 h-12 rounded-full"
            width={48}
            height={48}
          />
          <Button
            type={"button"}
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
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="border-blue"
                onClick={() => setIsDialogOpen(true)}
              >
                Select Image
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg mx-auto">
              <DialogHeader>
                <h2 className="text-lg font-bold font-poppins">
                  Select an Image
                </h2>
              </DialogHeader>
              {localValue !== null && (
                <div className="mb-4">
                  <Image
                    src={images[localValue]}
                    alt={`Selected image ${localValue}`}
                    className="w-[500px] h-[300px] object-cover rounded-md"
                    width={462}
                    height={300}
                  />
                </div>
              )}

              <div className="flex justify-center gap-2 mb-4">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className={`w-16 h-16 rounded-md cursor-pointer border-4 border-solid ${
                      localValue === index
                        ? "border-blue"
                        : "border-transparent"
                    }`}
                    onClick={() => setLocalValue(index)}
                    width={64}
                    height={64}
                  />
                ))}
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  onClick={handleSubmitImage}
                  className={clsx(
                    "border font-poppins bg-blue text-primary",
                    "hover:bg-blueLight",
                  )}
                >
                  Select image
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
