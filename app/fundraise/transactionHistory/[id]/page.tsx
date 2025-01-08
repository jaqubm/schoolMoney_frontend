"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import React from "react";
import { useParams } from "next/navigation";
import { useUserData } from "@/queries/user";
import { useGetFundraiseById } from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import PageHeader from "@/components/PageHeader/PageHeader";
import {
  DocumentArrowDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionReport from "@/components/TransactionReport/TransactionReport";

const FundraiserTransactionHistoryPage = () => {
  const { id } = useParams();
  const { data: user } = useUserData();
  const { data: fundraiserDetails, isLoading, error } = useGetFundraiseById(id);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h3>Loading details...</h3>
        <Spinner size="large" show className="text-black" />
      </div>
    );
  }

  if (error || !fundraiserDetails) {
    return <div>Error fetching details.</div>;
  }

  const transactions = [
    {
      date: "2025-01-01",
      type: "Deposit",
      amount: 300.0,
      name: "John",
      surname: "Doe",
    },
    {
      date: "2025-03-01",
      type: "Withdrawal",
      amount: 100.0,
      name: "John",
      surname: "Doe",
    },
  ];

  const handleFilterClick = () => {
    // Logika filtrowania transakcji
  };

  function sanitizeFileName(title: string) {
    return title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
  }
  const sanitizedTitle = sanitizeFileName(fundraiserDetails.title);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header withBorder>
        <div className="flex items-center gap-4">
          <span className="text-base">Welcome, {user?.name || "User"}</span>
          <Avatar>
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </Header>

      <div className="flex w-full h-full overflow-hidden">
        <div className="flex w-full max-w-[339px] h-full border">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full h-full items-center overflow-y-auto">
          <PageHeader
            title={`${fundraiserDetails?.title} - Transaction History`}
            subtitle={`${fundraiserDetails.className} ${fundraiserDetails.schoolName}`}
          >
            {transactions.length > 0 && (
              <div className="flex gap-4">
                <button
                  onClick={handleFilterClick}
                  className="p-2 rounded hover:bg-gray-200"
                >
                  <AdjustmentsHorizontalIcon className="w-6 h-6 text-secondary" />
                </button>
                <PDFDownloadLink
                  document={<TransactionReport transactions={transactions} />}
                  fileName={`${sanitizedTitle}_transaction_report.pdf`}
                >
                  <button className="p-2 rounded hover:bg-gray-200">
                    <DocumentArrowDownIcon className="w-6 h-6 text-secondary" />
                  </button>
                </PDFDownloadLink>
              </div>
            )}
          </PageHeader>
        </div>
      </div>
    </div>
  );
};

export default FundraiserTransactionHistoryPage;
