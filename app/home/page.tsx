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
            <div className="flex flex-col w-full max-w-[339px] items-center h-full">
               <Sidebar/>
            </div>
            {/* Right section*/}
            <div className="flex w-full h-full justify-center items-center">
               <div className="flex flex-col w-full max-w-[500px] h-full justify-center items-center text-center">
                  <div className="flex w-full max-w-[500px] h-full max-h-[91px] justify-center items-center mt-5">
                         <div className="flex flex-col">
                            <div className="flex items-center">
                               <h2 className="text-xl font-semibolds">Recent Activities</h2>
                              <Button variant="outline">Contributed Fundraisers</Button>
                              <Button variant="outline">Your Fundraisers</Button>
                            </div>
                         </div>
                  </div>
                  <div className="flex flex-col w-full max-w-[500px] h-full justify-center items-center mt-5">
                       <div className="flex flex-col">
                          {activityCards.map((activity, index) => (
                             <ActivityCard key={index} activity={activity} />
                          ))}
                       </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
  );
};

export default HomePage;
