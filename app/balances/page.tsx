"use client";

import { Sidebar } from "@/components/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useGetTransactionHistory, useUserData } from "@/queries/user";
import { useRouter } from "next/navigation";
import { BalancesCard } from "@/components/balances-card";

const BalancesPage = () => {
  const router = useRouter();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const { data: transactions, isLoading: loadingTransactions } =
    useGetTransactionHistory();
  const sortedTransactions = transactions?.slice().sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Upper screen */}
      <Header withBorder>
        <div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser
              ? "Loading..."
              : `Welcome, ${userData?.name || "Guest"}`}
          </span>
          <Avatar>
            <AvatarFallback>
              {loadingUser
                ? "..."
                : `${userData?.name?.[0] || ""}${userData?.surname?.[0] || ""}` ||
                  "G"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Header>

      {/* Lower screen */}
      <div className="flex w-full h-full overflow-hidden">
        {/* Left section */}
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">
          {/* Balances bar */}
          <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
            <h2 className="text-4xl font-normal">Balances</h2>
            <Button
              onClick={() => router.push("/balances/deposit")}
              variant="outline"
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
            >
              Make a deposit
            </Button>
            <Button
              variant="outline"
              className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight"
              onClick={() => router.push("/balances/withdraw")}
            >
              Withdraw funds
            </Button>
          </div>

          {/* Balances overview */}
          <div className="flex gap-10 mb-8 mr-8">
            <div className="flex-1 border rounded-lg p-6">
              <h3 className="text-gray-500 text-sm mb-2">Parent&#39;s bill</h3>
              <p className="text-2xl font-bold">
                {userData?.account.accountNumber
                  ? userData.account.accountNumber
                      .replace(/(.{4})/g, "$1 ")
                      .trim()
                  : "No account number available"}
              </p>
            </div>
            <div className="flex-1 border rounded-lg p-6">
              <h3 className="text-gray-500 text-sm mb-2">Balance</h3>
              <p className="text-2xl font-bold">
                {userData?.account.balance} PLN
              </p>
            </div>
          </div>

          {/* Transaction history */}
          <h3 className="text-gray-500 text-sm">Transaction History</h3>
          <div className="flex flex-col w-full h-full items-center overflow-y-auto pr-[59px]">
            <div className="flex flex-col w-full max-w-[1423px] gap-[54px] pt-[34px] mb-10">
              {loadingTransactions ? (
                <p>Loading transactions...</p>
              ) : sortedTransactions && sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction, index) => (
                  <BalancesCard
                    key={index}
                    balanceCard={{
                      transactionId: transaction.transactionId,
                      amount: transaction.amount,
                      date: transaction.date,
                      type: transaction.type,
                      status: transaction.status,
                      sourceAccountNumber: transaction.sourceAccountNumber,
                      destinationAccountNumber:
                        transaction.destinationAccountNumber,
                    }}
                  />
                ))
              ) : (
                <p>No transactions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancesPage;
