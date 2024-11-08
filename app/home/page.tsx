"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
      <div className="flex min-h-screen w-full">
        <div className="absolute w-full h-[151px]">
          <header className="flex items-center justify-between w-full h-full">
            <h1 className="text-3xl font-semibold">SchoolMoney</h1>
            <div className="flex items-center space-x-4">
              <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 border rounded-md"
              />
              <Button variant="ghost" className="p-2">
                <span className="material-icons">settings</span>
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-lg">Welcome, Piotr</span>
                <Avatar>
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
        </div>
        <Sidebar/>
        <div className="absolute top-[151px] left-[339px]">
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="flex space-x-4 mb-4">
              <Button variant="outline">Contributed Fundraisers</Button>
              <Button variant="outline">Your Fundraisers</Button>
            </div>
          </section>
        </div>
      </div>
  );
};

export default HomePage;
