"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Activity,
  RecentActivityCard,
} from "@/components/recent-activity-card";

const HomePage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Przykładowe pobranie danych za pomocą Axios
    axios.get("/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Pasek boczny */}
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        {/* Górny pasek */}
        <header className="flex items-center justify-between">
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
                <AvatarImage src="/avatar.png" alt="Profile Picture" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Główna zawartość */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="flex space-x-4 mb-4">
            <Button variant="outline">Contributed Fundraisers</Button>
            <Button variant="outline">Your Fundraisers</Button>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => (
              <RecentActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
