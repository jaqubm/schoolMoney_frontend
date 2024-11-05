import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Activity {
  id: number;
  title: string;
  transactionType: string;
  amount: string;
  date: string;
  paidBy: string;
}

interface RecentActivityCardProps {
  activity: Activity;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activity,
}) => (
  <Card className="p-4 flex flex-col space-y-2 shadow-md rounded-lg">
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
