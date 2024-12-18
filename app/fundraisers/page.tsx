"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";
import FundraisersList from "@/components/fundraiser/FundraisersList";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/activity-card";
import { clsx } from "clsx";
import { useGetFundraises, useUserData } from "@/queries/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FundraisersPage = () => {
  const router = useRouter();
  const { data: user } = useUserData();
  const { data: fundraises = [] } = useGetFundraises();
  const [filter, setFilter] = useState<"created" | "contributed">("created");

  const filteredFundraises = fundraises.filter((fundraise) => {
    if (filter === "created") return fundraise.isTreasurer;
    if (filter === "contributed") return !fundraise.isTreasurer;

    return true;
  });

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full max-w-[600px] h-12 px-4 text-base rounded-lg border border-gray-300 "
        />

        <Button
          variant="default"
          onClick={() => router.push("/newFundraiser")}
          className={clsx(
            "font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-primary shadow",
            "hover:bg-blueLight",
          )}
        >
          Start Fundraiser
        </Button>

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

        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-fit justify-start items-center gap-12 p-3 pl-6 pt-6">
            <h2 className="text-2xl font-bold">Fundraisers</h2>
            <div className="flex items-center gap-8">
              <Button
                className={clsx(
                  "text-sm border-grayLight border-2 rounded-md hover:bg-grayLight",
                  filter === "created" && "bg-grayLight",
                )}
                onClick={() => setFilter("created")}
              >
                Your Fundraisers
              </Button>

              <Button
                className={clsx(
                  "text-sm border-grayLight border-2 rounded-md hover:bg-grayLight",
                  filter === "contributed" && "bg-grayLight",
                )}
                onClick={() => setFilter("contributed")}
              >
                Contributed Fundraisers
              </Button>
            </div>
          </div>

          <div>
            <FundraisersList fundraises={filteredFundraises} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisersPage;
