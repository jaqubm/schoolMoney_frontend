"use client";

import React from "react";
import { FundraiseDetails } from "@/app/user/User.types";
import { useRouter } from "next/navigation";
import images from "@/public/images";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import Image from "next/image";

const FundraiserCard = ({ fundraiser }: { fundraiser: FundraiseDetails }) => {
  const router = useRouter();
  const imageSrc = images[fundraiser.imageIndex] || images[0];

  return (
    <div className="border rounded-lg p-4 shadow-md flex gap-7 w-full ">
      <div className="relative w-32 h-28 rounded-full overflow-hidden flex items-center">
        <Image
          alt="fundraiser Image"
          src={imageSrc}
          width={111}
          height={111}
          className="w-full h-full object-cover"
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
            className={clsx(
              "font-poppins text-sm w-32 h-6 rounded-bl bg-blue text-primary shadow",
              "hover:bg-blueLight",
            )}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FundraiserCard;
