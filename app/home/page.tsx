"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, ActivityCard } from "@/components/activity-card";
import {Header} from "@/components/Header";


const HomePage = () => {
   const activityCards:Activity[] = [
      {
         title: "Payment for School Trip to the Museum",
         transactionType: "Deposit",
         amount: "$25",
         date: "October 20, 2024",
         paidBy: "John Doe",
      },
      {
         title: "Donation to School Art Program",
         transactionType: "Donation",
         amount: "$50",
         date: "October 15, 2024",
         paidBy: "Jane Smith",
      },
      {
         title: "Payment for Science Project Materials",
         transactionType: "Purchase",
         amount: "$15",
         date: "October 10, 2024",
         paidBy: "Michael Johnson",
      },
      {
         title: "Payment for Science Project Materials",
         transactionType: "Purchase",
         amount: "$15",
         date: "October 10, 2024",
         paidBy: "Michael Johnson",
      },
      {
         title: "Payment for Science Project Materials",
         transactionType: "Purchase",
         amount: "$15",
         date: "October 10, 2024",
         paidBy: "Michael Johnson",
      },
      {
         title: "Payment for Science Project Materials",
         transactionType: "Purchase",
         amount: "$15",
         date: "October 10, 2024",
         paidBy: "Michael Johnson",
      },
   ]

   return (
      <div className="flex flex-col w-screen h-screen">
         {/* Upper screen*/}
         <Header withBorder>
            <Input
               type="search"
               placeholder="Search..."
               className="w-[654px] h-[66px] rounded-lg text-base"
            />
            <div className="flex items-center py-[27.5px] mr-[40px]">
               <span className="text-lg mr-[22px]">Welcome, Piotr</span>
               <Avatar>
                  <AvatarFallback>P</AvatarFallback>
               </Avatar>
            </div>
         </Header>

         {/* Lower screen*/}
         <div className="flex w-full h-full overflow-hidden">
            {/* Left section*/}
            <div className="flex w-full max-w-[339px] h-full border">
               <Sidebar/>
            </div>
            {/* Right section*/}
            <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">
               <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
                  <h2 className="text-4xl font-normal line-">Recent Activities</h2>
                  <Button variant="outline" className="text-xl w-[284px]">Contributed Fundraisers</Button>
                  <Button variant="outline" className="text-xl w-[236px]">Your Fundraisers</Button>
               </div>
               <div className="flex flex-col w-full h-full items-center overflow-y-auto pr-[59px]">
                    <div className="flex flex-col w-full max-w-[1423px] gap-[54px] pt-[34px] mb-10">
                       {activityCards.map((activity, index) => (
                          <ActivityCard key={index} activity={activity} />
                       ))}
                    </div>
               </div>
            </div>
        </div>
      </div>
  );
};

export default HomePage;
