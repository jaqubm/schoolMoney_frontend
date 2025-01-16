"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/queries/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWithdraw } from "@/queries/transaction";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  withdrawSchema,
  WithdrawFormValues,
} from "@/app/balances/withdraw/withdrawValidationRules";

export default function WithdrawScreen() {
  const router = useRouter();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { mutate: makeWithdraw, isLoading: withdrawLoading } = useWithdraw();

  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      title: "",
      amount: 0,
      recipient: "",
      accountNumber: "",
    },
  });

  const handleWithdraw = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      makeWithdraw(
        {
          amount: data.amount,
          destinationAccountNumber: data.accountNumber,
        },
        {
          onSuccess: () => {
            toast({
              title: "Withdrawal successful",
              description: "The funds have been successfully withdrawn.",
            });
            router.push("/balances");
          },
          onError: () => {
            toast({
              title: "Withdrawal failed",
              description: "There was an error processing your withdrawal.",
              variant: "destructive",
            });
          },
        },
      );
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Header */}
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

      {/* Main Content */}
      <div className="flex w-full h-full overflow-hidden">
        {/* Sidebar */}
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        {/* Withdraw Section */}
        <div className="flex flex-col w-full h-full px-16 py-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-secondary hover:text-gray-800"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-lg font-bold">Withdraw funds</span>
            </button>
          </div>

          <div className="flex p-8 w-full h-full max-h-80 max-w-3xl mx-auto border mt-3 rounded-lg">
            <form className="flex justify-evenly items-center content-around h-full w-full flex-wrap">
              {/* Title Field */}
              <div className="flex flex-col w-full max-w-80">
                <label htmlFor="title" className="text-gray-500 mb-1">
                  Title
                </label>
                <Input
                  id="title"
                  placeholder="Title"
                  {...form.register("title")}
                />
                {form.formState.errors.title && (
                  <span className="text-red text-sm">
                    {form.formState.errors.title.message}
                  </span>
                )}
              </div>

              {/* Amount Field */}
              <div className="flex flex-col w-full max-w-80">
                <label htmlFor="amount" className="text-gray-500 mb-1">
                  Amount [PLN]
                </label>
                <Input
                  id="amount"
                  type="number"
                  {...form.register("amount", {
                    valueAsNumber: true,
                  })}
                />
                {form.formState.errors.amount && (
                  <span className="text-red text-sm">
                    {form.formState.errors.amount.message}
                  </span>
                )}
              </div>

              {/* Recipient Field */}
              <div className="flex flex-col w-full max-w-80">
                <label htmlFor="recipient" className="text-gray-500 mb-1">
                  To recipient
                </label>
                <Input
                  id="recipient"
                  placeholder="Recipient"
                  {...form.register("recipient")}
                />
                {form.formState.errors.recipient && (
                  <span className="text-red text-sm">
                    {form.formState.errors.recipient.message}
                  </span>
                )}
              </div>

              {/* Account Number Field */}
              <div className="flex flex-col w-full max-w-80">
                <label htmlFor="accountNumber" className="text-gray-500 mb-1">
                  To account number
                </label>
                <Input
                  id="accountNumber"
                  placeholder="Account number"
                  {...form.register("accountNumber")}
                />
                {form.formState.errors.accountNumber && (
                  <span className="text-red text-sm">
                    {form.formState.errors.accountNumber.message}
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleWithdraw}
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
              disabled={withdrawLoading}
            >
              {withdrawLoading ? "Processing..." : "Withdraw funds"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
