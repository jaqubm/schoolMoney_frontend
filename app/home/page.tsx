"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Activity, ActivityCard } from "@/components/activity-card";


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
   ]

   return (
      <div className="flex flex-col w-screen h-screen">
         {/* Upper screen*/}
        <div className="flex w-full h-full max-h-[151px] py-[40px] items-center">
           <header className="flex justify-between h-full w-full items-center">
              <div className="flex items-center ml-[40px]">
                 <div className="flex">
                    <h1 className="text-4xl font-normal">School</h1>
                    <h1 className="text-4xl font-semibold">Money</h1>
                 </div>
                 <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[654px] h-[66px] ml-[80px] rounded-lg text-base"
                 />
              </div>
              <div className="flex items-center py-[27.5px] mr-[40px]">
                 <span className="text-lg mr-[22px]">Welcome, Piotr</span>
                 <Avatar>
                    <AvatarFallback>P</AvatarFallback>
                 </Avatar>
              </div>
           </header>
        </div>
         {/* Lower screen*/}
         <div className="flex w-full h-full">
            {/* Left section*/}
            <div className="flex bg-[#fafafa] w-full max-w-[339px] h-full">
               <Sidebar/>
            </div>
            {/* Right section*/}
            <div className="flex flex-col w-full h-full pl-[59px]">
               <div className="flex w-full h-[91px] gap-[30px] items-center">
                  <h2 className="text-4xl font-normal line-">Recent Activities</h2>
                  <Button variant="outline" className="text-xl w-[284px]">Contributed Fundraisers</Button>
                  <Button variant="outline" className="text-xl w-[236px]">Your Fundraisers</Button>
               </div>
               <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col h-full gap-[54px] pt-[34px] pr-[99px]">
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
