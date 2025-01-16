"use client";

import React, { useState } from "react";
import { FundraiseDetails } from "@/app/user/User.types";
import { useRouter } from "next/navigation";
import images from "@/public/images";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { Spinner } from "@/components/Spinner";

const FundraiserCard = ({ fundraiser }: { fundraiser: FundraiseDetails }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const imageSrc = images[fundraiser.imageIndex] || images[0];

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex gap-7 w-full ">
      <div className="relative w-32 h-28 rounded-full overflow-hidden flex items-center">
        {isLoading && (
          <div className="absolute flex items-center justify-center w-full h-full">
            <Spinner size="small" />
          </div>
        )}
        <img
          src={imageSrc}
          className={clsx("w-full h-full object-cover", isLoading && "hidden")}
          onLoad={handleImageLoad}
          alt="Fundraiser"
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="text-sm text-grayMedium">
          Klasa {fundraiser.className} ({fundraiser.schoolName})
        </p>
        <h3 className="text-lg font-bold pb-2">{fundraiser.title}</h3>
        <p className="text-sm pt-2 text-grayMedium">{fundraiser.description}</p>
        <div className="flex justify-end items-center">
          <Button
            variant="default"
            onClick={() => router.push(`/fundraise/${fundraiser.fundraiseId}`)}
            className={clsx("text-white bg-blue hover:bg-blueLight")}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundraiserCard;
