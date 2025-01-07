"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import React from "react";
import { useParams } from "next/navigation";
import { useUserData } from "@/queries/user";
import { useGetFundraiseById } from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import PageHeader from "@/components/PageHeader/PageHeader";

const FundraiserTransactionHistoryPage = () => {
  const { id } = useParams();
  const { data: user } = useUserData();

  const { data: fundraiserDetails, isLoading, error } = useGetFundraiseById(id);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h3>Loading details...</h3>
        <Spinner size="large" show className="text-black" />
      </div>
    );
  }

  if (error || !fundraiserDetails) {
    return <div>Error fetching details.</div>;
  }

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <div className="flex items-center gap-4">
          <span className="text-base">Welcome, {user?.name || "User"}</span>
          <Avatar>
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full items-center overflow-y-auto">
          <PageHeader
            title={`${fundraiserDetails?.title} - Transaction History`}
            subtitle={`${fundraiserDetails.className} ${fundraiserDetails.schoolName}`}
          ></PageHeader>
        </div>
      </div>
    </div>
  );
};

export default FundraiserTransactionHistoryPage;
