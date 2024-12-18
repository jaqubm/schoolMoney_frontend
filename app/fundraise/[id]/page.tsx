"use client";

// import { useRouter } from "next/navigation";
// import { useGetFundraises } from "@/queries/user";
// import { FundraiseDetails } from "@/app/user/User.types";

const FundraiserDetailsPage = () => {
  // const router = useRouter();
  // const { id } = router.query; // Pobierz ID z dynamicznej ścieżki
  // const { data: fundraises = [] } = useGetFundraises();
  // const fundraiser = fundraises.find(
  //   (f) => f.classId === id,
  // ) as FundraiseDetails;
  // if (!fundraiser) {
  //   return <div>Loading...</div>;
  // }
  //
  // return (
  //   <div className="p-6">
  //     <h1 className="text-3xl font-bold">{fundraiser.title}</h1>
  //     <p className="text-lg text-gray-600 mt-4">{fundraiser.description}</p>
  //     <div className="mt-6">
  //       <p>Goal: ${fundraiser.goalAmount}</p>
  //       <p>Raised: ${fundraiser.raisedAmount}</p>
  //       <p>Total Supporters: {fundraiser.totalSupporters}</p>
  //       <p>Start Date: {new Date(fundraiser.startDate).toLocaleDateString()}</p>
  //       <p>End Date: {new Date(fundraiser.endDate).toLocaleDateString()}</p>
  //     </div>
  //   </div>
  // );
};

export default FundraiserDetailsPage;
