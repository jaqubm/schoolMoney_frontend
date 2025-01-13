import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export interface Activity {
  title: string;
  transactionType: string;
  amount: string;
  date: string;
  paidBy: string;
}

interface ActivityCard {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCard> = ({ activity }) => (
  <Card className="p-4 flex flex-col w-full h-full">
    <h3 className="text-lg font-semibold">{activity.title}</h3>
    <p>Transaction Type: {activity.transactionType}</p>
    <p>Amount: {activity.amount}</p>
    <p>Date: {activity.date}</p>
    <p>Paid by: {activity.paidBy}</p>
    <Button variant="outline" className="self-end">
      View Details
    </Button>
  </Card>
);
