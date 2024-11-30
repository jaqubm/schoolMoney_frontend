import React from "react";

const FundraiserCard = ({ fundraiser }: { fundraiser: any }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="font-bold text-lg">{fundraiser.title}</h3>
      <p className="text-sm text-gray-600">{fundraiser.description}</p>
      <p className="text-sm text-blue-600 mt-2">Details</p>
    </div>
  );
};

export default FundraiserCard;
