"use client";

import { useParams, useRouter } from "next/navigation";
import { useUserData } from "@/queries/user";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import {
  ArrowLeftIcon,
  Bars4Icon,
  PencilIcon,
  TrashIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import images from "@/public/images";
import { clsx } from "clsx";
import { useDeleteFundraise, useGetFundraiseById } from "@/queries/fundraise";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const FundraiserDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: user } = useUserData();
  const deleteFundraise = useDeleteFundraise();

  const [isDeletionDialogOpen, setDeletionDialogOpen] = useState(false);

  const {
    data: fundraiserDetails,
    isLoading,
    error,
  } = useGetFundraiseById(id as string);

  const handleDelete = () => {
    deleteFundraise.mutate(
      { fundraiseId: id as string },
      {
        onSuccess: () => {
          setDeletionDialogOpen(false);
          router.push("/fundraisers");
        },
      },
    );
  };

  if (isLoading) {
    return <div>Loading fundraiser details...</div>;
  }
  if (error || !fundraiserDetails) {
    return <div>Error fetching fundraiser details.</div>;
  }
  const imageSrc = images[fundraiserDetails.imageIndex] || images[0];

  return (
    <div className="flex flex-col h-screen w-screen">
      <Dialog open={isDeletionDialogOpen} onOpenChange={setDeletionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>
              Are you sure you want to delete this fundraiser? This action
              cannot be undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeletionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-fit justify-between items-center p-3 pr-4 pl-6 pt-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-4 text-secondary"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-secondary">
                  <Bars4Icon className="w-6 h-6" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/fundraise/edit/${id}`);
                  }}
                >
                  <PencilIcon className="w-5 h-5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeletionDialogOpen(true)}>
                  <TrashIcon className="w-5 h-5" />
                  Cancel
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/fundraise/withdraw/${id}`);
                  }}
                >
                  <BanknotesIcon className="w-5 h-5" />
                  Withdraw Funds
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex w-full h-full">
            <div className="flex-1 h-full pl-6 pr-6 pb-20">
              <img
                src={imageSrc}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>

            <div className=" flex flex-1 h-full flex-col justify-between gap-4 pb-24">
              <div>
                <div className="text-sm text-grayMedium">
                  Klasa {fundraiserDetails.className} (
                  {fundraiserDetails.schoolName})
                </div>
                <h1 className="text-2xl font-bold pb-3">
                  {fundraiserDetails.title}
                </h1>
                <p className="text-base text-grayMedium pb-10">
                  {fundraiserDetails.description}
                </p>

                <p className="text-base text-grayMedium font-bold mb-3">
                  Organiser
                </p>
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex-col">
                    <p className="text-sm">
                      {user?.name} {user?.surname}
                    </p>
                    <p className="text-grayMedium text-xs">{user?.email}</p>
                  </div>
                </div>

                <div className="w-full h-fit justify-start items-center mt-10 flex gap-4">
                  <Button
                    className={clsx(
                      "rounded-bl text-sm bg-blue text-primary shadow px-6",
                      "hover:bg-blueLight",
                    )}
                    onClick={() => {
                      router.push(`/fundraise/donate/${id}`);
                    }}
                  >
                    Donate
                  </Button>

                  <Button
                    className={clsx(
                      "rounded-bl text-sm bg-blue text-primary shadow px-6",
                      "hover:bg-blueLight",
                    )}
                    onClick={() => {
                      router.push(`/fundraise/transactionHistory/${id}`);
                    }}
                  >
                    See history
                  </Button>
                </div>
              </div>

              <div className="flex w-full h-fit justify-around">
                <div className="flex flex-col w-fit h-fit items-center justify-center">
                  <p className="text-base font-bold">
                    {fundraiserDetails.raisedAmount} PLN raised
                  </p>
                  <p className="text-sm text-grayMedium">
                    of {fundraiserDetails.goalAmount} PLN goal
                  </p>
                </div>

                <div className="flex flex-col w-fit h-fit items-center justify-center">
                  <p className="text-base font-bold">
                    {Math.max(
                      Math.floor(
                        (new Date(fundraiserDetails.endDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      ),
                      0,
                    )}
                  </p>
                  <p className="text-sm text-grayMedium">days left</p>
                </div>

                <div className="flex flex-col w-fit h-fit items-center justify-center">
                  <p className="text-base font-bold">
                    {fundraiserDetails.totalSupporters}
                  </p>
                  <p className="text-sm text-grayMedium">total supporters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserDetailsPage;
