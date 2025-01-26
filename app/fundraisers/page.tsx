"use client";

import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";
import FundraisersList from "@/components/fundraiser/FundraisersList";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useGetFundraises, useUserData } from "@/queries/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Spinner } from "@/components/Spinner";

const FundraisersPage = () => {
  const router = useRouter();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { data: fundraises = [], isLoading } = useGetFundraises();
  const [filter, setFilter] = useState<"created" | "contributed">("created");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFundraiser, setSelectedFundraiser] = useState<string | null>(
    null,
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedFundraiser(null);
  };

  const filteredFundraises = fundraises.filter((fundraise) => {
    const matchesFilter =
      (filter === "created" && fundraise.isTreasurer) ||
      (filter === "contributed" && !fundraise.isTreasurer);

    const matchesSearchTerm = fundraise.title
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());

    return matchesFilter && matchesSearchTerm;
  });

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

        <div className="flex flex-col w-full h-full pl-6 pr-6">
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

              <Button
                variant="default"
                onClick={() => router.push("/newFundraiser")}
                className={clsx(
                  "font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow",
                  "hover:bg-blueLight",
                )}
              >
                Start Fundraiser
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto">
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <Spinner size="large" />
              </div>
            ) : (
              <FundraisersList fundraises={filteredFundraises} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisersPage;
