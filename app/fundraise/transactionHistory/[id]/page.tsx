"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useUserData } from "@/queries/user";
import {
  useGetFundraiseById,
  useGetTransactionHistory,
} from "@/queries/fundraise";
import { Spinner } from "@/components/Spinner";
import PageHeader from "@/components/PageHeader/PageHeader";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionReport from "@/components/TransactionReport/TransactionReport";
import TransactionFilter, {
  option,
} from "@/components/TransactionFilter/TransactionFilter";
import { TransactionHistoryData } from "@/components/TransactionHistoryData";
import { ScrollArea } from "@/components/ui/scroll-area";

const FundraiserTransactionHistoryPage = () => {
  const { id } = useParams();
  const { data: userData, isLoading: loadingUser } = useUserData();
  const {
    data: fundraiserDetails,
    isLoading: isFundraiserLoading,
    error: fundraiserError,
  } = useGetFundraiseById(id);
  const {
    data: transactions = [],
    isLoading: isTransactionLoading,
    error: transactionError,
  } = useGetTransactionHistory(id);

  const filterOptions = [
    { label: "Deposit", value: "Deposit" },
    { label: "Withdrawal", value: "Withdrawal" },
  ];

  const [selectedFilters, setSelectedFilters] =
    useState<option[]>(filterOptions);

  if (
    fundraiserError ||
    transactionError ||
    !fundraiserDetails ||
    !transactions
  ) {
    return <div>Error fetching details.</div>;
  }

  if (isFundraiserLoading || isTransactionLoading) {
    return (
      <div className="flex w-full items-center justify-center flex-col gap-4">
        <h3>Loading details...</h3>
        <Spinner size="large" show className="text-black" />
      </div>
    );
  }

  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter((transaction) =>
        selectedFilters.some((filter) => filter.value === transaction.type),
      )
    : [];

  const handleFilterChange = (filters: option[]) => {
    setSelectedFilters(filters);
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
                <TransactionFilter
                  title="Filter"
                  selectedOptions={selectedFilters}
                  onFilterChange={handleFilterChange}
                  options={filterOptions}
                ></TransactionFilter>
                <PDFDownloadLink
                  document={
                    <TransactionReport transactions={filteredTransactions} />
                  }
                  fileName={`${sanitizedTitle}_transaction_report.pdf`}
                >
                  <button className="p-2 rounded hover:bg-gray-200">
                    <DocumentArrowDownIcon className="size-6 text-secondary" />
                  </button>
                </PDFDownloadLink>
              </div>
            )}
          </PageHeader>

          <div className="flex flex-col w-full h-full justify-start items-center gap-4 p-3 pr-14 pl-14 pt-11">
            <ScrollArea className="w-full h-full p-3 pr-14 pl-14 pt-11">
              <TransactionHistoryData data={filteredTransactions} />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraiserTransactionHistoryPage;
