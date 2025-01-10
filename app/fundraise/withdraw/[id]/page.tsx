"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
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
  const { data: user } = useUserData();

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
          <div className="flex flex-col w-full h-fit p-3 pr-4 pl-6 pb-20 pt-6">
            <div className="flex justify-start items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-4 text-secondary"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>

              <div className="text-lg text-secondary">
                Withdraw Funds from Fundraiser
              </div>
            </div>
            <div>
              <div className="text-xs text-grayMedium pl-9 pt-1">
                Withdraw from &#34;{fundraiserDetails?.title}&#34; fundraiser
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start p-6 w-fit h-fit gap-6 shadow-lg rounded-md bg-white"
          >
            <PaymentForm
              hintMessage={"Enter the amount you want to withdraw"}
              control={control}
              name={"amount"}
              placeholder={"Amount"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFromFundraisePage;
