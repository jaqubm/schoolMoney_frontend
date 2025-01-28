"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserData } from "@/queries/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeposit } from "@/queries/transaction";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  depositSchema,
  DepositFormValues,
} from "@/app/balances/deposit/depositValidationRules";

export default function DepositScreen() {
  const router = useRouter();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { mutate: makeDeposit, isLoading: depositLoading } = useDeposit();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      title: "",
      amount: 0,
      sourceAccountNumber: "",
    },
  });

  const handleDeposit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const data = form.getValues();
      makeDeposit({
        title: data.title,
        amount: data.amount,
        sourceAccountNumber: "", // Empty account number, it generates randomly on backend
      });
      router.push("/balances");
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* UserInfo */}
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

        {/* Deposit Section */}
        <div className="flex flex-col w-full h-full px-16 py-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-secondary hover:text-gray-800"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="text-lg font-bold">Make a deposit</span>
            </button>
          </div>

          <div className="flex p-8 w-full h-full max-h-80 max-w-3xl mx-auto border mt-3 rounded-lg">
            <form className="flex items-center content-around h-full w-full flex-wrap gap-2">
              <div className="flex w-full flex-col gap-4">
                {/* Title Field */}
                <div className="w-full">
                  <label htmlFor="title" className="text-gray-500">
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
                <div className="w-full">
                  <label htmlFor="amount" className="text-gray-500">
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
              </div>
            </form>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleDeposit}
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
              disabled={depositLoading}
            >
              {depositLoading ? "Processing..." : "Make a deposit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
