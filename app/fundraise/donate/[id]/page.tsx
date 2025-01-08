"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserData } from "@/queries/user";
import { useGetFundraiseById } from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransfer } from "@/queries/transaction";
import PageHeader from "@/components/PageHeader/PageHeader";

type DonateFundraiserData = {
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

const DonateFundraisePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: user } = useUserData();
  const donateFundraise = useTransfer();
  const { data: fundraiserDetails, isLoading, error } = useGetFundraiseById(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DonateFundraiserData>({
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

  const onSubmit = (data: DonateFundraiserData) => {
    const backendData = {
      amount: parseFloat(data.amount),
      destinationAccountNumber: fundraiserDetails.accountNumber,
    };

    donateFundraise.mutate(backendData, {
      onSuccess: () => {
        toast({ title: "Fundraiser donated successfully" });
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

        <div className="flex flex-col w-full h-full items-center overflow-y-auto gap-16">
          <PageHeader
            title={"Donate Fundraiser"}
            subtitle={`Donate to "${fundraiserDetails.title}" fundraiser`}
          ></PageHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start p-6 w-fit h-fit gap-6 shadow-lg rounded-md bg-white"
          >
            <div className="flex flex-col w-fit h-fit gap-6 justify-center items-center">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-secondary mb-1">
                  Amount
                </label>
                <Input {...register("amount")} />
                {errors.amount ? (
                  <p className="text-red text-xs mt-1">
                    {errors.amount.message}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the amount you want to donate{" "}
                  </p>
                )}
              </div>

              <div className="flex w-full justify-center items-center">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={`${
                    isValid
                      ? "bg-blue text-white hover:bg-blueLight"
                      : "bg-grayLight text-secondary cursor-not-allowed"
                  } px-6 py-2 rounded-md w-1/4`}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateFundraisePage;
