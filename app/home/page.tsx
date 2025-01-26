"use client";

import {Sidebar} from "@/components/sidebar";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Activity, ActivityCard} from "@/components/activity-card";
import {Header} from "@/components/Header";
import {useGetTransactionHistory, useUserData} from "@/queries/user";
import React from "react";
import {useRouter} from "next/navigation";

const HomePage = () => {
    const router = useRouter();
    const { data: userData, isLoading: loadingUser } = useUserData();
    const { data: rawActivityData, isLoading: loadingActivities, error } =
        useGetTransactionHistory();

    const activityData: Activity[] =
        rawActivityData?.map((transaction) => ({
            id: transaction.transactionId,
            title: transaction.title,
            transactionType: transaction.type,
            amount: transaction.amount.toFixed(2),
            date: new Date(transaction.date).toLocaleDateString(),
            paidBy: transaction.sourceAccountNumber
        })) || [];

    const handleViewDetails = (id: string) => {
        router.push(`/balances/transaction//${id}`);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Upper screen */}
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

            {/* Lower screen */}
            <div className="flex w-full h-full overflow-hidden">
                {/* Left section */}
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>
                {/* Right section */}
                <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">

                    {/* Activities history */}
                    <div className="flex flex-col w-full h-full items-center overflow-y-auto pr-[59px]">
                        <div className="flex flex-col w-full max-w-[1423px] gap-[54px] pt-[34px] mb-10">
                            {loadingActivities ? (
                                <p>Loading activities...</p>
                            ) : error ? (
                                <p>Error loading activities.</p>
                            ) : (
                                activityData.map((activity, index) => (
                                    <ActivityCard key={index} activity={activity}
                                                  onViewDetails={() => handleViewDetails(activity.id)} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
