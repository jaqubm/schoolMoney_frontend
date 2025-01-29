import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

export interface Activity {
  id: string;
  title: string;
  transactionType: string;
  amount: string;
  date: string;
  paidBy: string;
}

interface ActivityCard {
  activity: Activity;
  onViewDetails: () => void;
}

export const ActivityCard: React.FC<ActivityCard> = ({
  activity,
  onViewDetails,
}) => (
  <Card className="p-4 flex flex-col w-full h-full">
    <h3 className="text-lg font-semibold">{activity.title}</h3>
    <p>Transaction Type: {activity.transactionType}</p>
    <p>Amount: {activity.amount} PLN</p>
    <p>Date: {activity.date}</p>
    <p>Paid by: {activity.paidBy}</p>
    <Button
      variant="outline"
      className="self-end bg-blue hover:bg-blueLight text-white"
      onClick={onViewDetails}
    >
      View Details
    </Button>
  </Card>
);
