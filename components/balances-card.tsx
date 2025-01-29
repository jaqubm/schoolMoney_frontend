import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { TransactionDetails } from "@/app/user/User.types";
import { useRouter } from "next/navigation";

interface BalanceCardProps {
  balanceCard: TransactionDetails;
}

export const BalancesCard: React.FC<BalanceCardProps> = ({ balanceCard }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/balances/transaction/${balanceCard.transactionId}`);
  };

  return (
    <Card className="p-4 flex flex-col w-full h-full">
      <h3 className="text-lg font-semibold">{balanceCard.title}</h3>
      <div className="flex flex-col justify-evenly items-start h-full w-full">
        <p className="pt-2">Transaction type: {balanceCard.type}</p>
        <p>Amount: {balanceCard.amount} PLN</p>
        <p>
          Date:{" "}
          {new Date(balanceCard.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <Button
        variant="outline"
        className="self-end bg-blue hover:bg-blueLight text-white"
        onClick={handleViewDetails}
      >
        View Details
      </Button>
    </Card>
  );
};
