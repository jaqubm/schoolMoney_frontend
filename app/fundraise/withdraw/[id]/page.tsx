"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserData } from "@/queries/user";
import {
  useGetFundraiseById,
  useWithdrawFromFundraise,
} from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import PaymentForm from "@/components/fundraiser/PaymentForm";
import PageHeader from "@/components/PageHeader/PageHeader";

type WithdrawFromFundraiserData = {
  amount: string;
};

const schema = z.object({
  amount: z
    .string()
    .regex(/^\d+$/, "Donation amount must be a number.")
    .refine((value) => Number(value) > 0, {
      message: "Donation amount  cannot be less than 0.",
    })
    .refine((value) => Number(value) <= 10000, {
      message: "Donation amount be greater than 10,000.",
    }),
});

const WithdrawFromFundraisePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: userData, isLoading: loadingUser } = useUserData();

  const withdrawFromFundraise = useWithdrawFromFundraise();
  const { data: fundraiserDetails, isLoading, error } = useGetFundraiseById(id);

  const { handleSubmit, control } = useForm<WithdrawFromFundraiserData>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      amount: "0",
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h3>Loading fundraiser details...</h3>
        <Spinner size="large" show className="text-black" />
      </div>
    );
  }

  if (error || !fundraiserDetails) {
    return <div>Error fetching fundraiser details.</div>;
  }

  const onSubmit = (data: WithdrawFromFundraiserData) => {
    const backendData = {
      amount: parseFloat(data.amount),
      destinationAccountNumber: fundraiserDetails.accountNumber,
      fundraiseId: id as string,
    };

    withdrawFromFundraise.mutate(backendData, {
      onSuccess: () => {
        toast({ title: "Fundraiser withdrawal successful" });
        router.push(`/fundraise/${id}`);
      },
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser
              ? "Loading..."
              : `Welcome, ${userData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                  "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full items-center overflow-y-auto gap-16">
          <PageHeader
            title={`${fundraiserDetails?.title} - Transaction History`}
            subtitle={`${fundraiserDetails.className} ${fundraiserDetails.schoolName}`}
          ></PageHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start p-6 w-fit h-fit gap-6 shadow-lg rounded-md bg-white"
          >
            <PaymentForm
              hintMessage={"Enter the amount you want to withdraw"}
              control={control}
              name={"amount"}
              placeholder={"Enter amount"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFromFundraisePage;
