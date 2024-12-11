import React from "react";
import { FundraiseDetails } from "@/app/user/User.types";
import { useRouter } from "next/navigation";

const FundraiserCard = ({ fundraiser }: { fundraiser: FundraiseDetails }) => {
  const router = useRouter();

  return (
    <div
      className="border rounded-lg p-4 shadow-md flex gap-4 cursor-pointer"
      // onClick={() => router.push(`/fundraise/${fundraiser.}`)}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img
          src={`/images/${fundraiser.imageIndex}.jpg`}
          alt={fundraiser.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-bold text-lg">{fundraiser.title}</h3>
        <p className="text-sm text-gray-600">{fundraiser.description}</p>
        <p className="text-sm text-blue-600 mt-2">Details</p>
      </div>
    </div>
  );
};

export default FundraiserCard;
