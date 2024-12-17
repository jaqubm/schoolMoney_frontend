// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "@/app/api";
// import FundraiserCard from "@/components/fundraiser/FundraiserCard";
//
// const fetchFundraisers = async () => {
//   const response = await axiosInstance.get("/Fundraise/GetAll");
//   return response.data;
// };
//
// const FundraisersList = () => {
//   const { data, isLoading, error } = useQuery(
//     ["fundraisers"],
//     fetchFundraisers,
//   );
//
//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Failed to load fundraisers</p>;
//
//   return (
//     <div className="flex flex-col gap-4">
//       {data.map((fundraiser: any) => (
//         <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
//       ))}
//     </div>
//   );
// };
//
// export default FundraisersList;

import React from "react";

const FundraisersList = () => {
  const fundraisers = [
    {
      id: 1,
      title: "Trip to Zoo",
      description:
        "We are raising funds to take the students of Class 1A on an educational trip to the local zoo.",
      image: "/path-to-zoo-image.jpg",
    },
    {
      id: 2,
      title: "School Library Renovation",
      description:
        "Help us renovate the school library to create a better learning environment for our students.",
      image: "/path-to-library-image.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {fundraisers.map((fundraiser) => (
        <div
          key={fundraiser.id}
          className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
        >
          <img
            src={fundraiser.image}
            alt={fundraiser.title}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold">{fundraiser.title}</h3>
            <p className="text-sm text-gray-600">{fundraiser.description}</p>
          </div>
          <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-md">
            Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default FundraisersList;
