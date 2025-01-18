export type WithdrawPayload = {
  amount: number;
  destinationAccountNumber: string;
};

export type DepositPayload = {
  title: string;
  amount: number;
  sourceAccountNumber: string;
};

export type TransferPayload = {
  amount: number;
  destinationAccountNumber: string;
};

export type TransactionDetails = {
  transactionId: string;
  title: string;
  amount: number;
  date: string;
  type: string;
  status: string;
  sourceAccountNumber: string;
  destinationAccountNumber: string;
};

export type Transaction = {
  date: string;
  type: string;
  amount: number;
  name: string;
  surname: string;
};

export type Transactions = {
  transactions: TransactionDetails[];
};

export enum TransactionFilterOption {
  All = "All",
  Deposit = "Deposit",
  Withdrawal = "Withdrawal",
  Newest = "Newest",
  Oldest = "Oldest",
}
