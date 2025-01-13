import React from "react";
import FundraiserCard from "@/components/fundraiser/FundraiserCard";
import { FundraiseDetails } from "@/app/user/User.types";

const FundraisersList = ({
  fundraises,
}: {
  fundraises: FundraiseDetails[];
}) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {fundraises.map((fundraise) => (
        <FundraiserCard key={fundraise.title} fundraiser={fundraise} />
      ))}
    </div>
  );
};

export default FundraisersList;
